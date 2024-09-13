from fastapi import FastAPI, HTTPException, Depends, Request, File, UploadFile, Body, Header, status, Form
from src.database.my_connector import Database
from src.service import (category_services, characteristic_services, company_services,
                         image_services, product_comment_services, order_product_services,
                         order_services, product_characteristic_services, product_services,
                         file_services, user_services, promotion_services, type_user_services,
                         card_services, new_services, question_answer_services,
                         receipt_services, write_off_services, company_comment_services,
                         auth_services)
from typing import Dict
from fastapi.openapi.models import Tag
from src.database.models import (Users, Companies, Orders, Images, Categories, ProductsDict, Characteristics,
                                 OrderProducts, ProductComments, Products, ProductCharacteristics, Promotions,
                                 Cards, CompanyComments, News, QuestionAnswers, Receipts, TypeUsers, WriteOffs,
                                 TokenInfo, AuthJWT)
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, FileResponse
from src.utils.jwt_bearer import JWTBearer
from jwt import InvalidTokenError
from src.utils.custom_logging import setup_logging
from config import Config
from fastapi.staticfiles import StaticFiles

config = Config()
log = setup_logging()
app = FastAPI()

app.mount("/public", StaticFiles(directory="public"), name="public")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Определяем теги
AuthTag = Tag(name="Auth", description="Registration and authorization")
ImageServiceTag = Tag(name="ImageService", description="Upload/download image for object")
UserTag = Tag(name="User", description="CRUD operations user")
TypeUserTag = Tag(name="TypeUser", description="CRUD operations type user")
PromotionTag = Tag(name="Promotion", description="CRUD operations promotion")
NewTag = Tag(name="New", description="CRUD operations new")
CategoryTag = Tag(name="Category", description="CRUD operations category")
CharacteristicTag = Tag(name="Characteristic", description="CRUD operations characteristic")
CompanyTag = Tag(name="Company", description="CRUD operations company")
ImageTag = Tag(name="Image", description="CRUD operations image")
ProductCommentTag = Tag(name="ProductComment", description="CRUD operations product comment")
CompanyCommentTag = Tag(name="CompanyComment", description="CRUD operations company comment")
OrderProductTag = Tag(name="OrderProduct", description="CRUD operations order product")
OrderTag = Tag(name="Order", description="CRUD operations order")
ReceiptTag = Tag(name="Receipt", description="CRUD operations receipt")
WriteOffTag = Tag(name="WriteOff", description="CRUD operations write off")
CardTag = Tag(name="Card", description="CRUD operations card")
QuestionAnswerTag = Tag(name="QuestionAnswer", description="CRUD operations question answer")
ProductCharacteristicTag = Tag(name="ProductCharacteristic", description="CRUD operations  product characteristic")
ProductTag = Tag(name="Product", description="CRUD operations product")

# Настройка документации с тегами
app.openapi_tags = [
    AuthTag.model_dump(),
    ImageServiceTag.model_dump(),
    UserTag.model_dump(),
    TypeUserTag.model_dump(),
    PromotionTag.model_dump(),
    NewTag.model_dump(),
    CategoryTag.model_dump(),
    CharacteristicTag.model_dump(),
    CompanyTag.model_dump(),
    ImageTag.model_dump(),
    ProductCommentTag.model_dump(),
    CompanyCommentTag.model_dump(),
    OrderProductTag.model_dump(),
    OrderTag.model_dump(),
    ReceiptTag.model_dump(),
    WriteOffTag.model_dump(),
    CardTag.model_dump(),
    QuestionAnswerTag.model_dump(),
    ProductCharacteristicTag.model_dump(),
    ProductTag.model_dump()
]


@app.post("/signup/", response_model=TokenInfo, tags=["Auth"])
async def signup(user: Users = Depends(auth_services.validate_reg_user)):
    """
    Route for user registration.

    :param user: Model of user. [Users]

    :return: response model TokenInfo.
    """
    try:
        return auth_services.signup(user)
    except HTTPException as ex:
        log.exception(f"Error {ex}")
        raise ex


@app.post("/signin/", response_model=TokenInfo, tags=["Auth"])
async def signin(user: Users = Depends(auth_services.validate_auth_user)):
    """
    Route for user authorization.

    :param auth: Model of auth. [Auth]

    :return: response model TokenInfo.
    """
    try:
        return auth_services.signin(user)
    except HTTPException as ex:
        log.exception(f"Error {ex}")
        raise ex


@app.post("/auth_refresh_jwt/", response_model=TokenInfo, response_model_exclude_none=True,
          dependencies=[Depends(JWTBearer(access_level=1))], tags=["Auth"])
async def auth_refresh_jwt(user: Users = Depends(auth_services.UserGetFromToken("refresh_token_type"))):
    """
    Route for refresh jwt access token.

    :param token: valid refresh token. [Str]

    :return: response model TokenInfo.
    """
    try:
        return auth_services.auth_refresh_jwt(user)
    except HTTPException as ex:
        log.exception(f"Error {ex}")
        raise ex


@app.get("/get_current_auth_user/", response_model=Users, dependencies=[Depends(JWTBearer(access_level=1))],
         tags=["Auth"])
async def get_current_auth_user(user: Users = Depends(auth_services.UserGetFromToken("access_token_type"))):
    """
    Route for getting auth user.

    :param token: valid token. [Str]

    :return: response model User.
    """
    try:
        return user
    except HTTPException as ex:
        log.exception(f"Error {ex}")
        raise ex


@app.post("/image_upload/product", response_model=Products, tags=["ImageService"],
          dependencies=[Depends(JWTBearer(access_level=1))])
