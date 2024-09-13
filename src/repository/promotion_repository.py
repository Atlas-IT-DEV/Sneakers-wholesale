from src.database.my_connector import Database
from src.database.models import Promotions
from src.database.my_connector import db


def get_all_promotions():
    query = "SELECT * FROM promotions"
    return db.fetch_all(query)


def get_promotion_by_id(promotion_id: int):
    query = "SELECT * FROM promotions WHERE id=%s"
    return db.fetch_one(query, (promotion_id,))


def get_promotion_by_name(promotion_name: str):
    query = "SELECT * FROM promotions WHERE name=%s"
    return db.fetch_one(query, (promotion_name,))


def create_promotion(promotion: Promotions):
    query = ("INSERT INTO promotions (name, quantity, sale)"
             " VALUES (%s, %s, %s)")
    params = promotion.Name, promotion.Quantity, promotion.Sale
    cursor = db.execute_query(query, params)
    return cursor.lastrowid


def update_promotion(promotion_id: int, promotion: Promotions):
    query = ("UPDATE promotions SET name=%s, quantity=%s, sale=%s"
             " WHERE id=%s")
    params = (promotion.Name, promotion.Quantity, promotion.Sale, promotion_id)
    db.execute_query(query, params)


def delete_promotion(promotion_id: int):
    query = "DELETE FROM promotions WHERE id=%s"
    db.execute_query(query, (promotion_id,))
