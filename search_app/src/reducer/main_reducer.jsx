const intialState = {
    books: [],
    search_books: []
};

export default function(state = intialState, action) {
    if (action.type === "RECEIVE_BOOK"){
        return Object.assign({}, state, {
            search_books: action.payload
        })
    } else if (action.type === "ADD_BOOK") {
        return Object.assign({}, state, {
            books: state.books.concat([action.payload])
        })
    }
    return state
};