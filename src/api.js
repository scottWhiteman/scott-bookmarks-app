const BASE_URL = 'https://thinkful-list-api.herokuapp.com/scott/bookmarks'

const getFetch = (...args) => {
    return fetch(...args)
        .then(res => res.json())
        .then(bookmarkData => bookmarkData);
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

export default {
    getBookmarks,
    createBookmark
};