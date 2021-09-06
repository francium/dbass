import sqlite3


def table_columns(db_file_path: str, table_name: str) -> list[str]:
    with sqlite3.connect(db_file_path) as conn:
        cur = conn.cursor()
        meta = cur.execute(f"pragma table_info({table_name})");
        return [col[1] for col in meta]


def tables(db_file_path: str) -> list[str]:
    with sqlite3.connect(db_file_path) as conn:
        cur = conn.cursor()
        tables = cur.execute("SELECT name FROM sqlite_master WHERE type='table';")
        return [table for (table,) in tables]