async def image_upload_product(files: list[UploadFile] = File(...), product_id: int = Form(...)):
    """
   Route for uploading multiple images for a product.

   :return: response model product [Products].
   """
    try:
        return await file_services.upload_images(
            entity_type="product",
            files=files,
            entity_id=product_id,
            get_entity_by_id=product_services.get_product_by_id,
            update_entity=product_services.update_product
        )
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.get("/image_download/product", response_model=Dict, tags=["ImageService"])
async def image_download_product(product_id: int):
    """
   Route for download product into basedata.

   :return: response model Dict.
   """
    try:
        return file_services.download_images(
            entity_type="product",
            entity_id=product_id,
            get_entity_by_id=product_services.get_product_by_id
        )
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.delete("/image_delete/product", response_model=Dict, tags=None,
            dependencies=[Depends(JWTBearer(access_level=1))])
async def image_delete_product(image_ids: list[int]):
    """
   Route for delete product into basedata.

   :return: response model Dict.
   """
    try:
        return file_services.delete_images(entity_type="product", image_ids=image_ids)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.post("/image_upload/product_comment", response_model=ProductComments, tags=["ImageService"],
          dependencies=[Depends(JWTBearer(access_level=1))])
async def image_upload_product_comment(files: list[UploadFile] = File(...), product_comment_id: int = Form(...)):
    """
   Route for uploading multiple images for a product comment.

   :return: response model product [ProductComments].
   """
    try:
        return await file_services.upload_images(
            entity_type="product_comment",
            files=files,
            entity_id=product_comment_id,
            get_entity_by_id=product_comment_services.get_product_comment_by_id,
            update_entity=product_comment_services.update_product_comment
        )
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.get("/image_download/product_comment", response_model=Dict, tags=["ImageService"])
async def image_download_product_comment(product_comment_id: int):
    """
   Route for download product into basedata.

   :return: response model Dict.
   """
    try:
        return file_services.download_images(
            entity_type="product_comment",
            entity_id=product_comment_id,
            get_entity_by_id=product_comment_services.get_product_comment_by_id
        )
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.delete("/image_delete/product_comment", response_model=Dict, tags=None,
            dependencies=[Depends(JWTBearer(access_level=1))])
async def image_delete_product_comment(image_ids: list[int]):
    """
   Route for delete product comment into basedata.

   :return: response model Dict.
   """
    try:
        return file_services.delete_images(entity_type="product_comment", image_ids=image_ids)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.post("/image_upload/company_comment", response_model=CompanyComments, tags=["ImageService"],
          dependencies=[Depends(JWTBearer(access_level=1))])
async def image_upload_company_comment(files: list[UploadFile] = File(...), company_comment_id: int = Form(...)):
    """
   Route for uploading multiple images for a company comment.

   :return: response model company comment [CompanyComments].
   """
    try:
        return await file_services.upload_images(
            entity_type="company_comment",
            files=files,
            entity_id=company_comment_id,
            get_entity_by_id=company_comment_services.get_company_comment_by_id,
            update_entity=company_comment_services.update_company_comment
        )
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.get("/image_download/company_comment", response_model=Dict, tags=["ImageService"])
async def image_download_company_comment(company_comment_id: int):
    """
   Route for download company comment into basedata.

   :return: response model Dict.
   """
    try:
        return file_services.download_images(
            entity_type="company_comment",
            entity_id=company_comment_id,
            get_entity_by_id=company_comment_services.get_company_comment_by_id
        )
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.delete("/image_delete/company_comment", response_model=Dict, tags=None,
            dependencies=[Depends(JWTBearer(access_level=1))])
async def image_delete_company_comment(image_ids: list[int]):
    """
   Route for delete company comment into basedata.

   :return: response model Dict.
   """
    try:
        return file_services.delete_images(entity_type="company_comment", image_ids=image_ids)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.post("/image_upload/new", response_model=News, tags=["ImageService"],
          dependencies=[Depends(JWTBearer(access_level=1))])
async def image_upload_new(files: list[UploadFile] = File(...), new_id: int = Form(...)):
    """
   Route for uploading multiple images for a new.

   :return: response model new [News].
   """
    try:
        return await file_services.upload_images(
            entity_type="new",
            files=files,
            entity_id=new_id,
            get_entity_by_id=new_services.get_new_by_id,
            update_entity=new_services.update_new
        )
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.get("/image_download/new", response_model=Dict, tags=["ImageService"])
async def image_download_new(new_id: int):
    """
   Route for download new into basedata.

   :return: response model Dict.
   """
    try:
        return file_services.download_images(
            entity_type="new",
            entity_id=new_id,
            get_entity_by_id=new_services.get_new_by_id
        )
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.delete("/image_delete/new", response_model=Dict, tags=None,
            dependencies=[Depends(JWTBearer(access_level=1))])
async def image_delete_newt(image_ids: list[int]):
    """
   Route for delete new into basedata.

   :return: response model Dict.
   """
    try:
        return file_services.delete_images(entity_type="new", image_ids=image_ids)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.get("/users/", response_model=list[Users], tags=["User"])
async def get_all_users():
    """
    Route for get all users from basedata.

    :return: response model List[Users].
    """
    try:
        return user_services.get_all_users()
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.get("/users/user_id/{user_id}", response_model=Users, tags=["User"])
async def get_user_by_id(user_id: int):
    """
    Route for get user by UserID.

    :param user_id: ID by user. [int]

    :return: response model Users.
    """
    try:
        return user_services.get_user_by_id(user_id)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.get("/users/telegram_id/{telegram_id}", response_model=Users, tags=["User"])
