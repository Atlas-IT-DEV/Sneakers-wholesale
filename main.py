from fastapi import FastAPI, HTTPException, Depends, Request, File, UploadFile, Body, Header, status
from src.database.my_connector import Database
from src.service import (category_services, characteristic_services, company_services,
                         image_services, product_comment_services, order_product_services,
                         order_services, product_characteristic_services, product_services,
                         file_services, user_services, exam_services)
from typing import Dict
from fastapi.openapi.models import Tag
from src.database.models import (Users, Companies, Orders, Images, Categories, ProductsDict, Сharacteristics,
                                 OrderProducts, ProductComments, Products, ProductCharacteristics)
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, FileResponse

db = Database()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Определяем теги
TestTag = Tag(name="Test", description="Route for testing")
ImageServiceTag = Tag(name="ImageService", description="Upload/download image for object")
UserTag = Tag(name="User", description="CRUD operations user")
CategoryTag = Tag(name="Category", description="CRUD operations category")
CharacteristicTag = Tag(name="Characteristic", description="CRUD operations characteristic")
CompanyTag = Tag(name="Company", description="CRUD operations company")
ImageTag = Tag(name="Image", description="CRUD operations image")
ProductCommentTag = Tag(name="ProductComment", description="CRUD operations order comment")
OrderProductTag = Tag(name="OrderProduct", description="CRUD operations order product")
OrderTag = Tag(name="Order", description="CRUD operations order")
ProductCharacteristicTag = Tag(name="ProductCharacteristic", description="CRUD operations  product characteristic")
ProductTag = Tag(name="Product", description="CRUD operations product")

# Настройка документации с тегами
app.openapi_tags = [
    TestTag.dict(),
    ImageServiceTag.dict(),
    UserTag.dict(),
    CategoryTag.dict(),
    CharacteristicTag.dict(),
    CompanyTag.dict(),
    ImageTag.dict(),
    ProductCommentTag.dict(),
    OrderProductTag.dict(),
    OrderTag.dict(),
    ProductCharacteristicTag.dict(),
    ProductTag.dict()
]


@app.get("/", response_model=Dict, tags=["Test"])
async def Test():
    """
    Route for test.

    :return: response model None.
    """
    return {"Test": "Normaly Work"}


@app.post("/image_upload/avatar", response_model=Users, tags=["ImageService"])
async def image_upload_avatar(file: UploadFile = File(...), user: Users = Depends(exam_services.exam_user)):
    """
    Route for upload avatar for user.

    :return: response model user [Users].
    """
    try:
        return await file_services.upload_avatar(file, user)
    except HTTPException as ex:
        raise ex


@app.post("/image_upload/product", response_model=Products, tags=["ImageService"])
async def image_upload_product(file: UploadFile = File(...), product: Products = Depends(exam_services.exam_product)):
    """
    Route for upload product for user.

    :return: response model product [Products].
    """
    try:
        return await file_services.upload_product(file, product)
    except HTTPException as ex:
        raise ex


@app.get("/image_download/avatar", response_model=Users, tags=["ImageService"])
async def image_download_avatar(user: Users = Depends(exam_services.exam_user)):
    """
    Route for download avatar into basedata.

    :return: response model file.
    """
    try:
        return await file_services.download_avatar(user)
    except HTTPException as ex:
        raise ex


@app.get("/image_download/product", response_model=Products, tags=["ImageService"])
async def image_download_product(product: Products = Depends(exam_services.exam_product)):
    """
    Route for download product into basedata.

    :return: response model file.
    """
    try:
        return await file_services.download_product(product)
    except HTTPException as ex:
        raise ex


@app.get("/users/", response_model=list[Users], tags=["User"])
async def get_all_users():
    """
    Route for get all users from basedata.

    :return: response model List[Users].
    """
    try:
        return await user_services.get_all_users()
    except HTTPException as ex:
        raise ex


