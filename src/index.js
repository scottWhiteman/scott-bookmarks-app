import $ from 'jquery';
import './style.css';

import api from './api';
import bookmarkStore from './bookmarkStore';
import bookmarkApp from './bookmarkApp';



// const dropBookmarkDetail = (bookmarkRow) => {
//   const bookmarkDescrip = $(bookmarkRow).siblings('.description-container');
//   if (bookmarkDescrip.hasClass('hidden')) {
//     bookmarkDescrip.attr('class', 'description-container');
//     const bookmarkRow = bookmarkDescrip.siblings('.bookmark-row');
//     $(bookmarkRow).find('.drop-arrow .arrow').attr('class', 'arrow up');
//   } else {
//     bookmarkDescrip.attr('class', 'description-container hidden');
//     $(bookmarkRow).find('.drop-arrow .arrow').attr('class', 'arrow down');
//   }
// }

// const handleBookmarkDrop = () => {
//   $('#bookmark-list-container').on('click', '.bookmark-row', function(event) {
//     const selectedBookmark = $(this).find('span').text();
//     dropBookmarkDetail(this);
//   });
// }

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