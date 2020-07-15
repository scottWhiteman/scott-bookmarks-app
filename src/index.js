// const store = {
//     bookmarks: [
//       {
//         id: 'x56w',
//         title: 'Title 1',
//         rating: 3,
//         url: 'http://www.title1.com',
//         description: 'lorem ipsum dolor sit',
//         expanded: false
//       },
//       {
//         id: '6ffw',
//         title: 'Title 2',
//         rating: 5,
//         url: 'http://www.title2.com',
//         description: 'dolorum tempore deserunt',
//         expanded: false
//       } 
//     ],
//     adding: false,
//     error: null,
//     filter: 0
//   };
import $ from 'jquery';
import './style.css';

import api from './api';
import bookmarkList from './bookmarkList';
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
  // api.createBookmark("Event Hubs", "https://www.wikipedia.org", "The One and Only online wikipedia", 5)
  //   .then(res => res.json())
  //   .then((newBookmark) => {
  //     return api.getBookmarks();
  //   })
  //   .then(res => res.json())
  //   .then((bookmarks) => {
  //     console.log(bookmarks);
  //   });

  api.getBookmarks()
    .then(res => res.json())
    .then(res => console.log(res));
  bookmarkApp.bindEventListeners();
  bookmarkApp.render();
};

$(main)