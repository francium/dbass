from flask import Flask, jsonify, request

from . import schema
from . import execute


database_file = 'countries.db'

def app_factory():
    app = Flask(__name__)

    @app.route('/api/schemas')
    def route_schema():
        tables = schema.tables(database_file)
        data = {table: schema.table_columns(database_file, table) for table in tables}
        return jsonify(data)

    @app.route('/api/execute', methods=['post'])
    def router_execute():
        sql = request.data.decode('utf-8')
        try:
            result = execute.execute(database_file, sql)
        except Exception as exc :
            print(exc)
            return jsonify({'status': 'error'})

        return jsonify({'status': 'ok', 'result': result})

    return app