async def get_user_by_telegram_id(telegram_id: int):
    """
    Route for get user by user telegram_id.

    :param telegram_id: Telegram_id by user. [int]

    :return: response model Users.
    """
    try:
        return user_services.get_user_by_telegram_id(telegram_id)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.post("/users/", response_model=Users, tags=["User"],
          dependencies=[Depends(JWTBearer(access_level=1))])
async def create_user(user: Users):
    """
    Route for create user in basedata.

    :param user: Model user. [Users]

    :return: response model Users.
    """
    try:
        return user_services.create_user(user)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.put("/users/{user_id}", response_model=Dict, tags=["User"],
         dependencies=[Depends(JWTBearer(access_level=1))])
async def update_user(user_id, user: Users):
    """
    Route for update user in basedata.

    :param user_id: ID by user. [int]

    :param user: Model user. [Users]

    :return: response model dict.
    """
    try:
        return user_services.update_user(user_id, user)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.delete("/users/{user_id}", response_model=Dict, tags=None,
            dependencies=[Depends(JWTBearer(access_level=1))])
async def delete_user(user_id):
    """
    Route for delete user in basedata.

    :param user_id: ID by user. [int]

    :return: response model dict.
    """
    try:
        return user_services.delete_user(user_id)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.get("/type_users/", response_model=list[TypeUsers], tags=["TypeUser"])
async def get_all_type_users():
    """
    Route for get all type users from basedata.

    :return: response model List[TypeUsers].
    """
    try:
        return type_user_services.get_all_type_users()
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.get("/type_users/type_user_id/{type_user_id}", response_model=TypeUsers, tags=["TypeUser"])
async def get_type_user_by_id(type_user_id: int):
    """
    Route for get type user by TypeUserID.

    :param type_user_id: ID by type user. [int]

    :return: response model TypeUsers.
    """
    try:
        return type_user_services.get_type_user_by_id(type_user_id)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.post("/type_users/", response_model=TypeUsers, tags=["TypeUser"],
          dependencies=[Depends(JWTBearer(access_level=1))])
async def create_type_user(type_user: TypeUsers):
    """
    Route for create type user in basedata.

    :param type_user: Model type user. [TypeUsers]

    :return: response model TypeUsers.
    """
    try:
        return type_user_services.create_type_user(type_user)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.put("/type_users/{type_user_id}", response_model=Dict, tags=["TypeUser"],
         dependencies=[Depends(JWTBearer(access_level=1))])
async def update_type_user(type_user_id, type_user: TypeUsers):
    """
    Route for update type user in basedata.

    :param type_user_id: ID by type user. [int]

    :param type_user: Model type user. [TypeUsers]

    :return: response model dict.
    """
    try:
        return type_user_services.update_type_user(type_user_id, type_user)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.delete("/type_users/{type_user_id}", response_model=Dict, tags=None,
            dependencies=[Depends(JWTBearer(access_level=1))])
async def delete_type_user(type_user_id):
    """
    Route for delete type user in basedata.

    :param type_user_id: ID by type user. [int]

    :return: response model dict.
    """
    try:
        return type_user_services.delete_type_user(type_user_id)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.get("/promotions/", response_model=list[Promotions], tags=["Promotion"])
async def get_all_promotions():
    """
    Route for get all promotions from basedata.

    :return: response model List[Promotions].
    """
    try:
        return promotion_services.get_all_promotions()
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.get("/promotions/promotion_id/{promotion_id}", response_model=Promotions, tags=["Promotion"])
async def get_promotion_by_id(promotion_id: int):
    """
    Route for get promotion by PromotionID.

    :param promotion_id: ID by promotion. [int]

    :return: response model Promotions.
    """
    try:
        return promotion_services.get_promotion_by_id(promotion_id)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.get("/promotions/promotion_name/{promotion_name}", response_model=Promotions, tags=["Promotion"])
async def get_promotion_by_name(promotion_name: str):
    """
    Route for get promotion by PromotionID.

    :param promotion_name: ID by promotion. [int]

    :return: response model Promotions.
    """
    try:
        return promotion_services.get_promotion_by_name(promotion_name)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.post("/promotions/", response_model=Promotions, tags=["Promotion"],
          dependencies=[Depends(JWTBearer(access_level=1))])
async def create_promotion(promotion: Promotions):
    """
    Route for create promotion in basedata.

    :param promotion: Model promotion. [Promotions]

    :return: response model Promotions.
    """
    try:
        return promotion_services.create_promotion(promotion)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.put("/promotions/{promotion_id}", response_model=Dict, tags=["Promotion"],
         dependencies=[Depends(JWTBearer(access_level=1))])
async def update_promotion(promotion_id, promotion: Promotions):
    """
    Route for update promotion in basedata.

    :param promotion_id: ID by promotion. [int]

    :param promotion: Model promotion. [Promotions]

    :return: response model dict.
    """
    try:
        return promotion_services.update_promotion(promotion_id, promotion)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.delete("/promotions/{promotion_id}", response_model=Dict, tags=None,
            dependencies=[Depends(JWTBearer(access_level=1))])
async def delete_promotion(promotion_id):
    """
    Route for delete promotion from basedata.

    :param promotion_id: ID by promotion. [int]

    :return: response model dict.
    """
    try:
        return promotion_services.delete_promotion(promotion_id)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.get("/cards/", response_model=list[Cards], tags=["Card"])
async def get_all_cards():
    """
    Route for get all cards from basedata.

    :return: response model List[Card].
    """
    try:
        return card_services.get_all_cards()
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.get("/cards/card_id/{card_id}", response_model=Cards, tags=["Card"])
async def get_card_by_id(card_id: int):
    """
    Route for get card by CardID.

    :param card_id: ID by card. [int]

    :return: response model Cards.
    """
    try:
        return card_services.get_card_by_id(card_id)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.get("/cards/user_id/{user_id}", response_model=Cards, tags=["Card"])