@app.get("/users/id/{user_id}", response_model=Users, tags=["User"])
async def get_user_by_id(user_id: int):
    """
    Route for get user by UserID.

    :param user_id: ID by user. [int]

    :return: response model Users.
    """
    try:
        return await user_services.get_user_by_id(user_id)
    except HTTPException as ex:
        raise ex


@app.get("/users/telegram/{telegram_id}", response_model=Users, tags=["User"])
async def get_user_by_telegram_id(telegram_id: int):
    """
    Route for get user by user telegram_id.

    :param telegram_id: Telegram_id by user. [int]

    :return: response model Users.
    """
    try:
        return await user_services.get_user_by_telegram_id(telegram_id)
    except HTTPException as ex:
        raise ex


@app.post("/users/", response_model=Users, tags=["User"])
async def create_user(user: Users):
    """
    Route for create user in basedata.

    :param user: Model user. [Users]

    :return: response model Users.
    """
    try:
        return await user_services.create_user(user)
    except HTTPException as ex:
        raise ex


@app.put("/users/{user_id}", response_model=Dict, tags=["User"])
async def update_user(user_id, user: Users):
    """
    Route for update user in basedata.

    :param user_id: ID by user. [int]

    :param user: Model user. [Users]

    :return: response model dict.
    """
    try:
        return await user_services.update_user(user_id, user)
    except HTTPException as ex:
        raise ex


@app.delete("/users/{user_id}", response_model=Dict, tags=["User"])
async def delete_user(user_id):
    """
    Route for delete user from basedata.

    :param user_id: ID by user. [int]

    :return: response model dict.
    """
    try:
        return await user_services.delete_user(user_id)
    except HTTPException as ex:
        raise ex


@app.get("/images/", response_model=list[Images], tags=["Image"])
async def get_all_images():
    """
    Route for get all image from basedata.

    :return: response model List[Images].
    """
    try:
        return await image_services.get_all_images()
    except HTTPException as ex:
        raise ex


@app.get("/images/image/{image_id}", response_model=Images, tags=["Image"])
async def get_image_by_id(image_id: int):
    """
    Route for get image by imageID.

    :param image_id: ID by image. [int]

    :param image: Model image. [Images]

    :return: response model Images.
    """
    try:
        return await image_services.get_image_by_id(image_id)
    except HTTPException as ex:
        raise ex


@app.post("/images/", response_model=Images, tags=["Image"])
async def create_image(image: Images):
    """
    Route for create image in basedata.

    :param image_id: ID by image. [int]

    :param image: Model image. [Images]

    :return: response model Images.
    """
    try:
        return await image_services.create_image(image)
    except HTTPException as ex:
        raise ex


@app.put("/images/{image_id}", response_model=Dict, tags=["Image"])
async def update_image(image_id, image: Images):
    """
    Route for update image in basedata.

    :param image_id: ID by image. [int]

    :param image: Model image. [Images]

    :return: response model dict.
    """
    try:
        return await rimage_services.update_image(image_id, image)
    except HTTPException as ex:
        raise ex


@app.delete("/images/{image_id}", response_model=Dict, tags=["Image"])
async def delete_image(image_id):
    """
    Route for delete image from basedata.

    :param image_id: ID by image. [int]

    :return: response model dict.
    """
    try:
        return await image_services.delete_image(image_id)
    except HTTPException as ex:
        raise ex


@app.get("/products/", response_model=list[Products], tags=["Product"])
async def get_all_products():
    """
    Route for getting all products from basedata.

    :return: response model List[Products].
    """
    try:
        return await product_services.get_all_products()
    except HTTPException as ex:
        raise ex


@app.get("/products/id/{product_id}", response_model=Products, tags=["Product"])
async def get_product_by_id(product_id: int):
    """
    Route for getting product by ProductID.

    :param product_id: ID of the product. [int]

    :return: response model Products.
    """
    try:
        return await product_services.get_product_by_id(product_id)
    except HTTPException as ex:
        raise ex


