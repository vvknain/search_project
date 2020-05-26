# search_project
This project is using ReactJS, Redux, Flask to implement a book summary search service

****It is advised to create a virtual environment to run the flask server****

Python - 2.7
Flask - 1.1.2
React - 16.13.1 (created using create-react-app tool)

** SERVER **
 cd to search_server
 
 Install Dependencies:
    pip install -r requirements.txt
    
Details about the server:
  - well commented code
  - No database is used. A hash-map/dictionary is used for storing processed data and data.json.
  - Server restart will cause loss of processed data in the Search Utility.
  - basic error handling
  - server.py is the main server file. Execute it to start the server. command - > python server.py
  - basic testing
    - single API test case is implemented
    - I used pytest
    - run the testcases using command:- pytest server_tests.py
    - run this test after starting the server
    
    
 ** Search Utilty **
 
 Details about the Utility
 - two parts of the utility
 - one is to parse the data of data.json() and storing it in-memory
 - another is to fetch the books based on query strings and value of k
  - the explanation of the logic is is well commented in the code
  - approch is to split the summary and make a dictionary of keywords and list of books as the value with this keyword
  - each word in a query carries a weight, right to left incrementing
  - length of word in a query is 2nd weight
  - finaly it is multiplied with the frequency of keyword in the book
  
  - Testing of both the parts with single-single test cases
  - pytest is the library for testing
  - run test after going in the directory -> pytest utility_tests.py
  
  
  
*** React Part ***

Details about the front-end
 - configuration of redux, react-redux with the react library
 - used redux-thunk middleware for async dispacting of actions to reducer
 - used redux-logger to log changes in state and action details
 - used library for suggestion dropdown
 - configured library according to the use case
 - dynamic grid layout using bootstrap and a programming logic to deal with changing coloums
 - dynamic display of summary content with ellipses if resizing of window is done
