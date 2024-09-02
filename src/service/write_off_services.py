from src.repository import write_off_repository
from src.database.models import WriteOffs
from fastapi import HTTPException, status
from src.utils.exam_services import check_for_duplicates, check_if_exists


def get_all_write_offs():
    write_offs = write_off_repository.get_all_write_offs()
    return [WriteOffs(**write_off) for write_off in write_offs]


def get_write_off_by_id(write_off_id: int):
    write_off = write_off_repository.get_write_off_by_id(write_off_id)
    if not write_off:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Write off not found')
    return WriteOffs(**write_off) if write_off else None


def create_write_off(write_off: WriteOffs):
    write_off_id = write_off_repository.create_write_off(write_off)
    return get_write_off_by_id(write_off_id)


def update_write_off(write_off_id: int, write_off: WriteOffs):
    get_write_off_by_id(write_off_id)
    write_off_repository.update_write_off(write_off_id, write_off)
    return {"message": "Write off updated successfully"}


def delete_write_off(write_off_id: int):
    get_write_off_by_id(write_off_id)
    write_off_repository.delete_write_off(write_off_id)
    return {"message": "Write off deleted successfully"}