@app.post("/products/", response_model=Products, tags=["Product"])
async def create_product(product: Products):
    """
    Route for creating a product in basedata.

    :param product: Model product. [Products]

    :return: response model Products.
    """
    try:
        return await product_services.create_product(product)
    except HTTPException as ex:
        raise ex


@app.put("/products/{product_id}", response_model=Dict, tags=["Product"])
async def update_product(product_id: int, product: Products):
    """
    Route for updating a product in basedata.

    :param product_id: ID of the product. [int]

    :param product: Model product. [Products]

    :return: response model dict.
    """
    try:
        return await product_services.update_product(product_id, product)
    except HTTPException as ex:
        raise ex


@app.delete("/products/{product_id}", response_model=Dict, tags=["Product"])
async def delete_product(product_id: int):
    """
    Route for deleting a product from basedata.

    :param product_id: ID of the product. [int]

    :return: response model dict.
    """
    try:
        return await product_services.delete_product(product_id)
    except HTTPException as ex:
        raise ex


@app.get("/categories/", response_model=list[Categories], tags=["Category"])
async def get_all_categories():
    """
    Route for get all categories from basedata.

    :return: response model List[Categories].
    """
    try:
        return await category_services.get_all_categories()
    except HTTPException as ex:
        raise ex


@app.get("/categories/id/{category_id}", response_model=Categories, tags=["Category"])
async def get_category_by_id(category_id: int):
    """
    Route for get category by CategoryID.

    :param category_id: ID by category. [int]

    :return: response model Categories.
    """
    try:
        return await category_services.get_category_by_id(category_id)
    except HTTPException as ex:
        raise ex


@app.post("/categories/", response_model=Categories, tags=["Category"])
async def create_category(category: Categories):
    """
    Route for create category in basedata.

    :param category: Model category. [Category]

    :return: response model Categories.
    """
    try:
        return await category_services.create_category(category)
    except HTTPException as ex:
        raise ex


@app.put("/categories/{category_id}", response_model=Dict, tags=["Category"])
async def update_category(category_id, category: Categories):
    """
    Route for update category in basedata.

    :param category_id: ID by category. [int]

    :param category: Model category. [Categories]

    :return: response model dict.
    """
    try:
        return await category_services.update_category(category_id, category)
    except HTTPException as ex:
        raise ex


@app.delete("/categories/{category_id}", response_model=Dict, tags=["Category"])
async def delete_category(category_id):
    """
    Route for delete user from basedata.

    :param category_id: ID by Category. [int]

    :return: response model dict.
    """
    try:
        return await category_services.delete_category(category_id)
    except HTTPException as ex:
        raise ex


@app.get("/companies/", response_model=list[Companies], tags=["Company"])
async def get_all_companies():
    """
    Route for get all companies from basedata.

    :return: response model List[Companies].
    """
    try:
        return await company_services.get_all_companies()
    except HTTPException as ex:
        raise ex


@app.get("/companies/id/{company_id}", response_model=Companies, tags=["Company"])
async def get_company_by_id(company_id: int):
    """
    Route for get company by CompanyID.

    :param company_id: ID by company. [int]

    :return: response model Companies.
    """
    try:
        return await company_services.get_company_by_id(company_id)
    except HTTPException as ex:
        raise ex


@app.post("/companies/", response_model=Companies, tags=["Company"])
async def create_company(company: Companies):
    """
    Route for create company in basedata.

    :param company: Model company. [Companies]

    :return: response model Companies.
    """
    try:
        return await company_services.create_company(company)
    except HTTPException as ex:
        raise ex


@app.put("/companies/{company_id}", response_model=Dict, tags=["Company"])
async def update_company(company_id, company: Companies):
    """
    Route for update company in basedata.

    :param company_id: ID by company. [int]

    :param company: Model company. [Companies]

    :return: response model dict.
    """
    try:
        return await company_services.update_company(company_id, company)
    except HTTPException as ex:
        raise ex


