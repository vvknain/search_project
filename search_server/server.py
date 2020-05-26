import json
from search_utility.database import data, books_keyword_map
from flask import Flask, request, jsonify
from books_controller import search_books
from custom_exceptions import NoDataProvided
from search_utility.pre_process_data import DataPreProcessor
from flask_cors import CORS

app = Flask(__name__)
app.config["DEBUG"] = True
CORS(app, resources={r"/get_books": {"origins": "*"}})


@app.route("/get_books", methods=["POST"])
def get_books():
    if not request.data:
        raise NoDataProvided

    books = search_books(json.loads(request.data))
    return jsonify({"data": books}), 200


@app.errorhandler(404)
def not_found(message):
    return jsonify({"success": False, "message": str(message)}), 404


@app.errorhandler(NoDataProvided)
def no_data_provided(message):
    return jsonify({"success": False, "message": "Please provide the data"}), 501


@app.errorhandler(Exception)
def internal_error(message):
    return jsonify({"success": False, "message": str(message)}), 502


# Pre Process and store the data before starting the server
def pre_process():
    data_processor = DataPreProcessor(data)
    return data_processor.start()


books_keyword_map.update(pre_process())

# runs on localhost on port 5000
app.run()
