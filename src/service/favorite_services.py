from src.repository import favorite_repository
from src.service import user_services, product_services
from src.database.models import Favorite, Users, Products
from fastapi import HTTPException, status
from src.service.user_services import get_user_by_id
from src.utils.custom_logging import setup_logging


log = setup_logging()


def get_all_favorites(dirs: bool = False):
    favorites = favorite_repository.get_all_favorites()
    models = [Favorite(**favorite) for favorite in favorites]
    list_favorites = []
    for favorite in favorites:
        if favorite["user_id"]:
            user = user_services.get_user_by_id(favorite["user_id"])
            favorite["user"] = user.model_dump(by_alias=True)
            del favorite["user_id"]
        if favorite["product_id"]:
            product = product_services.get_product_by_id(favorite["product_id"])
            favorite["product"] = product.model_dump(by_alias=True)
            del favorite["product_id"]
        list_favorites.append(favorite)
    if dirs:
        return list_favorites
    else:
        return models


def get_favorite_by_id(favorite_id: int, dirs: bool = False):
    favorite = favorite_repository.get_favorite_by_id(favorite_id)
    if not favorite:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Favorite not found')
    models = Favorite(**favorite) if favorite else None
    if favorite["user_id"]:
        user = user_services.get_user_by_id(favorite["user_id"])
        favorite["user"] = user.model_dump(by_alias=True)
        del favorite["user_id"]
    if favorite["product_id"]:
        product = product_services.get_product_by_id(favorite["product_id"])
        favorite["product"] = product.model_dump(by_alias=True)
        del favorite["product_id"]
    if dirs:
        return favorite
    else:
        return models


def get_favorite_by_user_id(user_id: int, dirs: bool = False):
    favorites = favorite_repository.get_favorite_by_user_id(user_id)
    models = [Favorite(**favorite) for favorite in favorites]
    if not favorites:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Favorite not found')
    list_favorites = []
    for favorite in favorites:
        if favorite["user_id"]:
            user = user_services.get_user_by_id(favorite["user_id"])
            favorite["user"] = user.model_dump(by_alias=True)
            del favorite["user_id"]
        if favorite["product_id"]:
            product = product_services.get_product_by_id(favorite["product_id"])
            favorite["product"] = product.model_dump(by_alias=True)
            del favorite["product_id"]
        list_favorites.append(favorite)
    if dirs:
        return list_favorites
    else:
        return models


def create_favorite(favorite: Favorite):
    get_user_by_id(favorite.UserID)
    favorite_id = favorite_repository.create_favorite(favorite)
    return get_favorite_by_id(favorite_id)


def update_favorite(favorite_id: int, favorite: Favorite):
    get_favorite_by_id(favorite_id)
    get_user_by_id(favorite.UserID)
    favorite_repository.update_favorite(favorite_id, favorite)
    return {"message": "Favorite updated successfully"}


def delete_favorite(favorite_id: int):
    get_favorite_by_id(favorite_id)
    favorite_repository.delete_favorite(favorite_id)
    return {"message": "Favorite deleted successfully"}


def likes_products(user_id: int, list_favorite: list[int]):
    # Проверяем существование выбранных продуктов и добавдяем их в базу
    list_product = []
    for product_id in list_favorite:
        # Проверяем существование пользователя
        user_services.get_user_by_id(user_id)
        # Если такого продукта нет, значит выводим ошибку
        product = product_services.get_product_by_id(product_id)
        # Проверяем наличие такого продукта в базе
        favorite = None
        try:
            current_favorite = get_favorite_by_user_id(user_id)
        except Exception as ex:
            current_favorite = None
            log.info("У пользователя нет избранных товаров")
        if current_favorite:
            for current in current_favorite:
                if current.ProductID == product.ID:
                    favorite = current
                    log.info("Товар найден в избранном пользователя")
        if favorite is None:
            favorite = create_favorite(Favorite(user_id=user_id,
                                                product_id=product.ID))
            log.info("Товар был добавлен в избранное, так как его не было в базе")
        # Формируем словарь продуктов
        list_product.append(favorite)
    return list_product