@app.delete("/companies/{company_id}", response_model=Dict, tags=["Company"])
async def delete_company(company_id):
    """
    Route for delete company from basedata.

    :param company_id: ID by Company. [int]

    :return: response model dict.
    """
    try:
        return await company_services.delete_company(company_id)
    except HTTPException as ex:
        raise ex


@app.get("/characteristics/", response_model=list[Сharacteristics], tags=["Characteristic"])
async def get_all_characteristics():
    """
    Route for get all characteristics from basedata.

    :return: response model List[Characteristics].
    """
    try:
        return await characteristic_services.get_all_characteristics()
    except HTTPException as ex:
        raise ex


@app.get("/characteristics/id/{characteristic_id}", response_model=Сharacteristics, tags=["Characteristic"])
async def get_characteristic_by_id(characteristic_id: int):
    """
    Route for get characteristic by CharacteristicID.

    :param characteristic_id: ID by characteristic. [int]

    :return: response model Characteristic.
    """
    try:
        return await characteristic_services.get_characteristic_by_id(characteristic_id)
    except HTTPException as ex:
        raise ex


@app.post("/characteristics/", response_model=Сharacteristics, tags=["Characteristic"])
async def create_characteristic(characteristic: Сharacteristics):
    """
    Route for create characteristic in basedata.

    :param characteristic: Model characteristic. [Characteristic]

    :return: response model Characteristic.
    """
    try:
        return await characteristic_services.create_characteristic(characteristic)
    except HTTPException as ex:
        raise ex


@app.put("/characteristics/{characteristic_id}", response_model=Dict, tags=["Characteristic"])
async def update_characteristic(characteristic_id, characteristic: Сharacteristics):
    """
    Route for update characteristic in basedata.

    :param characteristic_id: ID by characteristic. [int]

    :param characteristic: Model characteristic. [Characteristic]

    :return: response model dict.
    """
    try:
        return await characteristic_services.update_characteristic(characteristic_id, characteristic)
    except HTTPException as ex:
        raise ex


@app.delete("/characteristics/{characteristic_id}", response_model=Dict, tags=["Characteristic"])
async def delete_characteristic(characteristic_id):
    """
    Route for delete characteristic from basedata.

    :param characteristic_id: ID by characteristic. [int]

    :return: response model dict.
    """
    try:
        return await characteristic_services.delete_characteristic(characteristic_id)
    except HTTPException as ex:
        raise ex


@app.get("/orders/", response_model=list[Orders], tags=["Order"])
async def get_all_orders():
    """
    Route for get all order from basedata.

    :return: response model List[Orders].
    """
    try:
        return await order_services.get_all_orders()
    except HTTPException as ex:
        raise ex


@app.get("/orders/id/{order_id}", response_model=Orders, tags=["Order"])
async def get_order_by_id(order_id: int):
    """
    Route for get order by OrderID.

    :param order_id: ID by order. [int]

    :return: response model Orders.
    """
    try:
        return await order_services.get_order_by_id(order_id)
    except HTTPException as ex:
        raise ex


@app.get("/orders/user/{user_id}", response_model=list[Orders], tags=["Order"])
async def get_order_by_user_id(user_id: int):
    """
    Route for get order by UserID.

    :param user_id: ID by User. [int]

    :return: response model list[Orders].
    """
    try:
        return await order_services.get_order_by_user_id(user_id)
    except HTTPException as ex:
        raise ex


@app.post("/orders/place_an_order/{user_id}", response_model=list[OrderProducts], tags=["Order"])
async def place_an_order(user_id: int, products: list[ProductsDict]):
    """
    Route for place an order.

    :param user_id: ID by User. [int]
    :param products: Dict with ProductID and quantity. [dict].

    :return: response model order.
    """
    try:
        return await order_services.place_an_order(user_id, products)
    except HTTPException as ex:
        raise ex


@app.get("/orders/get_hystory_orders_by_user_id/{user_id}", response_model=list[list[OrderProducts]],
         tags=["Order"])
