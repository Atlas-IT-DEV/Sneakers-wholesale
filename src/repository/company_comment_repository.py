from src.database.my_connector import Database
from src.database.models import CompanyComments
db = Database()


def get_all_company_comments():
    query = "SELECT * FROM company_comments"
    return db.fetch_all(query)


def get_company_comment_by_id(company_comment_id: int):
    query = "SELECT * FROM company_comments WHERE id=%s"
    return db.fetch_one(query, (company_comment_id,))


def create_company_comment(company_comment: CompanyComments):
    query = ("INSERT INTO company_comments (company_id, user_id, comment, created_at, image_id)"
             " VALUES (%s, %s, %s, %s, %s)")
    params = (company_comment.CompanyID, company_comment.UserID,  company_comment.Comment,
              company_comment.CreatedAt, company_comment.ImageID)
    cursor = db.execute_query(query, params)
    return cursor.lastrowid


def update_company_comment(company_comment_id: int, company_comment: CompanyComments):
    query = ("UPDATE company_comments SET company_id=%s, user_id=%s, comment=%s, created_at=%s,"
             " image_id=%s WHERE id=%s")
    params = (company_comment.CompanyID, company_comment.UserID, company_comment.Comment,
              company_comment.CreatedAt, company_comment.ImageID, company_comment_id)
    db.execute_query(query, params)


def delete_company_comment(company_comment_id: int):
    query = "DELETE FROM company_comments WHERE id=%s"
    db.execute_query(query, (company_comment_id,))
