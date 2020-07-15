const BASE_URL = 'https://thinkful-list-api.herokuapp.com/scott/bookmarks'

const getBookmarks = () => {
    return fetch(`${BASE_URL}`);
}

export default {
    getBookmarks
};