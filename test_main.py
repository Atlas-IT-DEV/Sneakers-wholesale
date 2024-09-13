from http.client import responses
from datetime import datetime
import pytest
import random
import string
from copy import deepcopy
from fastapi.testclient import TestClient
from main import app
from setup.debug_info import machine
from src.utils.custom_logging import setup_logging

log = setup_logging()
client = TestClient(app)

"""

Ошибка Not Found вероятно говорит о неправильно созданном роуте, или не правильно переданным параметрам в тесты

"""


# Вспомогательная функция для генерации случайных данных
def generate_random_data(data_type, length=8):
    if data_type == "string":
        return ''.join(random.choices(string.ascii_letters, k=length))
    elif data_type == "number":
        return random.randint(1, 1000000)
    elif data_type == "datetime":
        return datetime.now()
    return None


# Вспомогательная функция для выполнения запросов
def api_request(method, url, json_data=None, headers=None):
    response = client.request(method, url, json=json_data, headers=headers)
    return response


# Вспомогательная функция для проверки статуса и получения данных
def assert_response(response, expected_status, keys=None):
    log.info("-------------------------------------")
    assert response.status_code == expected_status, \
        f"Unexpected status code: {response.status_code}, Response: {response.text}"
    if keys:
        response_data = response.json()
        if isinstance(response_data, list):
            for item in response_data:
                for key in keys:
                    assert key in item
        else:
            for key in keys:
                assert key in response_data
        return response_data
    return None


# Генерация тестовых данных для различных сущностей
def generate_test_data(entity_type):
    data_map = {
        "user": {
            "first_name": generate_random_data("string"),
            "last_name": generate_random_data("string"),
            "telegram_id": generate_random_data("number"),
            "type_id": None,
            "role": "admin"
        },
        "promotion": {
            "name": generate_random_data("string"),
            "quantity": generate_random_data("number"),
            "sale": generate_random_data("number")
        },
        "image": {
            "url": generate_random_data("string")
        },
        "category": {
            "name": generate_random_data("string")
        },
        "company": {
            "name": generate_random_data("string"),
            "description": generate_random_data("string")
        },
        "new": {
            "name": generate_random_data("string"),
            "description": generate_random_data("string"),
            "image_id": "1,2,3,4"
        },
        "type_user": {
            "type": generate_random_data("string")
        },
        "characteristic": {
            "name": generate_random_data("string"),
            "type": "INT"
        },
        "product": {
            "name": generate_random_data("string"),
            "price": generate_random_data("number"),
            "description": generate_random_data("string"),
            "category_id": None,
            "promotion_id": None,
            "company_id": None,
            "image_id": "1,2,3,4"
        },
        "card": {
            "user_id": None,
            "product_id": None,
            "quantity": generate_random_data("number")
        },
        "product_characteristic": {
            "product_id": None,
            "characteristic_id": None,
            "value": generate_random_data("string")
        },
        "order": {
            "user_id": None,
            "date": f"{generate_random_data('datetime')}",
            "total_price": generate_random_data("number")
        },
        "order_product": {
            "order_id": None,
            "product_id": None,
            "quantity": generate_random_data("number")
        },
        "product_comment": {
            "product_id": None,
            "user_id": None,
            "comment": generate_random_data("string"),
            "created_at": f"{generate_random_data('datetime')}",
            "image_id": "1,2,3,4"
        },
        "company_comment": {
            "company_id": None,
            "user_id": None,
            "comment": generate_random_data("string"),
            "created_at": f"{generate_random_data('datetime')}",
            "image_id": "1,2,3,4"
        },
        "receipt": {
            "product_id": None,
            "company_id": None,
            "quantity": generate_random_data("number"),
            "date": f"{generate_random_data('datetime')}"
        },
        "write_off": {
            "product_id": None,
            "quantity": generate_random_data("number"),
            "date": f"{generate_random_data('datetime')}"
        },
        "question_answer": {
            "user_id": None,
            "question": generate_random_data("string"),
            "answer": generate_random_data("string")
        }
    }
    return data_map.get(entity_type)


