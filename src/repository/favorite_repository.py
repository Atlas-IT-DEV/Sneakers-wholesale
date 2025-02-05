from src.database.my_connector import Database
from src.database.models import Favorite
from src.database.my_connector import db


def get_all_favorites():
    query = "SELECT * FROM favorites"
    return db.fetch_all(query)


def get_favorite_by_id(favorite_id: int):
    query = "SELECT * FROM favorites WHERE id=%s"
    return db.fetch_one(query, (favorite_id,))


def get_favorite_by_user_id(user_id: int):
    query = "SELECT * FROM favorites WHERE user_id=%s"
    return db.fetch_all(query, (user_id,))


def create_favorite(favorite: Favorite):
    query = "INSERT INTO favorites (user_id, product_id) VALUES (%s, %s)"
    params = (favorite.UserID, favorite.ProductID)
    cursor = db.execute_query(query, params)
    return cursor.lastrowid


def update_favorite(favorite_id: int, favorite: Favorite):
    query = "UPDATE favorites SET user_id=%s, product_id=%s WHERE id=%s"
    params = (favorite.UserID, favorite.ProductID, favorite_id)
    db.execute_query(query, params)


def delete_favorite(favorite_id: int):
    query = "DELETE FROM favorites WHERE id=%s"
    db.execute_query(query, (favorite_id,))