async def get_card_by_user_id(user_id: int):
    """
    Route for get card by CardID.

    :param user_id: ID by User. [int]

    :return: response model Cards.
    """
    try:
        return card_services.get_card_by_user_id(user_id)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.post("/cards/", response_model=Cards, tags=["Card"],
          dependencies=[Depends(JWTBearer(access_level=1))])
async def create_card(card: Cards):
    """
    Route for create card in basedata.

    :param promotion: Model card. [Cards]

    :return: response model Cards.
    """
    try:
        return card_services.create_card(card)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.put("/cards/{card_id}", response_model=Dict, tags=["Card"],
         dependencies=[Depends(JWTBearer(access_level=1))])
async def update_card(card_id, card: Cards):
    """
    Route for update card in basedata.

    :param card_id: ID by card. [int]

    :param card: Model card. [Cards]

    :return: response model dict.
    """
    try:
        return card_services.update_card(card_id, card)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.delete("/cards/{card_id}", response_model=Dict, tags=None,
            dependencies=[Depends(JWTBearer(access_level=1))])
async def delete_card(card_id):
    """
    Route for delete card from basedata.

    :param card_id: ID by card. [int]

    :return: response model dict.
    """
    try:
        return card_services.delete_card(card_id)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.get("/news/", response_model=list[News], tags=["New"])
async def get_all_news():
    """
    Route for get all news from basedata.

    :return: response model List[News].
    """
    try:
        return new_services.get_all_news()
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.get("/news/new_id/{new_id}", response_model=News, tags=["New"])
async def get_new_by_id(new_id: int):
    """
    Route for get new by NewID.

    :param new_id: ID by new. [int]

    :return: response model News.
    """
    try:
        return new_services.get_new_by_id(new_id)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.post("/news/", response_model=News, tags=["New"],
          dependencies=[Depends(JWTBearer(access_level=1))])
async def create_new(new: News):
    """
    Route for create new in basedata.

    :param promotion: Model new. [New]

    :return: response model News.
    """
    try:
        return new_services.create_new(new)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.put("/news/{new_id}", response_model=Dict, tags=["New"],
         dependencies=[Depends(JWTBearer(access_level=1))])
async def update_new(new_id, new: News):
    """
    Route for update new in basedata.

    :param new_id: ID by new. [int]

    :param new: Model new. [News]

    :return: response model dict.
    """
    try:
        return new_services.update_new(new_id, new)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.delete("/news/{new_id}", response_model=Dict, tags=None,
            dependencies=[Depends(JWTBearer(access_level=1))])
async def delete_new(new_id):
    """
    Route for delete new from basedata.

    :param new_id: ID by new. [int]

    :return: response model dict.
    """
    try:
        return new_services.delete_new(new_id)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.get("/images/", response_model=list[Images], tags=["Image"])
async def get_all_images():
    """
    Route for get all image from basedata.

    :return: response model List[Images].
    """
    try:
        return image_services.get_all_images()
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.get("/images/image_id/{image_id}", response_model=Images, tags=["Image"])
async def get_image_by_id(image_id: int):
    """
    Route for get image by imageID.

    :param image_id: ID by image. [int]

    :param image: Model image. [Images]

    :return: response model Images.
    """
    try:
        return image_services.get_image_by_id(image_id)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.post("/images/", response_model=Images, tags=["Image"],
          dependencies=[Depends(JWTBearer(access_level=1))])
async def create_image(image: Images):
    """
    Route for create image in basedata.

    :param image_id: ID by image. [int]

    :param image: Model image. [Images]

    :return: response model Images.
    """
    try:
        return image_services.create_image(image)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.put("/images/{image_id}", response_model=Dict, tags=["Image"],
         dependencies=[Depends(JWTBearer(access_level=1))])
async def update_image(image_id, image: Images):
    """
    Route for update image in basedata.

    :param image_id: ID by image. [int]

    :param image: Model image. [Images]

    :return: response model dict.
    """
    try:
        return image_services.update_image(image_id, image)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.delete("/images/{image_id}", response_model=Dict, tags=None,
            dependencies=[Depends(JWTBearer(access_level=1))])
async def delete_image(image_id):
    """
    Route for delete image from basedata.

    :param image_id: ID by image. [int]

    :return: response model dict.
    """
    try:
        return image_services.delete_image(image_id)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.get("/products/", response_model=list[Products], tags=["Product"])
async def get_all_products():
    """
    Route for getting all products from basedata.

    :return: response model List[Products].
    """
    try:
        return product_services.get_all_products()
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.get("/products/product_id/{product_id}", response_model=Products, tags=["Product"])
async def get_product_by_id(product_id: int):
    """
    Route for getting product by ProductID.

    :param product_id: ID of the product. [int]

    :return: response model Products.
    """
    try:
        return product_services.get_product_by_id(product_id)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.post("/products/", response_model=Products, tags=["Product"],
          dependencies=[Depends(JWTBearer(access_level=1))])
async def create_product(product: Products):
    """
    Route for creating a product in basedata.

    :param product: Model product. [Products]

    :return: response model Products.
    """
    try:
        return product_services.create_product(product)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.put("/products/{product_id}", response_model=Dict, tags=["Product"],
         dependencies=[Depends(JWTBearer(access_level=1))])
async def update_product(product_id: int, product: Products):
    """
    Route for updating a product in basedata.

    :param product_id: ID of the product. [int]

    :param product: Model product. [Products]

    :return: response model dict.
    """
    try:
        return product_services.update_product(product_id, product)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.delete("/products/{product_id}", response_model=Dict, tags=None,
            dependencies=[Depends(JWTBearer(access_level=1))])
