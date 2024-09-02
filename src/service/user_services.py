from src.repository import user_repository
from src.database.models import Users
from fastapi import HTTPException, status
from src.utils.exam_services import check_for_duplicates, check_if_exists
from src.service.type_user_services import get_type_user_by_id


def get_all_users():
    users = user_repository.get_all_users()
    return [Users(**user) for user in users]


def get_user_by_id(user_id: int):
    user = user_repository.get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='User not found')
    return Users(**user) if user else None


def get_user_by_telegram_id(telegram_id: int):
    user = user_repository.get_user_by_telegram_id(telegram_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='User not found')
    return Users(**user) if user else None


def create_user(user: Users):
    if user.TypeID:
        get_type_user_by_id(user.TypeID)
    check_if_exists(
        get_all=get_all_users,
        attr_name="TelegramID",
        attr_value=user.TelegramID,
        exception_detail='TelegramID already exist'
    )
    user_id = user_repository.create_user(user)
    return get_user_by_id(user_id)


def update_user(user_id: int, user: Users):
    get_user_by_id(user_id)
    if user.TypeID:
        get_type_user_by_id(user.TypeID)
    check_for_duplicates(
        get_all=get_all_users,
        check_id=user_id,
        attr_name="TelegramID",
        attr_value=user.TelegramID,
        exception_detail='TelegramID already exist'
    )
    user_repository.update_user(user_id, user)
    return {"message": "User updated successfully"}


def delete_user(user_id: int):
    get_user_by_id(user_id)
    user_repository.delete_user(user_id)
    return {"message": "User deleted successfully"}
