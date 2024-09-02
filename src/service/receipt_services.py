from src.repository import receipt_repository
from src.database.models import Receipts
from fastapi import HTTPException, status
from src.utils.exam_services import check_for_duplicates, check_if_exists


def get_all_receipts():
    receipts = receipt_repository.get_all_receipts()
    return [Receipts(**receipt) for receipt in receipts]


def get_receipt_by_id(receipt_id: int):
    receipt = receipt_repository.get_receipt_by_id(receipt_id)
    if not receipt:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Receipt not found')
    return Receipts(**receipt) if receipt else None


def create_receipt(receipt: Receipts):
    receipt_id = receipt_repository.create_receipt(receipt)
    return get_receipt_by_id(receipt_id)


def update_receipt(receipt_id: int, receipt: Receipts):
    get_receipt_by_id(receipt_id)
    receipt_repository.update_receipt(receipt_id, receipt)
    return {"message": "Receipt updated successfully"}


def delete_receipt(receipt_id: int):
    get_receipt_by_id(receipt_id)
    receipt_repository.delete_receipt(receipt_id)
    return {"message": "Receipt deleted successfully"}
