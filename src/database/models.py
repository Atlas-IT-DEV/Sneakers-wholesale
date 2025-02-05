from pydantic import (BaseModel, Field, StrictStr, Json, condecimal,
                      StrictInt, PrivateAttr, SecretBytes, StrictBytes, StrictBool, root_validator)
from pydantic_settings import BaseSettings
from enum import Enum
from typing import Optional, List, ClassVar
from datetime import datetime
import os
from pathlib import Path
from config import Config

config = Config()

ACCESS_TOKEN_EXPIRE_MINUTES = int(config.__getattr__("ACCESS_TOKEN_EXPIRE_MINUTES"))
REFRESH_TOKEN_EXPIRE_DAYS = int(config.__getattr__("REFRESH_TOKEN_EXPIRE_DAYS"))


class AuthJWT(BaseModel):
    private_key_path: Optional[str] = None
    public_key_path: Optional[str] = None
    _private_key_content: str = PrivateAttr()
    _public_key_content: str = PrivateAttr()
    access_token_expire_minutes: ClassVar[int] = ACCESS_TOKEN_EXPIRE_MINUTES
    refresh_token_expire_days: ClassVar[int] = REFRESH_TOKEN_EXPIRE_DAYS

    def __init__(self, **data):
        super().__init__(**data)
        self._private_key_content: Path = Path(__file__).resolve().parent.parent / "certs" / "jwt-private.pem"
        self._public_key_content: Path = Path(__file__).resolve().parent.parent / "certs" / "jwt-public.pem"

    @property
    def private_key_content(self):
        return self._private_key_content

    @property
    def public_key_content(self):
        return self._public_key_content


class Settings(BaseSettings):
    auth_jwt: AuthJWT = AuthJWT()
    algoritm: str = "RS256"


class TokenInfo(BaseModel):
    """
    Model of information about token
    """
    AccessToken: StrictStr = Field(...,
                                   alias="access_token")
    RefreshToken: Optional[StrictStr] = Field(None,
                                              alias="refresh_token")
    Type: StrictStr = Field("Bearer",
                            alias="token_type")


class Auth(BaseModel):
    """
    Model of authorization
    """
    TelegramID: StrictInt = Field(...,
                                  alias="telegram_id",
                                  examples=[13])


class RoleEnum(StrictStr, Enum):
    """
    Model of choice role
    """
    user = 'user'
    admin = 'admin'


class CharacteristicTypeEnum(StrictStr, Enum):
    """
    Model of characteristic types
    """
    Int = 'INT'
    Varchar = 'VARCHAR'
    Boolean = 'BOOLEAN'
    Float = 'FLOAT'
    Text = 'TEXT'
    TimeStamp = 'TIMESTAMP'
    Decimal = 'DECIMAL'
    Json = 'JSON'


class Images(BaseModel):
    """
    Model of images
    """
    ID: Optional[int] = Field(None,
                              alias="id")
    Url: StrictStr = Field(...,
                           alias="url",
                           examples=["https://example.com"],
                           description="URL of images")


class TypeUsers(BaseModel):
    """
    Model of user types
    """
    ID: Optional[int] = Field(None,
                              alias="id")
    Type: StrictStr = Field(...,
                            alias="type",
                            examples=["Новичек"],
                            description="Type of user")


class Users(BaseModel):
    """
    Model of users
    """
    ID: Optional[int] = Field(None,
                              alias="id")
    FName: StrictStr = Field(...,
                             alias="first_name",
                             examples=["Коля"],
                             description="First name of user")
    LName: StrictStr = Field(...,
                             alias="last_name",
                             examples=["Ермолин"],
                             description="Last name of user")
    TelegramID: StrictInt = Field(...,
                                  alias="telegram_id",
                                  examples=[32],
                                  description="Telegram ID of user")
    TypeID: Optional[StrictInt] = Field(None,
                                        alias="type_id",
                                        examples=[32],
                                        description="Type ID of user")
    Role: Optional[RoleEnum] = Field(RoleEnum.user,
                                     alias="role",
                                     examples=[RoleEnum.user])


class Companies(BaseModel):
    """
    Model of companies
    """
    ID: Optional[int] = Field(None,
                              alias="id")
    Name: StrictStr = Field(...,
                            alias="name",
                            examples=["Nike"],
                            description="Name of company")
    Desc: Optional[StrictStr] = Field(None,
                                      alias="description",
                                      examples=["Производитель спортивной одежды"],
                                      description="Description of company")


