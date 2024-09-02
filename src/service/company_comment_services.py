from src.repository import company_comment_repository
from src.service.user_services import get_user_by_id
from src.service.company_services import get_company_by_id
from src.database.models import CompanyComments
from fastapi import HTTPException, status


def get_all_company_comments():
    company_comments = company_comment_repository.get_all_company_comments()
    return [CompanyComments(**company_comment) for company_comment in company_comments]


def get_company_comment_by_id(company_comment_id: int):
    company_comment = company_comment_repository.get_company_comment_by_id(company_comment_id)
    if not company_comment:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Company Comment not found')
    return CompanyComments(**company_comment) if company_comment else None


def create_company_comment(company_comment: CompanyComments):
    get_user_by_id(company_comment.UserID)
    get_company_by_id(company_comment.CompanyID)
    company_comment_id = company_comment_repository.create_company_comment(company_comment)
    return get_company_comment_by_id(company_comment_id)


def update_company_comment(company_comment_id: int, company_comment: CompanyComments):
    get_company_comment_by_id(company_comment_id)
    get_user_by_id(company_comment.UserID)
    get_company_by_id(company_comment.CompanyID)
    company_comment_repository.update_company_comment(company_comment_id, company_comment)
    return {"message": "Company comment updated successfully"}


def delete_company_comment(company_comment_id: int):
    get_company_comment_by_id(company_comment_id)
    company_comment_repository.delete_company_comment(company_comment_id)
    return {"message": "Company comment deleted successfully"}
