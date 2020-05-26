from unidecode import unidecode


class DataPreProcessor:
    def __init__(self, data):
        self.data = data
        self.books_keyword_map = {}

    def parse_data(self):
        """
        modifying the data in place after escaping and decoding
        :return:
        """
        titles = self.data.get("titles", [])

        for idx in range(len(titles)):
            summary = self.data.get("summaries", [])[idx]
            title = self.data.get("titles", [])[idx]
            summary["summary"] = unidecode(summary.get("summary").decode('unicode-escape'))
            self.data.get("titles", [])[idx] = unidecode(title.decode('unicode-escape'))

    def process_data(self):
        summaries = self.data.get("summaries", [])
        titles = self.data.get("titles", [])

        # creating a dictionary of words of summaries as key and value as list of books containing this word/key
        for summary in summaries:
            book_id = summary.get("id")
            book_title = titles[book_id]

            # combining book_title with the summary so that book name can also be included in search
            book_summary = "{} {}".format(book_title, summary.get("summary"))
            keys = book_summary.replace("The Book in Three Sentences: ", "").replace(".", "").lower().split()

            for key in keys:
                self.books_keyword_map.setdefault(key, {})
                self.books_keyword_map[key].setdefault(book_id, 0)
                self.books_keyword_map[key][book_id] += 1

        for key, value in self.books_keyword_map.items():
            self.books_keyword_map[key] = sorted(value.items(), key=lambda item: item[1])

    def start(self):
        self.parse_data()
        self.process_data()
        return self.books_keyword_map