class CompanyComments(BaseModel):
    """
    Model of company comments
    """
    ID: Optional[int] = Field(None,
                              alias="id")
    CompanyID: StrictInt = Field(...,
                                 alias="company_id",
                                 examples=[2],
                                 description="Company ID")
    UserID: StrictInt = Field(...,
                              alias="user_id",
                              examples=[2],
                              description="User ID")
    Comment: StrictStr = Field(...,
                               alias="comment",
                               examples=["Эта обувь мне не понравилась"],
                               description="Description of product")
    CreatedAt: Optional[datetime] = Field(datetime.now(),
                                          alias="created_at",
                                          examples=[f"{datetime.now()}"],
                                          description="Date of creation")
    ImageID: Optional[StrictStr] = Field(None,
                                         alias="image_id",
                                         examples=["1,2,4"],
                                         description="Image ID of product")


class QuestionAnswers(BaseModel):
    """
    Model of question answers
    """
    ID: Optional[int] = Field(None,
                              alias="id")
    UserID: StrictInt = Field(...,
                              alias="user_id",
                              examples=[2],
                              description="User ID")
    Question: StrictStr = Field(...,
                                alias="question",
                                examples=["Эта обувь мне не понравилась"],
                                description="Description of product")
    Answer: StrictStr = Field(...,
                              alias="answer",
                              examples=["Можно заменить обувь?"],
                              description="Answer of product")


class Categories(BaseModel):
    """
    Model of categories
    """
    ID: Optional[int] = Field(None,
                              alias="id")
    Name: StrictStr = Field(...,
                            alias="name",
                            examples=["Обувь"],
                            description="Name of category")


class Characteristics(BaseModel):
    """
    Model of characteristics
    """
    ID: Optional[int] = Field(None,
                              alias="id")
    Name: StrictStr = Field(...,
                            alias="name",
                            examples=["Размер"],
                            description="Name of characteristic")
    Type: CharacteristicTypeEnum = Field(...,
                                         alias="type",
                                         examples=[CharacteristicTypeEnum.Int],
                                         description="Type of characteristic")


class Promotions(BaseModel):
    """
    Model of promotions
    """
    ID: Optional[int] = Field(None,
                              alias="id")
    Name: StrictStr = Field(...,
                            alias="name",
                            examples=["Скидка 8 процентов"],
                            description="Name of promotion")
    Quantity: StrictInt = Field(...,
                                alias="quantity",
                                examples=[2],
                                description="Quantity of product")
    Sale: StrictInt = Field(...,
                            alias="sale",
                            examples=[15],
                            description="Sale of product")


class Favorite(BaseModel):
    """
    Model of favorite
    """
    ID: Optional[int] = Field(None,
                              alias="id")
    UserID: int = Field(...,
                        alias="user_id",
                        examples=[10],
                        description="User ID")
    ProductID: int = Field(...,
                           alias="product_id",
                           examples=[12],
                           description="Product ID")


class Products(BaseModel):
    """
    Model of products
    """
    ID: Optional[int] = Field(None,
                              alias="id")
    Name: StrictStr = Field(...,
                            alias="name",
                            examples=["Пюрешка с коклеткой"],
                            description="Name of product")
    Price: condecimal(max_digits=10, decimal_places=2) = Field(...,
                                                               alias="price",
                                                               examples=[1000.00],
                                                               description="Price of product")
    Desc: StrictStr = Field(...,
                            alias="description",
                            examples=["Дизайнерская обувь дольчигабиба"])
    CategoryID: StrictInt = Field(...,
                                  alias="category_id",
                                  examples=[2],
                                  description="Category ID of product")
    PromotionID: StrictInt = Field(...,
                                   alias="promotion_id",
                                   examples=[1],
                                   description="PromotionID of product")
    CompanyID: StrictInt = Field(...,
                                 alias="company_id",
                                 examples=[32],
                                 description="Company ID of product")
    ImageID: Optional[StrictStr] = Field(None,
                                         alias="image_id",
                                         examples=["1,2,4"],
                                         description="Image ID of product")
    TypeProduct: Optional[StrictStr] = Field(None,
                                             alias="type_product",
                                             examples=["Опт"],
                                             description="Product type")


class ProductCharacteristics(BaseModel):
    """
    Model of products characteristics
    """
    ID: Optional[int] = Field(None,
                              alias="id")
    ProductID: StrictInt = Field(...,
                                 alias="product_id",
                                 examples=[2],
                                 description="Product ID of product")
    CharacteristicID: StrictInt = Field(...,
                                        alias="characteristic_id",
                                        examples=[2],
                                        description="Characteristic ID of product")
    Value: StrictStr = Field(...,
                             alias="value",
                             examples=["35"],
                             description="Value of characteristic")


