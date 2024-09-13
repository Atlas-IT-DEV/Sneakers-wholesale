from src.database.my_connector import Database
from src.database.models import News
from src.database.my_connector import db


def get_all_news():
    query = "SELECT * FROM news"
    return db.fetch_all(query)


def get_new_by_id(new_id: int):
    query = "SELECT * FROM news WHERE id=%s"
    return db.fetch_one(query, (new_id,))


def create_new(new: News):
    query = "INSERT INTO news (name, description, image_id) VALUES (%s, %s, %s)"
    params = new.Name, new.Desc, new.ImageID
    cursor = db.execute_query(query, params)
    return cursor.lastrowid


def update_new(new_id: int, new: News):
    query = "UPDATE news SET name=%s, description=%s, image_id=%s WHERE id=%s"
    params = new.Name, new.Desc, new.ImageID, new_id
    db.execute_query(query, params)


def delete_new(new_id: int):
    query = "DELETE FROM news WHERE id=%s"
    db.execute_query(query, (new_id,))
