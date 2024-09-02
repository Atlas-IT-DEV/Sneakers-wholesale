from src.repository import question_answer_repository
from src.database.models import QuestionAnswers
from fastapi import HTTPException, status
from src.utils.exam_services import check_for_duplicates, check_if_exists


def get_all_question_answers():
    question_answers = question_answer_repository.get_all_question_answers()
    return [QuestionAnswers(**question_answer) for question_answer in question_answers]


def get_question_answer_by_id(question_answer_id: int):
    question_answer = question_answer_repository.get_question_answer_by_id(question_answer_id)
    if not question_answer:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Question answer not found')
    return QuestionAnswers(**question_answer) if question_answer else None


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
