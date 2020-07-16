import $ from 'jquery';
import './style.css';

import api from './api';
import bookmarkStore from './bookmarkStore';
import bookmarkApp from './bookmarkApp';


const main = () => {
  api.getBookmarks()
    .then((bookmarks) => {
      bookmarks.forEach((bookmark) => bookmarkStore.addBookmark(bookmark));
      bookmarkApp.render();
    });
  bookmarkApp.bindEventListeners();
  bookmarkApp.render();
};

$(main)