from src.database.my_connector import Database
from src.database.models import TypeUsers
db = Database()


def get_all_type_users():
    query = "SELECT * FROM type_users"
    return db.fetch_all(query)


def get_type_user_by_id(type_user_id: int):
    query = "SELECT * FROM type_users WHERE id=%s"
    return db.fetch_one(query, (type_user_id,))


def create_type_user(type_user: TypeUsers):
    query = ("INSERT INTO type_users (type)"
             " VALUES (%s)")
    params = type_user.Type
    cursor = db.execute_query(query, params)
    return cursor.lastrowid


def update_type_user(type_user_id: int, type_user: TypeUsers):
    query = "UPDATE type_users SET type=%s WHERE id=%s"
    params = (type_user.Type, type_user_id)
    db.execute_query(query, params)


def delete_type_user(type_user_id: int):
    query = "DELETE FROM type_users WHERE id=%s"
    db.execute_query(query, (type_user_id,))
