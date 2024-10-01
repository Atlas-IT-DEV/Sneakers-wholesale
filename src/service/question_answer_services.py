from src.repository import question_answer_repository
from src.database.models import QuestionAnswers
from fastapi import HTTPException, status
from src.utils.exam_services import check_for_duplicates, check_if_exists
from src.service.user_services import get_user_by_id


def get_all_question_answers(dirs: bool = False):
    question_answers = question_answer_repository.get_all_question_answers()
    models = [QuestionAnswers(**question_answer) for question_answer in question_answers]
    list_question_answers = []
    for question_answer in question_answers:
        # Обрабатываем user_id
        user_id = question_answer.get("user_id")
        if user_id:
            user = get_user_by_id(user_id)
            question_answer["user"] = user.model_dump(by_alias=True)
            del question_answer["user_id"]
        list_question_answers.append(question_answer)
    if dirs:
        return list_question_answers
    else:
        return models


def get_question_answer_by_id(question_answer_id: int, dirs: bool = False):
    question_answer = question_answer_repository.get_question_answer_by_id(question_answer_id)
    if not question_answer:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Question answer not found')
    model = QuestionAnswers(**question_answer) if question_answer else None
    # Обрабатываем user_id
    user_id = question_answer.get("user_id")
    if user_id:
        user = get_user_by_id(user_id)
        question_answer["user"] = user.model_dump(by_alias=True)
        del question_answer["user_id"]
    # Возвращаем либо модель question answer, либо словарь, в зависимости от значения параметра dirs
    if dirs:
        return question_answer  # Возвращаем словарь с преобразованным question answer
    else:
        return model


def create_question_answer(question_answer: QuestionAnswers):
    question_answer_id = question_answer_repository.create_question_answer(question_answer)
    return get_question_answer_by_id(question_answer_id)


def update_question_answer(question_answer_id: int, question_answer: QuestionAnswers):
    get_question_answer_by_id(question_answer_id)
    question_answer_repository.update_question_answer(question_answer_id, question_answer)
    return {"message": "Question answer updated successfully"}


def delete_question_answer(question_answer_id: int):
    get_question_answer_by_id(question_answer_id)
    question_answer_repository.delete_question_answer(question_answer_id)
    return {"message": "Question answer deleted successfully"}