async def delete_product(product_id: int):
    """
    Route for deleting a product from basedata.

    :param product_id: ID of the product. [int]

    :return: response model dict.
    """
    try:
        return product_services.delete_product(product_id)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.get("/categories/", response_model=list[Categories], tags=["Category"])
async def get_all_categories():
    """
    Route for get all categories from basedata.

    :return: response model List[Categories].
    """
    try:
        return category_services.get_all_categories()
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.get("/categories/category_id/{category_id}", response_model=Categories, tags=["Category"])
async def get_category_by_id(category_id: int):
    """
    Route for get category by CategoryID.

    :param category_id: ID by category. [int]

    :return: response model Categories.
    """
    try:
        return category_services.get_category_by_id(category_id)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.post("/categories/", response_model=Categories, tags=["Category"],
          dependencies=[Depends(JWTBearer(access_level=1))])
async def create_category(category: Categories):
    """
    Route for create category in basedata.

    :param category: Model category. [Category]

    :return: response model Categories.
    """
    try:
        return category_services.create_category(category)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.put("/categories/{category_id}", response_model=Dict, tags=["Category"],
         dependencies=[Depends(JWTBearer(access_level=1))])
async def update_category(category_id, category: Categories):
    """
    Route for update category in basedata.

    :param category_id: ID by category. [int]

    :param category: Model category. [Categories]

    :return: response model dict.
    """
    try:
        return category_services.update_category(category_id, category)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.delete("/categories/{category_id}", response_model=Dict, tags=None,
            dependencies=[Depends(JWTBearer(access_level=1))])
async def delete_category(category_id):
    """
    Route for delete user from basedata.

    :param category_id: ID by Category. [int]

    :return: response model dict.
    """
    try:
        return category_services.delete_category(category_id)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.get("/companies/", response_model=list[Companies], tags=["Company"])
async def get_all_companies():
    """
    Route for get all companies from basedata.

    :return: response model List[Companies].
    """
    try:
        return company_services.get_all_companies()
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.get("/companies/company_id/{company_id}", response_model=Companies, tags=["Company"])
async def get_company_by_id(company_id: int):
    """
    Route for get company by CompanyID.

    :param company_id: ID by company. [int]

    :return: response model Companies.
    """
    try:
        return company_services.get_company_by_id(company_id)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.post("/companies/", response_model=Companies, tags=["Company"],
          dependencies=[Depends(JWTBearer(access_level=1))])
async def create_company(company: Companies):
    """
    Route for create company in basedata.

    :param company: Model company. [Companies]

    :return: response model Companies.
    """
    try:
        return company_services.create_company(company)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.put("/companies/{company_id}", response_model=Dict, tags=["Company"],
         dependencies=[Depends(JWTBearer(access_level=1))])
async def update_company(company_id, company: Companies):
    """
    Route for update company in basedata.

    :param company_id: ID by company. [int]

    :param company: Model company. [Companies]

    :return: response model dict.
    """
    try:
        return company_services.update_company(company_id, company)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.delete("/companies/{company_id}", response_model=Dict, tags=None,
            dependencies=[Depends(JWTBearer(access_level=1))])
async def delete_company(company_id):
    """
    Route for delete company from basedata.

    :param company_id: ID by Company. [int]

    :return: response model dict.
    """
    try:
        return company_services.delete_company(company_id)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.get("/characteristics/", response_model=list[Characteristics], tags=["Characteristic"])
async def get_all_characteristics():
    """
    Route for get all characteristics from basedata.

    :return: response model List[Characteristics].
    """
    try:
        return characteristic_services.get_all_characteristics()
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.get("/characteristics/characteristic_id/{characteristic_id}", response_model=Characteristics,
         tags=["Characteristic"])
async def get_characteristic_by_id(characteristic_id: int):
    """
    Route for get characteristic by CharacteristicID.

    :param characteristic_id: ID by characteristic. [int]

    :return: response model Characteristic.
    """
    try:
        return characteristic_services.get_characteristic_by_id(characteristic_id)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.post("/characteristics/", response_model=Characteristics, tags=["Characteristic"],
          dependencies=[Depends(JWTBearer(access_level=1))])
async def create_characteristic(characteristic: Characteristics):
    """
    Route for create characteristic in basedata.

    :param characteristic: Model characteristic. [Characteristic]

    :return: response model Characteristic.
    """
    try:
        return characteristic_services.create_characteristic(characteristic)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.put("/characteristics/{characteristic_id}", response_model=Dict, tags=["Characteristic"],
         dependencies=[Depends(JWTBearer(access_level=1))])
async def update_characteristic(characteristic_id, characteristic: Characteristics):
    """
    Route for update characteristic in basedata.

    :param characteristic_id: ID by characteristic. [int]

    :param characteristic: Model characteristic. [Characteristic]

    :return: response model dict.
    """
    try:
        return characteristic_services.update_characteristic(characteristic_id, characteristic)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.delete("/characteristics/{characteristic_id}", response_model=Dict, tags=None,
            dependencies=[Depends(JWTBearer(access_level=1))])
async def delete_characteristic(characteristic_id):
    """
    Route for delete characteristic from basedata.

    :param characteristic_id: ID by characteristic. [int]

    :return: response model dict.
    """
    try:
        return characteristic_services.delete_characteristic(characteristic_id)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.get("/orders/", response_model=list[Orders], tags=["Order"])
