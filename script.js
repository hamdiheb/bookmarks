// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds, getData, setData, clearData } from "./storage.js";

const USER_STRING_PREFIX = "User_";

const NO_BOOKMARKS_MESSAGE = "There's no any bookmarks yet";

class Bookmark {
  url = "";
  description = "";
  timestamp = 0;
  likeCount = 0;

  constructor(url, description) {
    this.url = url;
    this.description = description;
    this.timestamp = new Date();
    this.likeCount = 0;
  }

  getUrl() {
    return this.url;
  }

  getDescription() {
    return this.description;
  }

  getDateString() {
    return this.timestamp.toLocaleString();
  }

  getLikeCount() {
    return this.likeCount;
  }

  addLikeCount() {
    return ++this.likeCount;
  }
}

//region prepare
function setupUserSelect() {
  getUserSelect().addEventListener("input", onInputUserSelect);
}

function setupBookmarkAddForm() {
  //TODO: If it's needed add setup other bookmark add form elements
  setupBookmarkAddFormOkBtn();
  setupBookmarkAddFormCancelBtn();
}

function setupBookmarkAddFormOkBtn() {
  //TODO: implement getting the bookmark add form OK button element 
  document.querySelector("").addEventListener("click", onClickBookmarkAddFormOkBtn);
}

function setupBookmarkAddFormCancelBtn() {
  //TODO: implement getting the bookmark add form Cancel button element
  document.querySelector("").addEventListener("click", onClickBookmarkAddFormCancelBtn);
}
//endregion


//region render
function renderUserSelect() {
    const userSelect = getUserSelect();

  userSelect.options.length = 0;
  for(const id of getUserIds()) {
    userSelect.add(new Option(`${USER_STRING_PREFIX}${id}`, id));
  }
}

function renderBookmarkElements(list) {
  clearBookmarkElementsContainer();

  if (list.length) {
    for (let i = 0; i < list.length; i++) {
      renderBookmarkElement(list[i], i);
    }
  } else {
    renderNoBookmarksMessage();
  }
}

function renderBookmarkElement(bookmarkData, index) {
  // TODO: implement bookmark card element getting, when the page will be ready
  //const bookmarkElement = template.content.cloneNode(true);

  renderBookmarkElementTitle(bookmarkData, bookmarkElement);
  renderBookmarkElementCopyBtn(bookmarkData, bookmarkElement);
  renderBookmarkElementDescription(bookmarkData, bookmarkElement);
  renderBookmarkElementTimestamp(bookmarkData, bookmarkElement);
  renderBookmarkElementLikeBtn(bookmarkData, bookmarkElement, index);

  getBookmarkElementsContainer().appendChild(bookmarkElement);
}

function renderBookmarkElementTitle(data, element) {
  //TODO: implement setting title text and url on bookmark element
}

function renderBookmarkElementCopyBtn(data, element) {
  //TODO: implement setting copy button text and click event listener on bookmark element
}

function renderBookmarkElementDescription(data, element) {
  //TODO: implement setting description text on bookmark element
}

function renderBookmarkElementTimestamp(data, element) {
  //TODO: implement setting date text from timestamp on bookmark element
}

function renderBookmarkElementLikeBtn(data, element, index) {
  //TODO: implement setting like button text and id on bookmark element
}

function renderNoBookmarksMessage() {
  //TODO: implement setting no bookmarks message to the its container
}
//endregion


//region listeners
function onLoadWindow() {
  setupUserSelect();
  setupBookmarkAddForm();
  renderUserSelect();
  dispatchUserSelectInputEvent();
}

function onInputUserSelect(event) {
  renderBookmarkElements(getData(getCurrentUserId()));
}
//endregion


//region utilities
function getCurrentUserId() {
  return getUserSelect().value;
}

function getUserSelect() {
  //TODO: implement getting user select element from the page, when it will be ready.
  //return document.getElementById("user-select");
}

function dispatchUserSelectInputEvent() {
  getUserSelect().dispatchEvent(new Event("input"));
}

function getBookmarkElementsContainer() {
  //TODO: implement the getting bookmark elements container
}

function clearBookmarkElementsContainer() {
  getBookmarkElementsContainer().innerHTML = "";
}
//endregion

//TODO: uncomment when script will be ready.
//window.onload = onLoadWindow();
