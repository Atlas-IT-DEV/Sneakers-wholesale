from src.repository import card_repository
from src.database.models import Cards
from fastapi import HTTPException, status
from src.utils.exam_services import check_for_duplicates, check_if_exists


def get_all_cards():
    cards = card_repository.get_all_cards()
    return [Cards(**card) for card in cards]


def get_card_by_id(card_id: int):
    card = card_repository.get_card_by_id(card_id)
    if not card:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Card not found')
    return Cards(**card) if card else None


def get_card_by_user_id(user_id: int):
    cards = card_repository.get_card_by_user_id(user_id)
    if not cards:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Card not found')
    return [Cards(**card) for card in cards]


def create_card(card: Cards):
    card_id = card_repository.create_card(card)
    return get_card_by_id(card_id)


def update_card(card_id: int, card: Cards):
    get_card_by_id(card_id)
    card_repository.update_card(card_id, card)
    return {"message": "Card updated successfully"}


def delete_card(card_id: int):
    get_card_by_id(card_id)
    card_repository.delete_card(card_id)
    return {"message": "Card deleted successfully"}
