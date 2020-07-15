import $ from 'jquery';

import bookmarkList from './bookmarkList';
import api from './api';

const render = () => {
    console.log("BookmarkApp.js running");
}

const dropBookmarkDetail = (bookmarkRow) => {
    const bookmarkDescrip = $(bookmarkRow).siblings('.description-container');
    if (bookmarkDescrip.hasClass('hidden')) {
      bookmarkDescrip.attr('class', 'description-container');
      const bookmarkRow = bookmarkDescrip.siblings('.bookmark-row');
      $(bookmarkRow).find('.drop-arrow .arrow').attr('class', 'arrow up');
    } else {
      bookmarkDescrip.attr('class', 'description-container hidden');
      $(bookmarkRow).find('.drop-arrow .arrow').attr('class', 'arrow down');
    }
}

const handleBookmarkDrop = () => {
    $('#bookmark-list-container').on('click', '.bookmark-row', function(event) {
      const selectedBookmark = $(this).find('span').text();
      dropBookmarkDetail(this);
    });
}

const bindEventListeners = () => {
    handleBookmarkDrop();
}

export default {
    bindEventListeners,
    render
}