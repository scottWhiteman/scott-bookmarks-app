const BASE_URL = 'https://thinkful-list-api.herokuapp.com/scott/bookmarks'

const getBookmarks = () => {
    return fetch(`${BASE_URL}`);
}

const createBookmark = (title, url, desc, rating) => {

    const newBookmark = {
        title,
        url,
        desc,
        rating 
    }
    return fetch(`${BASE_URL}`, 
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