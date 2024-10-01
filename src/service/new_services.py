from src.repository import new_repository
from src.database.models import News
from fastapi import HTTPException, status
from src.utils.exam_services import check_for_duplicates, check_if_exists
from src.utils.return_url_object import return_url_object
from src.utils.list_to_str import encode_list_to_string, decode_string_to_list
from src.service.image_services import get_image_by_id


def get_all_news(dirs: bool = False):
    news = new_repository.get_all_news()
    models = [News(**new) for new in news]
    list_news = []
    for new in news:
        # Получаем список изображений по ID продукта и выбираем первое изображение
        image_ids = decode_string_to_list(new.get("image_id"))
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
        new["urls"] = urls
        list_news.append(new)
    if dirs:
        return list_news
    else:
        return models


def get_new_by_id(new_id: int, dirs: bool = False):
    new = new_repository.get_new_by_id(new_id)
    if not new:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='New not found')
    model = News(**new) if new else None
    # Получаем список изображений по ID продукта и выбираем первое изображение
    image_ids = decode_string_to_list(new.get("image_id"))
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
    new["urls"] = urls
    # Возвращаем либо модель продукта, либо словарь, в зависимости от значения параметра dirs
    if dirs:
        return new  # Возвращаем словарь с преобразованным продуктом
    else:
        return model


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
