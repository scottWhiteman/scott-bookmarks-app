import $ from 'jquery';

import bookmarkStore from './bookmarkStore';
import api from './api';

const generateErrorTemplate = function(msg) {
  
}

const generateBookmarksListTemplate =  (bookmarkList) => {
  return bookmarkList.reduce((fullHtml, bookmark) => {
    return fullHtml += generateBookmarkTemplate(bookmark);
  }, '');
}
const generateBookmarkTemplate = (bookmark) => {
  return `<li class="bookmark-item" data-bookmark-id="${bookmark.id}">
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
  let htmlStar = '<div class="rating">';
  for (let i = 0; i < rating; i++) {
    htmlStar += `<div class="star-fill"></div>`
  }
  for (let i = 0; i < 5-rating; i++) {
    htmlStar += `<div class="star-empty"></div>`
  }
  return htmlStar+'</div>'
}
const generateBookmarkDescription = (bookmark) => {
  return `<div class="description-container hidden">
    <div>
      <button class="edit">Edit</button>
      <a href="${bookmark.url}" target="_blank"><button class="site-link">Visit!</button></a>
      <button class="delete">Delete</button>
    </div>
    <p class="description">${bookmark.desc}</p>
  </div>`
}

const generateNewBookmarkForm = () => {
  return `<form id="new-bookmark-form">
    <div class='bookmark-url-container'>
      <label for="url">New Bookmark URL:</label><br/>
      <input id="new-bookmark-url" type="text" name="url" placeholder="https://www.somewebsite.com"><br/>
      <label for="title">Name:</label><br/>
      <input id="new-bookmark-title" type="text" name="title" placeholder="Insert Name"><br/>
    </div>
    <div>
      <select id="new-bookmark-rating" name="rating">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </div>
    <textarea id="new-bookmark-description" class="description-text" rows="8" cols="30" name="description" form="new-bookmark-form" placeholder="Enter description here..."></textarea>
    <div class="buttons-container">
      <button type="button" class="form-button cancel">Cancel</button>
      <button type="submit" class="form-button">Create</button>
    </div>
  </form>
  `;
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

const showNewBookmarkForm = () => {
  bookmarkStore.appData.adding = !bookmarkStore.appData.adding;
  if (bookmarkStore.appData.adding) {
    $('#new-bookmark-container').attr('class', '');
  } else {
    $('#new-bookmark-container').attr('class', 'hidden');
  }
}

const getBookmarkId = (bookmarkTarget) => {
  return $(bookmarkTarget).closest('.bookmark-item').data('bookmark-id');
}

const render = () => {
  // let bookmarks = [...bookmarkStore.appData.bookmarkList];
  // console.log(bookmarks);
  if (bookmarkStore.appData.adding) {
    $('#new-bookmark-container').html(generateNewBookmarkForm());
  } else {
    $('#new-bookmark-container').html('');
  }
  renderBookmarkList();
}
const renderBookmarkList = () => {
  if (bookmarkStore.appData.filter > 0) {
    const filterRating = bookmarkStore.appData.filter;
    const filteredList = bookmarkStore.appData.bookmarkList.filter(bookmark => bookmark.rating === filterRating);
    $('#bookmark-list').html(generateBookmarksListTemplate(filteredList));
  } else {
    $('#bookmark-list').html(generateBookmarksListTemplate(bookmarkStore.appData.bookmarkList));
  }
}

const handleNewBookmark = () => {
  $('.header').on('click', '#new-bookmark-button', (event) => {
    showNewBookmarkForm();
    render();
  });
}
const handleFilter = () => {
  $('.header').on('click', '#filter', function(event) {
    bookmarkStore.appData.filter = parseInt($(this).val());
    render();
  })
}
const handleBookmarkDrop = () => {
  $('#bookmark-list-container').on('click', '.bookmark-row', function(event) {
    //const selectedBookmark = $(this).find('span').text();
    dropBookmarkDetail(this);
  });
}
const handleBookmarkDelete = () => {
  $('#bookmark-list-container').on('click', '.delete', function(event) {
    const id = getBookmarkId(this);
    console.log(id);
    api.deleteBookmark(id)
      .then(() => {
        bookmarkStore.deleteBookmark(id);
        render();
      })
      .catch(error => console.log("error deleting"));
  });
}

const handleNewFormCancel = () => {
  $('#new-bookmark-container').on('click', '.cancel', (event) => {
    bookmarkStore.appData.adding = false;
    $('#new-bookmark-container').attr('class', 'hidden');
    render();
  });
}
const handleNewFormCreate = () => {
  $('#new-bookmark-container').on('submit', (event) => {
    event.preventDefault();
    const submitBookmark = {
      title: $('#new-bookmark-title').val(),
      url: $('#new-bookmark-url').val(),
      desc: $('#new-bookmark-description').val(),
      rating: $('#new-bookmark-rating').val()
    }
    console.log(submitBookmark);
    api.createBookmark(submitBookmark.title, submitBookmark.url, submitBookmark.desc, submitBookmark.rating)
      .then((newBookmark) => {
        console.log(newBookmark);
        bookmarkStore.addBookmark(newBookmark);
        render();
      })
      .catch(error => console.log("error submitting"));
  });
}

const bindEventListeners = () => {
  handleNewBookmark();
  handleBookmarkDrop();
  handleBookmarkDelete();
  handleFilter();
  handleNewFormCancel();
  handleNewFormCreate();
}

export default {
  bindEventListeners,
  render
}