async def get_all_orders():
    """
    Route for get all order from basedata.

    :return: response model List[Orders].
    """
    try:
        return order_services.get_all_orders()
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.get("/orders/order_id/{order_id}", response_model=Orders, tags=["Order"])
async def get_order_by_id(order_id: int):
    """
    Route for get order by OrderID.

    :param order_id: ID by order. [int]

    :return: response model Orders.
    """
    try:
        return order_services.get_order_by_id(order_id)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.get("/orders/user_id/{user_id}", response_model=list[Orders], tags=["Order"])
async def get_order_by_user_id(user_id: int):
    """
    Route for get order by UserID.

    :param user_id: ID by User. [int]

    :return: response model list[Orders].
    """
    try:
        return order_services.get_order_by_user_id(user_id)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
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
        return order_services.place_an_order(user_id, products)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
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
        return order_services.get_hystory_orders_by_user_id(user_id)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.post("/orders/", response_model=Orders, tags=["Order"],
          dependencies=[Depends(JWTBearer(access_level=1))])
async def create_order(order: Orders):
    """
    Route for create order in basedata.

    :param order: Model order. [Order]

    :return: response model Order.
    """
    try:
        return order_services.create_order(order)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.put("/orders/{order_id}", response_model=Dict, tags=["Order"],
         dependencies=[Depends(JWTBearer(access_level=1))])
async def update_order(order_id, order: Orders):
    """
    Route for update order in basedata.

    :param order_id: ID by order. [int]

    :param order: Model order. [Order]

    :return: response model dict.
    """
    try:
        return order_services.update_order(order_id, order)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.delete("/orders/{order_id}", response_model=Dict, tags=None,
            dependencies=[Depends(JWTBearer(access_level=1))])
async def delete_order(order_id):
    """
    Route for delete order from basedata.

    :param order_id: ID by order. [int]

    :return: response model dict.
    """
    try:
        return order_services.delete_order(order_id)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.get("/orders_products/", response_model=list[OrderProducts], tags=["OrderProduct"])
async def get_all_orders_products():
    """
    Route for getting all orders products from basedata.

    :return: response model List[OrderProducts].
    """
    try:
        return order_product_services.get_all_orders_products()
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.get("/orders_products/order_product_id/{order_product_id}", response_model=OrderProducts,
         tags=["OrderProduct"])
async def get_order_product_by_id(order_product_id: int):
    """
    Route for getting order product by OrderProductID.

    :param order_product_id: ID of the order product. [int]

    :return: response model OrderProduct.
    """
    try:
        return order_product_services.get_order_product_by_id(order_product_id)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.post("/orders_products/", response_model=OrderProducts, tags=["OrderProduct"],
          dependencies=[Depends(JWTBearer(access_level=1))])
async def create_order_product(order_product: OrderProducts):
    """
    Route for creating an order product in basedata.

    :param order_product: Model order product. [OrderProduct]

    :return: response model OrderProduct.
    """
    try:
        return order_product_services.create_order_product(order_product)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.put("/orders_products/{order_product_id}", response_model=Dict, tags=["OrderProduct"],
         dependencies=[Depends(JWTBearer(access_level=1))])
async def update_order_product(order_product_id: int, order_product: OrderProducts):
    """
    Route for updating an order product in basedata.

    :param order_product_id: ID of the order product. [int]

    :param order_product: Model order product. [OrderProduct]

    :return: response model dict.
    """
    try:
        return order_product_services.update_order_product(order_product_id, order_product)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.delete("/orders_products/{order_product_id}", response_model=Dict, tags=None,
            dependencies=[Depends(JWTBearer(access_level=1))])
async def delete_order_product(order_product_id: int):
    """
    Route for deleting an order product from basedata.

    :param order_product_id: ID of the order product. [int]

    :return: response model dict.
    """
    try:
        return order_product_services.delete_order_product(order_product_id)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.get("/product_comments/", response_model=list[ProductComments], tags=["ProductComment"])
async def get_all_product_comments():
    """
    Route for getting all product comments from basedata.

    :return: response model List[ProductComments].
    """
    try:
        return product_comment_services.get_all_product_comments()
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.get("/product_comments/product_comment_id/{product_comment_id}", response_model=ProductComments,
         tags=["ProductComment"])
async def get_product_comment_by_id(product_comment_id: int):
    """
    Route for getting product comment by ProductCommentID.

    :param product_comment_id: ID of the product comment. [int]

    :return: response model ProductComments.
    """
    try:
        return product_comment_services.get_product_comment_by_id(product_comment_id)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.post("/product_comments/", response_model=ProductComments, tags=["ProductComment"],
          dependencies=[Depends(JWTBearer(access_level=1))])
async def create_product_comment(product_comment: ProductComments):
    """
    Route for creating an order comment in basedata.

    :param product_comment: Model Product comment. [ProductComments]

    :return: response model ProductComments.
    """
    try:
        return product_comment_services.create_product_comment(product_comment)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.put("/product_comments/{product_comment_id}", response_model=Dict, tags=["ProductComment"],
         dependencies=[Depends(JWTBearer(access_level=1))])
async def update_product_comment(product_comment_id: int, product_comment: ProductComments):
    """
    Route for updating an order comment in basedata.

    :param product_comment_id: ID of the product comment. [int]

    :param product_comment: Model order product. [ProductComments]

    :return: response model dict.
    """
    try:
        return product_comment_services.update_product_comment(product_comment_id, product_comment)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.delete("/product_comments/{product_comment_id}", response_model=Dict, tags=None,
            dependencies=[Depends(JWTBearer(access_level=1))])
