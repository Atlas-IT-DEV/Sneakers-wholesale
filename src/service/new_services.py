from src.repository import new_repository
from src.database.models import News
from fastapi import HTTPException, status
from src.utils.exam_services import check_for_duplicates, check_if_exists


def get_all_news():
    news = new_repository.get_all_news()
    return [News(**new) for new in news]


def get_new_by_id(new_id: int):
    new = new_repository.get_new_by_id(new_id)
    if not new:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='New not found')
    return News(**new) if new else None


def create_new(new: News):
    check_if_exists(
        get_all=get_all_news,
        attr_name="Name",
        attr_value=new.Name,
        exception_detail='New already exist'
    )
    new_id = new_repository.create_new(new)
    return get_new_by_id(new_id)


def update_new(new_id: int, new: News):
    get_new_by_id(new_id)
    check_for_duplicates(
        get_all=get_all_news,
        check_id=new_id,
        attr_name="Name",
        attr_value=new.Name,
        exception_detail='New already exist'
    )
    new_repository.update_new(new_id, new)
    return {"message": "New updated successfully"}


def delete_new(new_id: int):
    get_new_by_id(new_id)
    new_repository.delete_new(new_id)
    return {"message": "New deleted successfully"}
