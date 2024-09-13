from src.database.my_connector import Database
from src.database.models import WriteOffs
from src.database.my_connector import db


def get_all_write_offs():
    query = "SELECT * FROM write_offs"
    return db.fetch_all(query)


def get_write_off_by_id(write_off_id: int):
    query = "SELECT * FROM write_offs WHERE id=%s"
    return db.fetch_one(query, (write_off_id,))


def create_write_off(write_off: WriteOffs):
    query = "INSERT INTO write_offs (product_id, quantity, date) VALUES (%s, %s, %s)"
    params = write_off.ProductID, write_off.Quantity, write_off.Date
    cursor = db.execute_query(query, params)
    return cursor.lastrowid


def update_write_off(write_off_id: int, write_off: WriteOffs):
    query = "UPDATE write_offs SET product_id=%s, quantity=%s, date=%s WHERE id=%s"
    params = write_off.ProductID, write_off.Quantity, write_off.Date, write_off_id
    db.execute_query(query, params)


def delete_write_off(write_off_id: int):
    query = "DELETE FROM write_offs WHERE id=%s"
    db.execute_query(query, (write_off_id,))
