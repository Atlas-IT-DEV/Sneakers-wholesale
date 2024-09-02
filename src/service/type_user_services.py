from src.repository import type_user_repository
from src.database.models import TypeUsers
from fastapi import HTTPException, status
from src.utils.exam_services import check_for_duplicates, check_if_exists


def get_all_type_users():
    type_users = type_user_repository.get_all_type_users()
    return [TypeUsers(**type_user) for type_user in type_users]


def get_type_user_by_id(type_user_id: int):
    type_user = type_user_repository.get_type_user_by_id(type_user_id)
    if not type_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Type user not found')
    return TypeUsers(**type_user) if type_user else None


def create_type_user(type_user: TypeUsers):
    check_if_exists(
        get_all=get_all_type_users,
        attr_name="Type",
        attr_value=type_user.Type,
        exception_detail='Type already exist'
    )
    type_user_id = type_user_repository.create_type_user(type_user)
    return get_type_user_by_id(type_user_id)


def update_type_user(type_user_id: int, type_user: TypeUsers):
    get_type_user_by_id(type_user_id)
    check_for_duplicates(
        get_all=get_all_type_users,
        check_id=type_user_id,
        attr_name="Type",
        attr_value=type_user.Type,
        exception_detail='Type already exist'
    )
    type_user_repository.update_type_user(type_user_id, type_user)
    return {"message": "Type user updated successfully"}


def delete_type_user(type_user_id: int):
    get_type_user_by_id(type_user_id)
    type_user_repository.delete_type_user(type_user_id)
    return {"message": "Type user deleted successfully"}
