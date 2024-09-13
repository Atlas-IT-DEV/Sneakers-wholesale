from src.database.my_connector import Database
from src.database.models import QuestionAnswers
from src.database.my_connector import db


def get_all_question_answers():
    query = "SELECT * FROM question_answers"
    return db.fetch_all(query)


def get_question_answer_by_id(question_answer_id: int):
    query = "SELECT * FROM question_answers WHERE id=%s"
    return db.fetch_one(query, (question_answer_id,))


def create_question_answer(question_answer: QuestionAnswers):
    query = "INSERT INTO question_answers (user_id, question, answer) VALUES (%s, %s, %s)"
    params = question_answer.UserID, question_answer.Question, question_answer.Answer
    cursor = db.execute_query(query, params)
    return cursor.lastrowid


def update_question_answer(question_answer_id: int, question_answer: QuestionAnswers):
    query = "UPDATE question_answers SET user_id=%s, question=%s, answer=%s WHERE id=%s"
    params = question_answer.UserID, question_answer.Question, question_answer.Answer, question_answer_id
    db.execute_query(query, params)


def delete_question_answer(question_answer_id: int):
    query = "DELETE FROM question_answers WHERE id=%s"
    db.execute_query(query, (question_answer_id,))
