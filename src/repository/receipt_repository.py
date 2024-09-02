from src.database.my_connector import Database
from src.database.models import Receipts
db = Database()


def get_all_receipts():
    query = "SELECT * FROM receipts"
    return db.fetch_all(query)


def get_receipt_by_id(receipt_id: int):
    query = "SELECT * FROM receipts WHERE id=%s"
    return db.fetch_one(query, (receipt_id,))


def create_receipt(receipt: Receipts):
    query = "INSERT INTO receipts (product_id, company_id, quantity, date) VALUES (%s, %s, %s, %s)"
    params = receipt.ProductID, receipt.CompanyID, receipt.Quantity, receipt.Date
    cursor = db.execute_query(query, params)
    return cursor.lastrowid


def update_receipt(receipt_id: int, receipt: Receipts):
    query = "UPDATE receipts SET product_id=%s, company_id=%s, quantity=%s, date=%s WHERE id=%s"
    params = receipt.ProductID, receipt.CompanyID, receipt.Quantity, receipt.Date, receipt_id
    db.execute_query(query, params)


def delete_receipt(receipt_id: int):
    query = "DELETE FROM receipts WHERE id=%s"
    db.execute_query(query, (receipt_id,))
