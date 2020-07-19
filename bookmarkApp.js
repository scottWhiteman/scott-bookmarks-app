import $ from 'jquery';

import bookmarkStore from './bookmarkStore';
import api from './api';

/***HTML TEMPLATE SECTION***/
//Template for error message and section
const generateErrorTemplate = function(msg) {
  return `
    <section class="error">
      <button class="error-close">X</button>
      <p>${msg}</p>
    </section>
  `;
}
//Template for the entire list of bookmarks
const generateBookmarksListTemplate =  (bookmarkList) => {
  return bookmarkList.reduce((fullHtml, bookmark) => {
    return fullHtml += generateBookmarkTemplate(bookmark);
  }, '');
}
//Template for whole bookmark item
const generateBookmarkTemplate = (bookmark) => {
  return `<li class="bookmark-item" data-bookmark-id="${bookmark.id}">
      ${generateBookmarkRow(bookmark)}
      ${generateBookmarkDescription(bookmark)}
    </li>`;
}
//Template for Bookmark title and rating row
const generateBookmarkRow = (bookmark) => {
  return `<button class="bookmark-row">
    <div class="bookmark-title"><span>${bookmark.title}</span></div>
    <div class="drop-arrow"><i class="arrow down"></i></div>
    ${generateRating(bookmark.rating)}
  </button>`
}
//Template for displaying star ratings
//given value affects star fill
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
//Template for bookmark description and options
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
//New Bookmark Form//
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


/***DISPLAY FUNCTIONS***/
//Set the clicked bookmark row to display description and options
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
//Set to addmode and display a new crete bookmark form
const showNewBookmarkForm = () => {
  bookmarkStore.appData.adding = !bookmarkStore.appData.adding;
  if (bookmarkStore.appData.adding) {
    $('#new-bookmark-container').attr('class', '');
  } else {
    $('#new-bookmark-container').attr('class', 'hidden');
  }
}


/***RETRIEVAL FUNCTIONS***/
//Get the id of given bookmark element
const getBookmarkId = (bookmarkTarget) => {
  return $(bookmarkTarget).closest('.bookmark-item').data('bookmark-id');
}
//Return a filtered list of bookmarks at or higher than filtered rating
const filterBookmarks = () => {
  const filterRating = bookmarkStore.appData.filter;
  const filteredList = bookmarkStore.appData.bookmarkList.filter(bookmark => bookmark.rating >= filterRating);
  return generateBookmarksListTemplate(filteredList)
}


/***RENDERING FUNCTIONS***/
//Generate and display the html page
const render = () => {
  // let bookmarks = [...bookmarkStore.appData.bookmarkList];
  // console.log(bookmarks);
  renderError();
  if (bookmarkStore.appData.adding) {
    $('#new-bookmark-container').html(generateNewBookmarkForm());
  } else {
    $('#new-bookmark-container').empty();
  }
  renderBookmarkList();
}
//Generate and render the bookmark list itself
const renderBookmarkList = () => {
  if (bookmarkStore.appData.filter > 0) {
    $('#bookmark-list').html(filterBookmarks());
  } else {
    $('#bookmark-list').html(generateBookmarksListTemplate(bookmarkStore.appData.bookmarkList));
  }
}
//Generate and render the error section and its message
const renderError = () => {
  if (bookmarkStore.appData.error) {
    const errorHtml = generateErrorTemplate(bookmarkStore.appData.error)
    $('.error-container').html(errorHtml);
  } else {
    $('.error-container').empty();
  }
}

/***BUTTON HANDLER FUNCTIONS***/
//Show create bookmark form
const handleNewBookmark = () => {
  $('.header').on('click', '#new-bookmark-button', (event) => {
    showNewBookmarkForm();
    render();
  });
}
//Filter out all bookmarks less than selected value
const handleFilter = () => {
  $('.header').on('click', '#filter', function(event) {
    bookmarkStore.appData.filter = parseInt($(this).val());
    render();
  })
}
//Drop down and display more info about clicked bookmark row
const handleBookmarkDrop = () => {
  $('#bookmark-list-container').on('click', '.bookmark-row', function(event) {
    //const selectedBookmark = $(this).find('span').text();
    dropBookmarkDetail(this);
  });
}
//Allow the values of the selected bookmark to be changed
const handleBookmarkEdit = () => {
  $('#bookmark-list-container').on('click', '.edit', function(event) {
    console.log('You can start editing!');
  });
}
//Delete bookmark from database
const handleBookmarkDelete = () => {
  $('#bookmark-list-container').on('click', '.delete', function(event) {
    const id = getBookmarkId(this);
    api.deleteBookmark(id)
      .then(() => {
        bookmarkStore.deleteBookmark(id);
        render();
      })
      .catch(error => {
        bookmarkStore.setError(error.message);
        renderError();
      });
  });
}
//
//Close the new bookmark form and remove it from html
const handleNewFormCancel = () => {
  $('#new-bookmark-container').on('click', '.cancel', (event) => {
    bookmarkStore.appData.adding = false;
    $('#new-bookmark-container').attr('class', 'hidden');
    render();
  });
}
//Submit the new bookmark data and render it to the list
const handleNewFormCreate = () => {
  $('#new-bookmark-container').on('submit', (event) => {
    event.preventDefault();
    bookmarkStore.setError(null);
    const submitBookmark = {
      title: $('#new-bookmark-title').val(),
      url: $('#new-bookmark-url').val(),
      desc: $('#new-bookmark-description').val(),
      rating: $('#new-bookmark-rating').val()
    }
    api.createBookmark(submitBookmark.title, submitBookmark.url, submitBookmark.desc, submitBookmark.rating)
      .then((newBookmark) => {
        bookmarkStore.addBookmark(newBookmark);
        render();
      })
      .catch(error => {
        bookmarkStore.setError(error.message);
        renderError();
      });
  });
}

//Remove error message and hide error section
const handleErrorClose = () => {
  $('.error-container').on('click', '.error-close', function(event) {
    bookmarkStore.setError(null);
    renderError();
  });
}

const bindEventListeners = () => {
  handleNewBookmark();
  handleBookmarkDrop();
  handleBookmarkEdit();
  handleBookmarkDelete();
  handleFilter();
  handleNewFormCancel();
  handleNewFormCreate();
  handleErrorClose();
}

export default {
  bindEventListeners,
  render
}