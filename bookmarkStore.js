const appData = {
    bookmarkList: [],
    adding: false,
    error: null,
    filter: 0
};

const getById = (bookmark) => {
    return this.appData.bookmarkList.find(currentBookmark => currentBookmark.id === bookmark.id)
};

const addBookmark = function(bookmark) {
    this.appData.bookmarkList.push(bookmark);
}

const deleteBookmark = function(id) {
    const deleteIndex = this.appData.bookmarkList.findIndex(currentBookmark => currentBookmark.id === id);
    this.appData.bookmarkList.splice(deleteIndex, 1);
}

const setError = function(msg) {
    this.appData.error = msg;
}

export default {
    appData,
    getById,
    addBookmark,
    deleteBookmark,
    setError
};