from src.repository import product_repository
from src.database.models import Products
from fastapi import HTTPException, status
from src.utils.exam_services import check_for_duplicates, check_if_exists
from src.service.promotion_services import get_promotion_by_id
from src.service.category_services import get_category_by_id
from src.service.company_services import get_company_by_id
from src.utils.list_to_str import encode_list_to_string, decode_string_to_list
from src.service.image_services import get_image_by_id
from src.service.characteristic_services import get_characteristic_by_id
from src.repository.product_characteristic_repository import (get_product_characteristic_by_id,
                                                              get_product_characteristic_by_product_id)
from src.utils.return_url_object import return_url_object
from src.utils.custom_logging import setup_logging

log = setup_logging()


def get_all_products(dirs: bool = False):
    products = product_repository.get_all_products()  # Получаем все продукты из репозитория
    models = [Products(**product) for product in products]
    list_products = []
    for product in products:
        # Обрабатываем category_id
        category_id = product.get("category_id")
        if category_id:
            category = get_category_by_id(category_id)
            product["category"] = category.model_dump(by_alias=True)
            del product["category_id"]
        # Заменяем company_id
        company_id = product.get("company_id")
        if company_id:
            company = get_company_by_id(company_id)
            product["company"] = company.model_dump(
                by_alias=True)
            del product["company_id"]
        # Заменяем promotion_id
        promotion_id = product.get("promotion_id")
        if promotion_id:
            promotion = get_promotion_by_id(promotion_id)
            product["promotion"] = promotion.model_dump(by_alias=True)
            del product["promotion_id"]
        # Получаем список изображений по ID продукта и выбираем первое изображение
        image_ids = decode_string_to_list(product.get("image_id"))
        urls = []
        for image_id in image_ids:
            # Обрабатываем URL для первого изображения
            if image_id is not None:
                try:
                    url = get_image_by_id(image_id)
                    url = return_url_object(url)
                    urls.append(url)
                except HTTPException:
                    urls.append(None)
            else:
                urls.append(None)
        product["urls"] = urls
        list_products.append(product)
    if dirs:
        return list_products
    else:
        return models


def get_product_by_id(product_id: int, dirs: bool = False):
    # Получаем продукт из репозитория по ID
    product = product_repository.get_product_by_id(product_id)
    model = Products(**product) if product else None
    # Если продукт не найден, выбрасываем исключение
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Product not found')
    # Обрабатываем category_id
    category_id = product.get("category_id")
    if category_id:
        category = get_category_by_id(category_id)
        product["category"] = category.model_dump(by_alias=True)
        del product["category_id"]
    # Заменяем company_id
    company_id = product.get("company_id")
    if company_id:
        company = get_company_by_id(company_id)
        product["company"] = company.model_dump(
            by_alias=True)
        del product["company_id"]
    # Обрабатываем promotion_id
    promotion_id = product.get("promotion_id")
    if promotion_id:
        promotion = get_promotion_by_id(promotion_id)
        product["promotion"] = promotion.model_dump(by_alias=True)
        del product["promotion_id"]
    # Дополняем данные о характеристиках продукта
    product_characteristic = get_product_characteristic_by_product_id(product.get("id"))
    list_product_characteristic = []
    if product_characteristic:
        for characteristic in product_characteristic:
            characteristic_value = characteristic.get("value")
            characteristic_id = characteristic.get("characteristic_id")
            characteristic = get_characteristic_by_id(characteristic_id)
            characteristic = characteristic.model_dump(by_alias=True)
            if characteristic_value:
                characteristic["value"] = characteristic_value
            else:
                characteristic["value"] = None
            list_product_characteristic.append(characteristic)
        product["characteristics"] = list_product_characteristic
    # Получаем список изображений по ID продукта и выбираем первое изображение
    image_ids = decode_string_to_list(product.get("image_id"))
    urls = []
    for image_id in image_ids:
        # Обрабатываем URL для первого изображения
        if image_id is not None:
            try:
                url = get_image_by_id(image_id)
                url = return_url_object(url)
                urls.append(url)
            except HTTPException:
                urls.append(None)
        else:
            urls.append(None)
    product["urls"] = urls
    # Возвращаем либо модель продукта, либо словарь, в зависимости от значения параметра dirs
    if dirs:
        return product  # Возвращаем словарь с преобразованным продуктом
    else:
        return model


def create_product(product: Products):
    check_if_exists(
        get_all=get_all_products,
        attr_name="Name",
        attr_value=product.Name,
        exception_detail='Product already exist'
    )
    get_promotion_by_id(product.PromotionID)
    get_category_by_id(product.CategoryID)
    get_company_by_id(product.CompanyID)
    product_id = product_repository.create_product(product)
    return get_product_by_id(product_id)


def update_product(product_id: int, product: Products):
    check_for_duplicates(
        get_all=get_all_products,
        check_id=product_id,
        attr_name="Name",
        attr_value=product.Name,
        exception_detail='Product already exist'
    )
    get_promotion_by_id(product.PromotionID)
    get_category_by_id(product.CategoryID)
    get_company_by_id(product.CompanyID)
    product_repository.update_product(product_id, product)
    return {"message": "Product updated successfully"}


def delete_product(product_id: int):
    get_product_by_id(product_id)
    product_repository.delete_product(product_id)
    return {"message": "Product deleted successfully"}
