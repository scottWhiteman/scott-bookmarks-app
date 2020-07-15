import $ from 'jquery';

import bookmarkStore from './bookmarkStore';
import api from './api';

const generateBookmarksListTemplate =  (bookmarkList) => {
  return bookmarkList.reduce((fullHtml, bookmark) => {
    return fullHtml += generateBookmarkTemplate(bookmark);
  }, '');
}
const generateBookmarkTemplate = (bookmark) => {
  return `<li class="bookmark-item">
      ${generateBookmarkRow(bookmark)}
      ${generateBookmarkDescription(bookmark)}
    </li>`;
}
const generateBookmarkRow = (bookmark) => {
  return `<button class="bookmark-row">
    <div class="bookmark-title"><span>${bookmark.title}</span></div>
    <div class="drop-arrow"><i class="arrow down"></i></div>
    ${generateRating(bookmark.rating)}
  </button>`
}
const generateRating = (rating) => {
  return `<div class="rating">
    <div class="star-fill"></div>
    <div class="star-fill"></div>
    <div class="star-fill"></div>
    <div class="star-empty"></div>
    <div class="star-empty"></div>
    </div>`
}
const generateBookmarkDescription = (bookmark) => {
  return `<div class="description-container hidden">
    <a href="${bookmark.url}" target="_blank"><button class="site-link">Visit!</button></a>
    <p class="description">${bookmark.desc}</p>
  </div>`
}

const dropBookmarkDetail = (bookmarkRow) => {
  const bookmarkDescrip = $(bookmarkRow).siblings('.description-container');
  if (bookmarkDescrip.hasClass('hidden')) {
    //$('.description-container').attr('class', 'description-container hidden');
    bookmarkDescrip.attr('class', 'description-container');
    const bookmarkRow = bookmarkDescrip.siblings('.bookmark-row');
    $(bookmarkRow).find('.drop-arrow .arrow').attr('class', 'arrow up');
  } else {
    //$('.description-container').attr('class', 'description-container hidden');
    bookmarkDescrip.attr('class', 'description-container hidden');
    $(bookmarkRow).find('.drop-arrow .arrow').attr('class', 'arrow down');
  }
}

const render = () => {
  //let bookmarks = [...bookmarkStore.appData.bookmarkList];
  //console.log(bookmarks)
  $('#bookmark-list').html(generateBookmarksListTemplate(bookmarkStore.appData.bookmarkList));
}

const handleNewBookmark = () => {
  $('#new-bookmark-button').on('click', (event) => {
    
  });
}
const handleBookmarkDrop = () => {
  $('#bookmark-list-container').on('click', '.bookmark-row', function(event) {
    const selectedBookmark = $(this).find('span').text();
    dropBookmarkDetail(this);
  });
}
const handleFilter = () => {
  $('#filter-button').on('click', (event) => {
    console.log("click filter");
  })
}

const bindEventListeners = () => {
  handleNewBookmark();
  handleBookmarkDrop();
  handleFilter();
}

export default {
  bindEventListeners,
  render
}