async def delete_product_comment(product_comment_id: int):
    """
    Route for deleting an product comment from basedata.

    :param product_comment_id: ID of the product comment. [int]

    :return: response model product comment. [ProductComments]
    """
    try:
        return product_comment_services.delete_product_comment(product_comment_id)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.get("/company_comments/", response_model=list[CompanyComments], tags=["CompanyComment"])
async def get_all_company_comments():
    """
    Route for getting all company comments from basedata.

    :return: response model List[CompanyComments].
    """
    try:
        return company_comment_services.get_all_company_comments()
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.get("/company_comments/company_comment_id/{company_comment_id}", response_model=CompanyComments,
         tags=["CompanyComment"])
async def get_company_comment_by_id(company_comment_id: int):
    """
    Route for getting company comment by CompanyCommentID.

    :param company_comment_id: ID of the company comment. [int]

    :return: response model CompanyComments.
    """
    try:
        return company_comment_services.get_company_comment_by_id(company_comment_id)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.post("/company_comments/", response_model=CompanyComments, tags=["CompanyComment"],
          dependencies=[Depends(JWTBearer(access_level=1))])
async def create_company_comment(company_comment: CompanyComments):
    """
    Route for creating an company comment in basedata.

    :param company_comment: Model Company comment. [CompanyComments]

    :return: response model CompanyComments.
    """
    try:
        return company_comment_services.create_company_comment(company_comment)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.put("/company_comments/{company_comment_id}", response_model=Dict, tags=["CompanyComment"],
         dependencies=[Depends(JWTBearer(access_level=1))])
async def update_company_comment(company_comment_id: int, company_comment: CompanyComments):
    """
    Route for updating an company comment in basedata.

    :param company_comment_id: ID of the company comment. [int]

    :param company_comment: Model company product. [CompanyComments]

    :return: response model dict.
    """
    try:
        return company_comment_services.update_company_comment(company_comment_id, company_comment)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.delete("/company_comments/{company_comment_id}", response_model=Dict, tags=None,
            dependencies=[Depends(JWTBearer(access_level=1))])
async def delete_company_comment(company_comment_id: int):
    """
    Route for deleting an company comment from basedata.

    :param company_comment_id: ID of the company comment. [int]

    :return: response model company comment. [CompanyComments]
    """
    try:
        return company_comment_services.delete_company_comment(company_comment_id)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.get("/product_characteristics/", response_model=list[ProductCharacteristics], tags=["ProductCharacteristic"])
async def get_all_product_characteristics():
    """
    Route for getting all product characteristic from basedata.

    :return: response model List[ProductCharacteristics].
    """
    try:
        return product_characteristic_services.get_all_product_characteristics()
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.get("/product_characteristics/product_characteristic_id/{product_characteristic_id}",
         response_model=ProductCharacteristics,
         tags=["ProductCharacteristic"])
async def get_product_characteristic_by_id(product_characteristic_id: int):
    """
    Route for getting product characteristic by ProductСharacteristicID.

    :param product_characteristic_id: ID of the product characteristic. [int]

    :return: response model ProductСharacteristics.
    """
    try:
        return product_characteristic_services.get_product_characteristic_by_id(product_characteristic_id)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.post("/product_characteristics/", response_model=ProductCharacteristics, tags=["ProductCharacteristic"],
          dependencies=[Depends(JWTBearer(access_level=1))])
async def create_product_characteristic(product_characteristic: ProductCharacteristics):
    """
    Route for creating an product characteristic in basedata.

    :param order_comment: Model product characteristic. [ProductСharacteristics]

    :return: response model ProductСharacteristics.
    """
    try:
        return product_characteristic_services.create_product_characteristic(product_characteristic)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.put("/product_characteristics/{product_characteristic_id}", response_model=Dict, tags=["ProductCharacteristic"],
         dependencies=[Depends(JWTBearer(access_level=1))])
async def update_product_characteristic(product_characteristic_id: int, product_characteristic: ProductCharacteristics):
    """
    Route for updating an product characteristic in basedata.

    :param product_characteristic_id: ID of the product characteristic. [int]

    :param product_characteristic: Model product characteristic. [ProductСharacteristics]

    :return: response model dict.
    """
    try:
        return product_characteristic_services.update_product_characteristic(product_characteristic_id,
                                                                             product_characteristic)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.delete("/product_characteristics/{product_characteristic_id}", response_model=Dict, tags=None,
            dependencies=[Depends(JWTBearer(access_level=1))])
async def delete_product_characteristic(product_characteristic_id: int):
    """
    Route for deleting an product characteristic from basedata.

    :param product characteristic_id: ID of the product characteristic. [int]

    :return: response model dict.
    """
    try:
        return product_characteristic_services.delete_product_characteristic(product_characteristic_id)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.get("/receipts/", response_model=list[Receipts], tags=["Receipt"])
async def get_all_receipts():
    """
    Route for get all receipts from basedata.

    :return: response model List[Receipts].
    """
    try:
        return receipt_services.get_all_receipts()
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.get("/receipts/receipt_id/{receipt_id}", response_model=Receipts, tags=["Receipt"])
async def get_receipt_by_id(receipt_id: int):
    """
    Route for get receipt by ReceiptID.

    :param receipt_id: ID by receipt. [int]

    :return: response model Receipts.
    """
    try:
        return receipt_services.get_receipt_by_id(receipt_id)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.post("/receipts/", response_model=Receipts, tags=["Receipt"],
          dependencies=[Depends(JWTBearer(access_level=1))])
async def create_receipt(receipt: Receipts):
    """
    Route for create receipt in basedata.

    :param receipt: Model receipt. [Receipts]

    :return: response model Receipts.
    """
    try:
        return receipt_services.create_receipt(receipt)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.put("/receipts/{receipt_id}", response_model=Dict, tags=["Receipt"],
         dependencies=[Depends(JWTBearer(access_level=1))])
