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
    this.title = title;
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
  getUserSelect().addEventListener("change", onInputUserSelect);
}

function setupBookmarkAddForm() {
  //TODO: If it's needed add setup other bookmark add form elements
  setupBookmarkAddFormOkBtn();
  setupBookmarkAddFormCancelBtn();
}

function setupBookmarkAddFormOkBtn() {
  //TODO: implement getting the bookmark add form OK button element 
  document.querySelector("#add_btn").addEventListener("click", onClickBookmarkAddFormOkBtn);
}

function setupBookmarkAddFormCancelBtn() {
  //TODO: implement getting the bookmark add form Cancel button element
  document.querySelector("#clear_btn").addEventListener("click", onClickBookmarkAddFormCancelBtn);
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
  const copyBtn = clearData.querySelector();
  
  copyBtn.dataset.url = data.url;
  copyBtn.addEventListener("click", onClickBookmarkElementCopyBtn);
}

function renderBookmarkElementDescription(data, element) {
  //TODO: implement setting description text on bookmark element
}

function renderBookmarkElementTimestamp(data, element) {
  //TODO: implement setting date text from timestamp on bookmark element
  const timestampElement = element.querySelector("timestamp element query");

  timestampElement.innerText = data.timestamp.toLocaleString();
}

function renderBookmarkElementLikeBtn(data, element, index) {
  //TODO: implement getting bookmark element like button
  const likeBtn = element.querySelector("like button query");
  
  likeBtn.dataset.bookmarkIndex = index;
  likeBtn.innerText = data.likeCount;
  likeBtn.addEventListener(onClickBookmarkElementLikeBtn);
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

function onClickBookmarkAddFormOkBtn() {
  //TODO: implement bookmark add form input elements
  const title = document.querySelector("#fm_bookmark_title").value;
  const url = document.querySelector("fm_bookmark_url").value;
  const description = document.querySelector("fm_bookmark_description").value;

  if (checkIsUrlCorrect(url) && checkIsDescriptionCorrect(description) && validateTitle(title)) {
    const currentUserId = getCurrentUserId();
    const currentUserData = getData(currentUserId);
    
    currentUserData.unshift(new Object(title, url, description));
    setData(currentUserId, currentUserData);

    dispatchUserSelectInputEvent();
  }
}

function onClickBookmarkAddFormCancelBtn() {
  //TODO: implement bookmark add form input elements
  const title = document.querySelector("#fm_bookmark_title");
  const url = document.querySelector("#fm_bookmark_url").value = "";
  const description = document.querySelector("#fm_bookmark_description").value = "";
}

// function onClickBookmarkElementCopyBtn(event) {
//   const url = event.target.data.url;

//   navigator.clipboard.writeText(url)
//     .then(() => {
//       console.log(`URL '${url}' successfully copied to clipboard`);
//     })function renderBookmarkElement(bookmarkData, index) {
// ￼

//     .catch((error) => {
//       `Failed to copy URL '${url}' to clipboard:\n${error}`;
//     })
// }

function onClickBookmarkElementLikeBtn(event) {
  const likeBtn = event.target;
  const bookmarkIndex = likeBtn.dataset.bookmarkIndex;
  const bookmark = getData(getCurrentUserId())[bookmarkIndex];

  likeBtn.innerText = bookmark.addLikeCount();
}
//endregion


//region utilities
function getCurrentUserId() {
  return getUserSelect().value;
}

function getUserSelect() {
  //TODO: implement getting user select element from the page, when it will be ready.
  return document.querySelector("#user_selector");
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

function checkIsUrlCorrect(url) {
  //TODO: implement url check logic and message show if it's incorrect.
  return true;
}

function checkIsDescriptionCorrect(description) {
  //TODO: implement description check logic and message show if it's incorrect.
  return true;
}
//endregion

//TODO: uncomment when script will be ready.
//window.onload = onLoadWindow();