def setup_entity(entity_type, endpoint, token):
    if entity_type == "product":
        category_id = setup_entity("category", "categories", token)
        promotion_id = setup_entity("promotion", "promotions", token)
        company_id = setup_entity("company", "companies", token)
        product_data = generate_test_data("product")
        entity_data = {**product_data,
                       "category_id": category_id,
                       "promotion_id": promotion_id,
                       "company_id": company_id}
    elif entity_type == "card":
        product_id = setup_entity("product", "products", token)
        user_id = setup_entity("user", "users", token)
        card_data = generate_test_data("card")
        entity_data = {**card_data,
                       "user_id": user_id,
                       "product_id": product_id}
    elif entity_type == "product_characteristic":
        product_id = setup_entity("product", "products", token)
        characteristic_id = setup_entity("characteristic", "characteristics", token)
        product_characteristic_data = generate_test_data("product_characteristic")
        entity_data = {**product_characteristic_data,
                       "product_id": product_id,
                       "characteristic_id": characteristic_id}
    elif entity_type == "order":
        user_id = setup_entity("user", "users", token)
        order_data = generate_test_data("order")
        entity_data = {**order_data,
                       "user_id": user_id}
    elif entity_type == "order_product":
        order_id = setup_entity("order", "orders", token)
        product_id = setup_entity("product", "products", token)
        order_product_data = generate_test_data("order_product")
        entity_data = {**order_product_data,
                       "product_id": product_id,
                       "order_id": order_id}
    elif entity_type == "product_comment":
        product_id = setup_entity("product", "products", token)
        user_id = setup_entity("user", "users", token)
        product_comment = generate_test_data("product_comment")
        entity_data = {**product_comment,
                       "product_id": product_id,
                       "user_id": user_id}
    elif entity_type == "company_comment":
        company_id = setup_entity("company", "companies", token)
        user_id = setup_entity("user", "users", token)
        company_comment = generate_test_data("company_comment")
        entity_data = {**company_comment,
                       "company_id": company_id,
                       "user_id": user_id}
    elif entity_type == "receipt":
        company_id = setup_entity("company", "companies", token)
        product_id = setup_entity("product", "products", token)
        receipt = generate_test_data("receipt")
        entity_data = {**receipt,
                       "company_id": company_id,
                       "product_id": product_id}
    elif entity_type == "write_off":
        product_id = setup_entity("product", "products", token)
        write_off = generate_test_data("write_off")
        entity_data = {**write_off,
                       "product_id": product_id}
    elif entity_type == "question_answer":
        user_id = setup_entity("user", "users", token)
        question_answer = generate_test_data("question_answer")
        entity_data = {**question_answer,
                       "user_id": user_id}
    else:
        entity_data = generate_test_data(entity_type)
    log.info(f"Creating {entity_type} with data: {entity_data}")
    response = api_request("POST", f"/{endpoint}/", json_data=entity_data,
                           headers={"Authorization": f"Bearer {token}"})
    log.info(f"POST {endpoint}/ response: {response.json()}")
    response_data = assert_response(response, 200, keys=["id"])
    return response_data["id"]


# Функция для удаления сущности
def teardown_entity(endpoint, entity_id, token):
    response = api_request("DELETE", f"/{endpoint}/{entity_id}",
                           headers={"Authorization": f"Bearer {token}"})
    assert_response(response, 200)


# Токен доступа администратора
access_token = None
admin_data = []


def create_admin():
    global access_token
    admin_data.append(generate_test_data("user"))
    response = api_request("POST", "/signup/", json_data=admin_data[0])
    access_token = response.json()["access_token"]


# Инициализация администратора
create_admin()


