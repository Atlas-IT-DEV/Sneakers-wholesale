from src.database.my_connector import Database
from src.database.models import Cards
from src.database.my_connector import db


def get_all_cards():
    query = "SELECT * FROM cards"
    return db.fetch_all(query)


def get_card_by_id(card_id: int):
    query = "SELECT * FROM cards WHERE id=%s"
    return db.fetch_one(query, (card_id,))


def get_card_by_user_id(user_id: int):
    query = "SELECT * FROM cards WHERE user_id=%s"
    return db.fetch_all(query, (user_id,))


def create_card(card: Cards):
    query = "INSERT INTO cards (user_id, product_id, quantity) VALUES (%s, %s, %s)"
    params = card.UserID, card.ProductID, card.Quantity
    cursor = db.execute_query(query, params)
    return cursor.lastrowid


def update_card(card_id: int, card: Cards):
    query = "UPDATE cards SET user_id=%s, product_id=%s, quantity=%s WHERE id=%s"
    params = card.UserID, card.ProductID, card.Quantity, card_id
    db.execute_query(query, params)


def delete_card(card_id: int):
    query = "DELETE FROM cards WHERE id=%s"
    db.execute_query(query, (card_id,))
