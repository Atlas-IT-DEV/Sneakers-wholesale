from src.repository import company_comment_repository
from src.service.user_services import get_user_by_id
from src.service.company_services import get_company_by_id
from src.database.models import CompanyComments
from fastapi import HTTPException, status
from src.utils.return_url_object import return_url_object
from src.utils.list_to_str import encode_list_to_string, decode_string_to_list
from src.service.image_services import get_image_by_id
from src.service.company_services import get_company_by_id


def get_all_company_comments(dirs: bool = False):
    company_comments = company_comment_repository.get_all_company_comments()
    model = [CompanyComments(**company_comment) for company_comment in company_comments]
    list_company_comments = []
    for company_comment in company_comments:
        # Обрабатываем user_id
        user_id = company_comment.get("user_id")
        if user_id:
            user = get_user_by_id(user_id)
            company_comment["user"] = user.model_dump(by_alias=True)
            del company_comment["user_id"]
        # Обрабатываем company_id
        company_id = company_comment.get("company_id")
        if company_id:
            company = get_company_by_id(company_id)
            company_comment["company"] = company.model_dump(by_alias=True)
            del company_comment["company_id"]
        list_company_comments.append(company_comment)
        # Получаем список изображений по ID продукта и выбираем первое изображение
        image_ids = decode_string_to_list(company_comment.get("image_id"))
        urls = []
        for image_id in image_ids:
            # Обрабатываем URL для первого изображения
            if image_id is not None:
                try:
                    url = get_image_by_id(image_id)
                    url = return_url_object(url)
                    urls.append(url)
                except HTTPException:
                    urls.append(None)
            else:
                urls.append(None)
        company_comment["urls"] = urls
        list_company_comments.append(company_comment)
    if dirs:
        return list_company_comments  # Возвращаем словарь с преобразованным продуктом
    else:
        return model


def get_company_comment_by_id(company_comment_id: int, dirs: bool = False):
    company_comment = company_comment_repository.get_company_comment_by_id(company_comment_id)
    if not company_comment:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Company Comment not found')
    model = CompanyComments(**company_comment) if company_comment else None
    # Обрабатываем user_id
    user_id = company_comment.get("user_id")
    if user_id:
        user = get_user_by_id(user_id)
        company_comment["user"] = user.model_dump(by_alias=True)
        del company_comment["user_id"]
    # Обрабатываем company_id
    company_id = company_comment.get("company_id")
    if company_id:
        company = get_company_by_id(company_id)
        company_comment["company"] = company.model_dump(by_alias=True)
        del company_comment["company_id"]
    # Получаем список изображений по ID продукта и выбираем первое изображение
    image_ids = decode_string_to_list(company_comment.get("image_id"))
    urls = []
    for image_id in image_ids:
        # Обрабатываем URL для первого изображения
        if image_id is not None:
            try:
                url = get_image_by_id(image_id)
                url = return_url_object(url)
                urls.append(url)
            except HTTPException:
                urls.append(None)
        else:
            urls.append(None)
    company_comment["urls"] = urls
    # Возвращаем либо модель продукта, либо словарь, в зависимости от значения параметра dirs
    if dirs:
        return company_comment  # Возвращаем словарь с преобразованным продуктом
    else:
        return model


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
