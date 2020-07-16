const BASE_URL = 'https://thinkful-list-api.herokuapp.com/scott/bookmarks'

const getFetch = (...args) => {
    let error;
    return fetch(...args)
        .then(res => {
            if (!res.ok) {
                error = {code: res.status};
                if (!res.headers.get('content-type').includes('json')) {
                    error.message = res.statusText;
                    return Promise.reject(error);
                }
            }
            return res.json();
        })
        .then(bookmarkData => {
            if (error) {
                error.message = bookmarkData.message;
                return Promise.reject(error);
            }
            return bookmarkData;
        });
}

const getBookmarks = () => {
    return getFetch(`${BASE_URL}`);
}

const createBookmark = (title, url, desc, rating) => {

    const newBookmark = {
        title,
        url,
        desc,
        rating 
    }
    return getFetch(`${BASE_URL}`, 
    {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newBookmark)
    });
}

const deleteBookmark = (id) => {
    return getFetch(`${BASE_URL}/${id}`, {method: "DELETE"} );
}

export default {
    getBookmarks,
    createBookmark,
    deleteBookmark
};