async def update_receipt(receipt_id, receipt: Receipts):
    """
    Route for update receipt in basedata.

    :param receipt_id: ID by receipt. [int]

    :param receipt: Model receipt. [Receipts]

    :return: response model dict.
    """
    try:
        return receipt_services.update_receipt(receipt_id, receipt)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.delete("/receipts/{receipt_id}", response_model=Dict, tags=None,
            dependencies=[Depends(JWTBearer(access_level=1))])
async def delete_receipt(receipt_id):
    """
    Route for delete receipt in basedata.

    :param receipt_id: ID by receipt. [int]

    :return: response model dict.
    """
    try:
        return receipt_services.delete_receipt(receipt_id)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.get("/write_offs/", response_model=list[WriteOffs], tags=["WriteOff"])
async def get_all_write_offs():
    """
    Route for get all write_offs from basedata.

    :return: response model List[WriteOff].
    """
    try:
        return write_off_services.get_all_write_offs()
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.get("/write_offs/write_off_id/{write_off_id}", response_model=WriteOffs, tags=["WriteOff"])
async def get_write_off_by_id(write_off_id: int):
    """
    Route for get write_off by WriteOffID.

    :param write_off_id: ID by write off. [int]

    :return: response model write offs. [WriteOff]
    """
    try:
        return write_off_services.get_write_off_by_id(write_off_id)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.post("/write_offs/", response_model=WriteOffs, tags=["WriteOff"],
          dependencies=[Depends(JWTBearer(access_level=1))])
async def create_write_off(write_off: WriteOffs):
    """
    Route for create write off in basedata.

    :param write_off: Model write off. [WriteOff]

    :return: response model write offs. [WriteOff]
    """
    try:
        return write_off_services.create_write_off(write_off)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.put("/write_offs/{write_off_id}", response_model=Dict, tags=["WriteOff"],
         dependencies=[Depends(JWTBearer(access_level=1))])
async def update_write_off(write_off_id, write_off: WriteOffs):
    """
    Route for update write off in basedata.

    :param write_off_id: ID by write off. [int]

    :param write_off: Model write_off. [WriteOff]

    :return: response model dict.
    """
    try:
        return write_off_services.update_write_off(write_off_id, write_off)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.delete("/write_offs/{write_off_id}", response_model=Dict, tags=None,
            dependencies=[Depends(JWTBearer(access_level=1))])
async def delete_write_off(write_off_id):
    """
    Route for delete write_off in basedata.

    :param write_off_id: ID by write_off. [int]

    :return: response model dict.
    """
    try:
        return write_off_services.delete_write_off(write_off_id)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.get("/question_answers/", response_model=list[QuestionAnswers], tags=["QuestionAnswer"])
async def get_all_question_answers():
    """
    Route for get all question_answers from basedata.

    :return: response model List[QuestionAnswers].
    """
    try:
        return question_answer_services.get_all_question_answers()
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.get("/question_answers/question_answer_id/{question_answer_id}", response_model=QuestionAnswers,
         tags=["QuestionAnswer"])
async def get_question_answer_by_id(question_answer_id: int):
    """
    Route for get question_answer by QuestionAnswerID.

    :param question_answer_id: ID by question answer. [int]

    :return: response model question answers. [QuestionAnswer]
    """
    try:
        return question_answer_services.get_question_answer_by_id(question_answer_id)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.post("/question_answers/", response_model=QuestionAnswers, tags=["QuestionAnswer"],
          dependencies=[Depends(JWTBearer(access_level=1))])
async def create_question_answer(question_answer: QuestionAnswers):
    """
    Route for create question_answer in basedata.

    :param question_answer: Model question answer. [QuestionAnswers]

    :return: response model question answers. [QuestionAnswers]
    """
    try:
        return question_answer_services.create_question_answer(question_answer)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.put("/question_answers/{question_answer_id}", response_model=Dict, tags=["QuestionAnswer"],
         dependencies=[Depends(JWTBearer(access_level=1))])
async def update_question_answer(question_answer_id, question_answer: QuestionAnswers):
    """
    Route for update write off in basedata.

    :param write_off_id: ID by write off. [int]

    :param write_off: Model write_off. [QuestionAnswers]

    :return: response model dict.
    """
    try:
        return question_answer_services.update_question_answer(question_answer_id, question_answer)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


@app.delete("/question_answers/{question_answer_id}", response_model=Dict, tags=None,
            dependencies=[Depends(JWTBearer(access_level=1))])
async def delete_question_answer(question_answer_id):
    """
    Route for delete question_answer in basedata.

    :param question_answer_id: ID by question_answer. [int]

    :return: response model dict.
    """
    try:
        return question_answer_services.delete_question_answer(question_answer_id)
    except HTTPException as ex:
        log.exception(f"Error", exc_info=ex)
        raise ex


def run_server():
    import logging
    import uvicorn
    import yaml
    uvicorn_log_config = 'logging.yaml'
    with open(uvicorn_log_config, 'r') as f:
        uvicorn_config = yaml.safe_load(f.read())
        logging.config.dictConfig(uvicorn_config)
    uvicorn.run("main:app", host=config.__getattr__("HOST"), port=int(config.__getattr__("SERVER_PORT")),
                reload=True, log_config=uvicorn_log_config)


if __name__ == "__main__":
    # Создание датабазы и таблиц, если они не существуют
    log.info("Start create/update database")
    from create_sql import CreateSQL

    create_sql = CreateSQL()
    create_sql.read_sql()

    # Запуск сервера и бота
    log.info("Start run server")
    run_server()
