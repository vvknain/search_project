import json
from search_utility.database import data, books_keyword_map
from flask import Flask, request, jsonify
from search_utility.pre_process_data import DataPreProcessor
from flask_cors import CORS

app = Flask(__name__)
app.config["DEBUG"] = True
CORS(app, resources={r"/get_books": {"origins": "*"}})


@app.route("/get_books", methods=["POST"])
def get_books():
    pass


# Pre Process and store the data before starting the server
def pre_process():
    data_processor = DataPreProcessor(data)
    return data_processor.start()


books_keyword_map.update(pre_process())

# runs on localhost on port 5000
app.run()
