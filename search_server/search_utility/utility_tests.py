from pre_process_data import DataPreProcessor

data = {
    "titles": ["hello"],
    "summaries": [
        {
            "id": 0,
            "summary": "This is sample summary to test."
        }
    ]
}

k = 3
books_keyword_map = {}


def test_pre_process():
    data_processor = DataPreProcessor(data)
    books_keyword_map.update(data_processor.start())

    # modified summary will contain title as well for comparing
    modified_summary = "{} {}".format(data["titles"][0], data["summaries"][0]["summary"])

    assert len(books_keyword_map) == len(set(modified_summary.split()))
