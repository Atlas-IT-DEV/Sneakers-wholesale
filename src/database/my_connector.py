import os
import pymysql
from pymysql.err import OperationalError
HOST = "localhost"
PORT = 3306
USER = "root"
PASSWORD = ""
DB = "Sneakers"


class Database:
    def __init__(self):
        self.connection = pymysql.connect(
            host=HOST,
            port=PORT,
            user=USER,
            password=PASSWORD,
            db=DB,
            charset='utf8mb4',
            cursorclass=pymysql.cursors.DictCursor
        )

    def check_and_reconnect(self):
        try:
            if self.connection is None:
                self.connection.ping(reconnect=True)
        except OperationalError as e:
            print(e)

    def execute_query(self, query, params=None):
        self.check_and_reconnect()
        with self.connection.cursor() as cursor:
            cursor.execute(query, params)
            self.connection.commit()
            return cursor

    def fetch_one(self, query, params=None):
        self.check_and_reconnect()
        with self.connection.cursor() as cursor:
            cursor.execute(query, params)
            return cursor.fetchone()

    def fetch_all(self, query, params=None):
        self.check_and_reconnect()
        with self.connection.cursor() as cursor:
            cursor.execute(query, params)
            return cursor.fetchall()
