from flask import Flask, jsonify, request

from . import schema
from . import execute
from .sql_parser import parse_table_name_from_query, parse_selected_columns_from_query


database_file = "countries.db"


def app_factory():
    app = Flask(__name__)

    @app.route("/api/schemas")
    def route_schema():
        tables = schema.tables(database_file)
        data = {table: schema.table_columns(database_file, table) for table in tables}
        return jsonify(data)

    @app.route("/api/execute", methods=["post"])
    def router_execute():
        sql = request.data.decode("utf-8")
        table_name = parse_table_name_from_query(sql)
        table_columns_selected = parse_selected_columns_from_query(sql)
        if len(table_columns_selected) == 0:
            column_names = schema.table_columns(database_file, table_name)
        else:
            column_names = table_columns_selected

        try:
            results = execute.execute(database_file, sql)
        except Exception as exc :
            print(exc)
            return jsonify({"status": "error"})

        return jsonify({"status": "ok", "data": {
            "columnLabels": column_names,
            "rows": results,
        }})

    return app