@pytest.mark.parametrize("entity_type, endpoint, expected_keys", [
    ("user", "users", ["first_name"]),
    ("promotion", "promotions", ["name"]),
    ("image", "images", ["url"]),
    ("category", "categories", ["name"]),
    ("company", "companies", ["name"]),
    ("new", "news", ["name"]),
    ("type_user", "type_users", ["type"]),
    ("characteristic", "characteristics", ["name"]),
    ("product", "products", ["name"]),
    ("card", "cards", ["quantity"]),
    ("product_characteristic", "product_characteristics", ["value"]),
    ("order", "orders", ["total_price"]),
    ("order_product", "orders_products", ["quantity"]),
    ("product_comment", "product_comments", ["comment"]),
    ("company_comment", "company_comments", ["comment"]),
    ("receipt", "receipts", ["quantity"]),
    ("write_off", "write_offs", ["quantity"]),
    ("question_answer", "question_answers", ["question"]),
])
def test_create_and_get_entity(entity_type, endpoint, expected_keys):
    log.info("-------------------------------------")
    log.info(f"entity_type: {entity_type}, endpoint: {endpoint}, expected_keys: {expected_keys}")
    entity_id = setup_entity(entity_type, endpoint, access_token)
    response = api_request("GET", f"/{endpoint}/")
    assert_response(response, 200, keys=["id"] + expected_keys)
    response = api_request("GET", f"/{endpoint}/{entity_type}_id/{entity_id}")
    assert_response(response, 200, keys=["id"] + expected_keys)
    teardown_entity(endpoint, entity_id, access_token)


@pytest.mark.parametrize("entity_type, endpoint, update_data", [
    ("user", "users", {"first_name": "Вова", "telegram_id": 87654321}),
    ("promotion", "promotions", {"quantity": 87654321}),
    ("image", "images", {"url": generate_random_data("string")}),
    ("category", "categories", {"name": generate_random_data("string")}),
    ("company", "companies", {"name": generate_random_data("string")}),
    ("new", "news", {"name": generate_random_data("string")}),
    ("type_user", "type_users", {"type": generate_random_data("string")}),
    ("characteristic", "characteristics", {"name": generate_random_data("string")}),
    ("product", "products", {"name": generate_random_data("string")}),
    ("card", "cards", {"quantity": generate_random_data("number")}),
    ("product_characteristic", "product_characteristics", {"value": generate_random_data("string")}),
    ("order", "orders", {"total_price": generate_random_data("number")}),
    ("order_product", "orders_products", {"quantity": generate_random_data("number")}),
    ("product_comment", "product_comments", {"comment": generate_random_data("string")}),
    ("company_comment", "company_comments", {"comment": generate_random_data("string")}),
    ("receipt", "receipts", {"quantity": generate_random_data("number")}),
    ("write_off", "write_offs", {"quantity": generate_random_data("number")}),
    ("question_answer", "question_answers", {"question": generate_random_data("string")}),
])
def test_update_entity(entity_type, endpoint, update_data):
    log.info("-------------------------------------")
    log.info(f"entity_type: {entity_type}, endpoint: {endpoint}, update_data: {update_data}")
    entity_id = setup_entity(entity_type, endpoint, access_token)
    response = api_request("GET", f"/{endpoint}/{entity_type}_id/{entity_id}")
    test_data = response.json()
    response = api_request("PUT", f"/{endpoint}/{entity_id}", json_data=test_data,
                           headers={"Authorization": f"Bearer {access_token}"})
    assert_response(response, 200)
    updated_data = deepcopy(test_data)
    updated_data.update(update_data)
    response = api_request("PUT", f"/{endpoint}/{entity_id}", json_data=updated_data,
                           headers={"Authorization": f"Bearer {access_token}"})
    assert_response(response, 200)
    teardown_entity(endpoint, entity_id, access_token)


# Удаление администратора
def del_admin():
    telegram_id = admin_data[0].get("telegram_id")
    response = api_request("GET", f"/users/telegram_id/{telegram_id}",
                           headers={"Authorization": f"Bearer {access_token}"})
    admin = response.json()
    teardown_entity("users", admin["id"], access_token)


del_admin()
