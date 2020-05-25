import json
import requests
from SETTINGS import DEFAULT_DISPLAY_NUMBER
from search_utility.database import book_author_map, data, books_keyword_map
from search_utility.fetch_data import FetchData


def search_books(request_data):
    """
    This method calls the utility to get the books for each query
    :param request_data: parsed data received from the request
    :return:
    """
    search_strings = request_data.get("search_strings", [])
    k = request_data.get("k") if request_data.get("k") else DEFAULT_DISPLAY_NUMBER

    books = []

    for search_string in search_strings:
        fetch_data = FetchData(search_string, books_keyword_map, data, k)
        single_query_books = fetch_data.fetch_book_data()

        # fetch authors
        single_query_books = fetch_authors(single_query_books)
        books.append(single_query_books)

    return books


def fetch_authors(books):
    """
    this method is implementing hit and miss concept of caching to get author of books, it will ensure efficient and
    optimal use of given endpoint.
    :param books: list of objects of books
    :return:
    """
    for book in books:
        book_id = book.get("book_id")
        if book_id in book_author_map:
            book["author"] = book_author_map.get(book_id)
        else:
            url = "https://ie4djxzt8j.execute-api.eu-west-1.amazonaws.com/coding"
            params = {"book_id": book_id}

            # API is not functioning properly, sometimes gives an error and sometimes works.
            # I have handled the scenario if it gives the error
            resp = requests.post(url=url, data=params)
            if resp.status_code == 200:
                request_data = json.loads(resp.text)
                book["author"] = request_data.get("author", "")
            else:
                book["author"] = [item.get("author") for item in data.get("authors", [])
                                  if item.get("book_id") == book_id]

            # cache to store author names for book_ids
            book_author_map[book_id] = book.get("author")

    return books
