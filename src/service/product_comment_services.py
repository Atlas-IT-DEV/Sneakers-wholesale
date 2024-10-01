from src.repository import product_comment_repository
from src.service.user_services import get_user_by_id
from src.service.product_services import get_product_by_id
from src.database.models import ProductComments
from fastapi import HTTPException, status
from src.utils.return_url_object import return_url_object
from src.utils.list_to_str import encode_list_to_string, decode_string_to_list
from src.service.image_services import get_image_by_id
from src.service.product_services import get_product_by_id


def get_all_product_comments(dirs: bool = False):
    product_comments = product_comment_repository.get_all_product_comments()
    model = [ProductComments(**product_comment) for product_comment in product_comments]
    list_product_comments = []
    for product_comment in product_comments:
        # Обрабатываем user_id
        user_id = product_comment.get("user_id")
        if user_id:
            user = get_user_by_id(user_id)
            product_comment["user"] = user.model_dump(by_alias=True)
            del product_comment["user_id"]
        # Обрабатываем product_id
        product_id = product_comment.get("product_id")
        if product_id:
            product = get_product_by_id(product_id)
            product_comment["product"] = product.model_dump(by_alias=True)
            del product_comment["product_id"]
        list_product_comments.append(product_comment)
        # Получаем список изображений по ID продукта и выбираем первое изображение
        image_ids = decode_string_to_list(product_comment.get("image_id"))
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
        product_comment["urls"] = urls
        list_product_comments.append(product_comment)
    if dirs:
        return list_product_comments  # Возвращаем словарь с преобразованным продуктом
    else:
        return model


def get_product_comment_by_id(product_comment_id: int, dirs: bool = False):
    product_comment = product_comment_repository.get_product_comment_by_id(product_comment_id)
    if not product_comment:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Product Comment not found')
    model = ProductComments(**product_comment) if product_comment else None
    # Обрабатываем user_id
    user_id = product_comment.get("user_id")
    if user_id:
        user = get_user_by_id(user_id)
        product_comment["user"] = user.model_dump(by_alias=True)
        del product_comment["user_id"]
    if product_id:
        product = get_product_by_id(product_id)
        product_comment["product"] = product.model_dump(by_alias=True)
        del product_comment["product_id"]
    # Получаем список изображений по ID продукта и выбираем первое изображение
    image_ids = decode_string_to_list(product_comment.get("image_id"))
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
    product_comment["urls"] = urls
    # Возвращаем либо модель product comment, либо словарь, в зависимости от значения параметра dirs
    if dirs:
        return product_comment  # Возвращаем словарь с преобразованным product comment
    else:
        return model


def create_product_comment(product_comment: ProductComments):
    get_user_by_id(product_comment.UserID)
    get_product_by_id(product_comment.ProductID)
    product_comment_id = product_comment_repository.create_product_comment(product_comment)
    return get_product_comment_by_id(product_comment_id)


def update_product_comment(product_comment_id: int, product_comment: ProductComments):
    get_product_comment_by_id(product_comment_id)
    get_user_by_id(product_comment.UserID)
    get_product_by_id(product_comment.ProductID)
    product_comment_repository.update_product_comment(product_comment_id, product_comment)
    return {"message": "Product comment updated successfully"}


def delete_product_comment(product_comment_id: int):
    get_product_comment_by_id(product_comment_id)
    product_comment_repository.delete_product_comment(product_comment_id)
    return {"message": "Product comment deleted successfully"}
