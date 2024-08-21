from src.database.my_connector import Database
from src.database.models import Users
db = Database()


async def get_all_users():
    query = "SELECT * FROM users"
    return await db.fetch_all(query)


async def get_user_by_id(user_id: int):
    query = "SELECT * FROM users WHERE id=%s"
    return await db.fetch_one(query, (user_id,))


async def get_user_by_telegram_id(telegram_id: int):
    query = "SELECT * FROM users WHERE telegram_id=%s"
    return await db.fetch_one(query, (telegram_id,))


async def create_user(user: Users):
    query = ("INSERT INTO users (name, telegram_id, image_id)"
             " VALUES (%s, %s, %s)")
    params = (user.Name, user.TelegramID, user.IconID)
    cursor = await db.execute_query(query, params)
    return cursor.lastrowid


async def update_user(user_id: int, user: Users):
    query = "UPDATE users SET name=%s, telegram_id=%s, image_id=%s WHERE id=%s"
    params = (user.Name, user.TelegramID, user.IconID, user_id)
    await db.execute_query(query, params)


async def delete_user(user_id: int):
    query = "DELETE FROM users WHERE id=%s"
    await db.execute_query(query, (user_id,))