async def get_hystory_orders_by_user_id(user_id: int):
    """
    Route for get history about product by UserID.

    :param user_id: ID by User. [int]

    :return: response model list[list[Products]].
    """
    try:
        return await order_services.get_hystory_orders_by_user_id(user_id)
    except HTTPException as ex:
        raise ex


@app.post("/orders/", response_model=Orders, tags=["Order"])
async def create_order(order: Orders):
    """
    Route for create order in basedata.

    :param order: Model order. [Order]

    :return: response model Order.
    """
    try:
        return await order_services.create_order(order)
    except HTTPException as ex:
        raise ex


@app.put("/orders/{order_id}", response_model=Dict, tags=["Order"])
async def update_order(order_id, order: Orders):
    """
    Route for update order in basedata.

    :param order_id: ID by order. [int]

    :param order: Model order. [Order]

    :return: response model dict.
    """
    try:
        return await order_services.update_order(order_id, order)
    except HTTPException as ex:
        raise ex


@app.delete("/orders/{order_id}", response_model=Dict, tags=["Order"])
async def delete_order(order_id):
    """
    Route for delete order from basedata.

    :param order_id: ID by order. [int]

    :return: response model dict.
    """
    try:
        return await order_services.delete_order(order_id)
    except HTTPException as ex:
        raise ex


@app.get("/orders_products/", response_model=list[OrderProducts], tags=["OrderProduct"])
async def get_all_orders_products():
    """
    Route for getting all orders products from basedata.

    :return: response model List[OrderProducts].
    """
    try:
        return await order_product_services.get_all_orders_products()
    except HTTPException as ex:
        raise ex


@app.get("/orders_products/id/{order_product_id}", response_model=OrderProducts,
         tags=["OrderProduct"])
async def get_order_product_by_id(order_product_id: int):
    """
    Route for getting order product by OrderProductID.

    :param order_product_id: ID of the order product. [int]

    :return: response model OrderProduct.
    """
    try:
        return await order_product_services.get_order_product_by_id(order_product_id)
    except HTTPException as ex:
        raise ex


@app.post("/orders_products/", response_model=OrderProducts, tags=["OrderProduct"])
async def create_order_product(order_product: OrderProducts):
    """
    Route for creating an order product in basedata.

    :param order_product: Model order product. [OrderProduct]

    :return: response model OrderProduct.
    """
    try:
        return await order_product_services.create_order_product(order_product)
    except HTTPException as ex:
        raise ex


@app.put("/orders_products/{order_product_id}", response_model=Dict, tags=["OrderProduct"])
async def update_order_product(order_product_id: int, order_product: OrderProducts):
    """
    Route for updating an order product in basedata.

    :param order_product_id: ID of the order product. [int]

    :param order_product: Model order product. [OrderProduct]

    :return: response model dict.
    """
    try:
        return await order_product_services.update_order_product(order_product_id, order_product)
    except HTTPException as ex:
        raise ex


@app.delete("/orders_products/{order_product_id}", response_model=Dict, tags=["OrderProduct"])
async def delete_order_product(order_product_id: int):
    """
    Route for deleting an order product from basedata.

    :param order_product_id: ID of the order product. [int]

    :return: response model dict.
    """
    try:
        return await order_product_services.delete_order_product(order_product_id)
    except HTTPException as ex:
        raise ex


@app.get("/product_comments/", response_model=list[ProductComments], tags=["ProductComment"])
async def get_all_product_comments():
    """
    Route for getting all product comments from basedata.

    :return: response model List[ProductComments].
    """
    try:
        return await product_comment_services.get_all_product_comments()
    except HTTPException as ex:
        raise ex


@app.get("/product_comments/id/{order_comment_id}", response_model=ProductComments,
         tags=["ProductComment"])
async def get_product_comment_by_id(product_comment_id: int):
    """
    Route for getting product comment by ProductCommentID.

    :param product_comment_id: ID of the product comment. [int]

    :return: response model ProductComments.
    """
    try:
        return await product_comment_services.get_product_comment_by_id(product_comment_id)
    except HTTPException as ex:
        raise ex


