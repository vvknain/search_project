class FetchData:
    def __init__(self, search_string, books_keyword_map, data, k):
        self.books_keyword_map = books_keyword_map
        self.search_string = search_string
        self.data = data
        self.k = k
        self.words_with_positional_weight = []
        self.merge_list = []
        self.final_books = []

    def process_positional_weight(self):
        """
        position of word carries weight, starting from 1 it increases to left side
        :return: list of words with their weight
        """

        words = self.search_string.split()
        total_words = len(words)

        for word in words:
            self.words_with_positional_weight.append([word, total_words])
            total_words -= 1

    def process_exact_word_match_weight(self):
        """
        process word match weight, example -
            "hello" matches with "hello" so weight is 5 (word length)
            multiply the weight with frequency
        :return:
        """

        for word in self.words_with_positional_weight:
            keyword = word[0]
            weight = word[1]

            if keyword in self.books_keyword_map:
                weight = weight * len(keyword)
                book_list = [[x, y * weight] for x, y in self.books_keyword_map[keyword]]
                self.merge_list.append(book_list[:self.k])  # only top k books because need to return k books

    def process_partial_word_match_weight(self):
        """
        calculate partial match keywords, example -
            "top" partially matches with "topper", so weight is 3 (matching length)

        I'm not calculating partial match for words which also have full match
        :return:
        """
        for word in self.words_with_positional_weight:
            keyword = word[0]
            weight = word[1]
            if keyword not in self.books_keyword_map:
                for key in self.books_keyword_map:
                    if keyword in key:
                        weight = weight * len(keyword)
                        book_list = [[x, y * weight] for x, y in self.books_keyword_map[key]]
                        self.merge_list.append(book_list[:self.k])  # only top k books because need to return k books

    def merge_list_of_books(self):
        """
        merging list of books according to their weight to a single list
        :return:
        """
        if not self.merge_list:
            return

        self.final_books = self.merge_list[0]
        for books in self.merge_list[1:]:
            self.merge_two_list(books)

        self.make_full_objects()

    def merge_two_list(self, books):

        arr = []
        i = j = 0

        while i < len(self.final_books) and j < len(books):
            if self.final_books[i][1] > books[j][1]:
                arr.append(self.final_books[i])
                i += 1
            else:
                arr.append(books[j])
                j += 1

        while i < len(self.final_books):
            arr.append(self.final_books[i])
            i += 1

        while j < len(books):
            arr.append(books[j])
            j += 1

        self.final_books = arr

    def make_full_objects(self):
        """
        If I come back and improve this utility then I will make searching for summaries more efficient by storing them
        in a database or modifying the data structure to store them to reduce the summary search time
        :return:
        """
        # dict to remove duplicate books
        book_counted = {}

        arr = self.final_books
        self.final_books = []

        for book in arr:
            book_id = book[0]
            if book_id not in book_counted:
                self.final_books.append({
                    "book_id": book_id,
                    "title": self.data.get("titles", [])[book_id],
                    "summary": [item.get("summary") for item in self.data.get("summaries", [])
                                if item.get("id") == book_id],
                    "author": ""
                })
                book_counted[book_id] = True

    def fetch_book_data(self):
        self.process_positional_weight()
        self.process_exact_word_match_weight()
        self.process_partial_word_match_weight()
        self.merge_list_of_books()
        return self.final_books[:self.k]