class ProductsDict(BaseModel):
    """
    Model of products dict
    """
    ProductID: StrictInt = Field(...,
                                 alias="product_id",
                                 examples=[2],
                                 description="Product ID of product")
    Quantity: StrictInt = Field(...,
                                alias="quantity",
                                examples=[2],
                                description="Quantity of product")


class Orders(BaseModel):
    """
    Model of orders
    """
    ID: Optional[int] = Field(None,
                              alias="id")
    UserID: StrictInt = Field(...,
                              alias="user_id",
                              examples=[32],
                              description="User ID of user")
    Date: Optional[datetime] = Field(datetime.now(),
                                     alias="date",
                                     examples=[f"{datetime.now()}"],
                                     description="Date of order")
    TotalPrice: condecimal(max_digits=10, decimal_places=2) = Field(...,
                                                                    alias="total_price",
                                                                    examples=[10],
                                                                    description="Total price of order")


class OrderProducts(BaseModel):
    """
    Model of order products
    """
    ID: Optional[int] = Field(None,
                              alias="id")
    OrderID: StrictInt = Field(...,
                               alias="order_id",
                               examples=[32],
                               description="Order ID of product")
    ProductID: StrictInt = Field(...,
                                 alias="product_id",
                                 examples=[2],
                                 description="Product ID of product")
    Quantity: StrictInt = Field(...,
                                alias="quantity",
                                examples=[2],
                                description="Quantity of product")


class News(BaseModel):
    """
    Model of news
    """
    ID: Optional[int] = Field(None,
                              alias="id")
    Name: StrictStr = Field(...,
                            alias="name",
                            examples=["Новое летнее предложение"],
                            description="Name of news")
    Desc: Optional[StrictStr] = Field(None,
                                      alias="description",
                                      examples=["Вышла новая летняя коллекция"],
                                      description="Description of news")
    ImageID: Optional[StrictStr] = Field(None,
                                         alias="image_id",
                                         examples=["1,2,4"],
                                         description="Image ID of news")


class Cards(BaseModel):
    """
    Model of cards
    """
    ID: Optional[int] = Field(None,
                              alias="id")
    UserID: StrictInt = Field(...,
                              alias="user_id",
                              examples=[32],
                              description="User ID of user")
    ProductID: StrictInt = Field(...,
                                 alias="product_id",
                                 examples=[2],
                                 description="Product ID of product")
    Quantity: StrictInt = Field(...,
                                alias="quantity",
                                examples=[2],
                                description="Quantity of product")


class ProductComments(BaseModel):
    """
    Model of product comments
    """
    ID: Optional[int] = Field(None,
                              alias="id")
    ProductID: StrictInt = Field(...,
                                 alias="product_id",
                                 examples=[2],
                                 description="Product ID of product")
    UserID: StrictInt = Field(...,
                              alias="user_id",
                              examples=[2],
                              description="User ID of user")
    Comment: StrictStr = Field(...,
                               alias="comment",
                               examples=["jenfjnaofnaonfov"],
                               description="Description of product")
    CreatedAt: Optional[datetime] = Field(datetime.now(),
                                          alias="created_at",
                                          examples=[f"{datetime.now()}"],
                                          description="Date of creation")
    ImageID: Optional[StrictStr] = Field(...,
                                         alias="image_id",
                                         examples=["1,2,4"],
                                         description="Image ID of product comment")


class Receipts(BaseModel):
    """
    Model of receipts
    """
    ID: Optional[int] = Field(None,
                              alias="id")
    ProductID: StrictInt = Field(...,
                                 alias="product_id",
                                 examples=[2],
                                 description="Product ID of product")
    CompanyID: StrictInt = Field(...,
                                 alias="company_id",
                                 examples=[2],
                                 description="Company ID")
    Quantity: StrictInt = Field(...,
                                alias="quantity",
                                examples=[2],
                                description="Quantity of product")
    Date: Optional[datetime] = Field(datetime.now(),
                                     alias="date",
                                     examples=[f"{datetime.now()}"],
                                     description="Date of creation")


class WriteOffs(BaseModel):
    """
    Model of write_offs
    """
    ID: Optional[int] = Field(None,
                              alias="id")
    ProductID: StrictInt = Field(...,
                                 alias="product_id",
                                 examples=[2],
                                 description="Product ID of product")
    Quantity: StrictInt = Field(...,
                                alias="quantity",
                                examples=[2],
                                description="Quantity of product")
    Date: Optional[datetime] = Field(datetime.now(),
                                     alias="date",
                                     examples=[f"{datetime.now()}"],
                                     description="Date of creation")
