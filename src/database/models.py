from pydantic import (BaseModel, Field, StrictStr, Json, condecimal,
                      StrictInt, BaseSettings, PrivateAttr, SecretBytes, StrictBytes)
from enum import Enum
from typing import Optional, List
from datetime import datetime
import os
from pathlib import Path
from dotenv import load_dotenv
load_dotenv()


class CharacteristicTypeEnum(StrictStr, Enum):
    """
    Model of characteristic types.
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
    Model of images.
    """
    ID: Optional[int] = Field(None, alias="id")
    Url: Optional[StrictStr] = Field(None, alias="url", example="https://example.com")


class Users(BaseModel):
    """
    Модель пользователя

    "example": {

        "name": "Коля",

        "telegram_id": 32,

        "image_id": 2
    }
    """
    ID: Optional[int] = Field(None, alias="id")
    Name: StrictStr = Field(..., alias="name")
    TelegramID: StrictInt = Field(..., alias="telegram_id")
    IconID: Optional[int] = Field(None, alias="image_id")


class Categories(BaseModel):
    """
    Модель категорий товаров

    "example": {

        "name": "Набор"

    }
    """
    ID: Optional[int] = Field(None, alias="id")
    Name: StrictStr = Field(..., alias="name")


class Companies(BaseModel):
    """
    Модель бренда-производителя товаров

    "example": {

        "name": "Nike",

        "desc": "Производитель кроссовок"

    }
    """
    ID: Optional[int] = Field(None, alias="id")
    Name: StrictStr = Field(..., alias="name")
    Desc: Optional[StrictStr] = Field(None, alias="description")


class Сharacteristics(BaseModel):
    """
    Модель характеристик товаров

    "example": {

        "name": "Размер",

        "type": "INT",

        "Value": "32"

    }
    """
    ID: Optional[int] = Field(None, alias="id")
    Name: StrictStr = Field(..., alias="name")
    Type: CharacteristicTypeEnum = Field(..., alias="type")


class Products(BaseModel):
    """
    Модель товаров

    "example": {

        "name": "Пюрешка с коклеткой",

        "company_id": 32,

        "category_id": 2,

        "image_id": 3

    }
    """
    ID: Optional[int] = Field(None, alias="id")
    Name: StrictStr = Field(..., alias="name")
    Price: condecimal(max_digits=10, decimal_places=2) = Field(..., alias="price")
    CompanyID: StrictInt = Field(..., alias="company_id")
    CategoryID: StrictInt = Field(..., alias="category_id")
    ImageID: Optional[int] = Field(None, alias="image_id")


class ProductsDict(BaseModel):
    """

    "example": {

        "product_id": 1,

        "quantity": 1

    }

    """
    ProductID: StrictInt = Field(..., alias="product_id")
    Quantity: StrictInt = Field(..., alias="quantity")


class ProductCharacteristics(BaseModel):
    """
    Модель для связи товаров и характеристик

    "example": {

        "product_id": 2,

        "characteristic_id": 1

    }
    """
    ID: Optional[int] = Field(None, alias="id")
    ProductID: StrictInt = Field(..., alias="product_id")
    CharacteristicID: StrictInt = Field(..., alias="characteristic_id")
    Value: StrictStr = Field(..., alias="value")


class Orders(BaseModel):
    """
    Модель заказов

    "example": {

        "user_id": 2,

        "date": datetime.now(),

        "total_price": 10000

    }
    """
    ID: Optional[int] = Field(None, alias="id")
    UserID: StrictInt = Field(..., alias="user_id")
    Date: Optional[datetime] = Field(datetime.now(), alias="date")
    TotalPrice: condecimal(max_digits=10, decimal_places=2) = Field(..., alias="total_price")


class OrderProducts(BaseModel):
    """
    Модель продуктов в заказе

    "example": {

        "order_id": 1,

        "product_id": 2,

        "quantity": 1

    }
    """
    ID: Optional[int] = Field(None, alias="id")
    OrderID: StrictInt = Field(..., alias="order_id")
    ProductID: StrictInt = Field(..., alias="product_id")
    Quantity: StrictInt = Field(..., alias="quantity")


class ProductComments(BaseModel):
    """
    Модель продуктов в заказе

    "example": {

        "product_id": 1,

        "comment": "jenfjnaofnaonfov",

        "created_at": datetime.now()

    }
    """
    ID: Optional[int] = Field(None, alias="id")
    ProductID: StrictInt = Field(..., alias="product_id")
    Comment: StrictStr = Field(..., alias="comment")
    CreatedAt: Optional[datetime] = Field(datetime.now(), alias="created_at")
