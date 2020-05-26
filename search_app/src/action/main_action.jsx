export function receiveBooks(payload) {
    return {
        type: "RECEIVE_BOOK",
        payload
    }
}

export function addBook(payload) {
    return {
        type: "ADD_BOOK",
        payload
    }
}

export function getSearchBooks(data) {
    return function(dispatch) {
        const url = 'http://localhost:5000/get_books'
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify({search_strings: [data], k: 3}),
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((res) => {
            if(res.status === 200) {
                return res.json()
            } else {
                throw new Error("Something went wrong")
            }
        })
        .then((json) => {
            dispatch(receiveBooks(json["data"][0]))
        })
        .catch((error) => {
            alert(error)
        })
    }
}