@app.post("/product_comments/", response_model=ProductComments, tags=["ProductComment"])
async def create_product_comment(product_comment: ProductComments):
    """
    Route for creating an order comment in basedata.

    :param product_comment: Model Product comment. [ProductComments]

    :return: response model ProductComments.
    """
    try:
        return await product_comment_services.create_product_comment(product_comment)
    except HTTPException as ex:
        raise ex


@app.put("/product_comments/{product_comment_id}", response_model=Dict, tags=["ProductComment"])
async def update_product_comment(product_comment_id: int, product_comment: ProductComments):
    """
    Route for updating an order comment in basedata.

    :param product_comment_id: ID of the order comment. [int]

    :param product_comment: Model order product. [ProductComments]

    :return: response model dict.
    """
    try:
        return await order_comment_services.update_order_comment(order_comment_id, order_comment)
    except HTTPException as ex:
        raise ex


@app.delete("/product_comments/{product_comment_id}", response_model=Dict, tags=["ProductComment"])
async def delete_product_comment(product_comment_id: int):
    """
    Route for deleting an product comment from basedata.

    :param product_comment_id: ID of the product comment. [int]

    :return: response model OpenApi"""
    try:
        return await product_comment_services.delete_product_comment(product_comment_id)
    except HTTPException as ex:
        raise ex


@app.get("/product_characteristics/", response_model=list[ProductCharacteristics], tags=["ProductCharacteristic"])
async def get_all_product_characteristics():
    """
    Route for getting all product characteristic from basedata.

    :return: response model List[ProductCharacteristics].
    """
    try:
        return await product_characteristic_services.get_all_product_characteristics()
    except HTTPException as ex:
        raise ex


@app.get("/product_characteristics/id/{product_characteristic_id}", response_model=ProductCharacteristics,
         tags=["ProductCharacteristic"])
async def get_product_characteristic_by_id(product_characteristic_id: int):
    """
    Route for getting product characteristic by ProductСharacteristicID.

    :param product_characteristic_id: ID of the product characteristic. [int]

    :return: response model ProductСharacteristics.
    """
    try:
        return await product_characteristic_services.get_product_characteristic_by_id(product_characteristic_id)
    except HTTPException as ex:
        raise ex


@app.post("/product_characteristics/", response_model=ProductCharacteristics, tags=["ProductCharacteristic"])
async def create_product_characteristic(product_characteristic: ProductCharacteristics):
    """
    Route for creating an product characteristic in basedata.

    :param order_comment: Model product characteristic. [ProductСharacteristics]

    :return: response model ProductСharacteristics.
    """
    try:
        return await product_characteristic_services.create_product_characteristic(product_characteristic)
    except HTTPException as ex:
        raise ex


@app.put("/product_characteristics/{product_characteristic_id}", response_model=Dict, tags=["ProductCharacteristic"])
async def update_product_characteristic(product_characteristic_id: int, product_characteristic: ProductCharacteristics):
    """
    Route for updating an product characteristic in basedata.

    :param product_characteristic_id: ID of the product characteristic. [int]

    :param product_characteristic: Model product characteristic. [ProductСharacteristics]

    :return: response model dict.
    """
    try:
        return await product_characteristic_services.update_product_characteristic(product_characteristic_id,
                                                                                   product_characteristic)
    except HTTPException as ex:
        raise ex


@app.delete("/product_characteristics/{product_characteristic_id}", response_model=Dict, tags=["ProductCharacteristic"])
async def delete_product_characteristic(product_characteristic_id: int):
    """
    Route for deleting an product characteristic from basedata.

    :param product characteristic_id: ID of the product characteristic. [int]

    :return: response model dict.
    """
    try:
        return await product_characteristic_services.delete_product_characteristic(product_characteristic_id)
    except HTTPException as ex:
        raise ex


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
