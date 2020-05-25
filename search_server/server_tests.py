import requests
import json
from search_utility.utility_tests import data, k, books_keyword_map, test_pre_process

url = "http://localhost:5000/get_books"
params = {"search_strings": ["sample test"]}
headers = {"Content-Type": "application/json"}

test_pre_process()


def test_books_api():
    resp = requests.post(url=url, json=params, headers=headers)
    j = json.loads(resp.text)
    assert resp.status_code == 200, resp.text
    assert type(j["data"]) == list
