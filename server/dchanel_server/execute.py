import sqlite3


def execute(database: str, sql: str):
    with sqlite3.connect(database) as db:
        db.cursor()
        return list(db.execute(sql))
