from src.service import user_services, image_services, product_services
from src.database.models import Users, Images, Products
from fastapi import HTTPException, status


async def exam_user(user_id: int):
    # Проверка существования профиля
    existing_user = await user_services.get_user_by_id(user_id)
    if not existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User not exist")
    return existing_user


async def exam_product(product_id: int):
    # Проверка существования товара
    existing_product = await product_services.get_product_by_id(product_id)
    if not existing_product:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Product not exist")
    return existing_product
