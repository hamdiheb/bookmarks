// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds, getData, setData, clearData } from "./storage.js";

const USER_STRING_PREFIX = "User_";

const NO_BOOKMARKS_MESSAGE = "<h2>There's no any bookmarks yet</h2>";

class Bookmark {
  title = "";
  url = "";
  description = "";
  timestamp = 0;
  likeCount = 0;

  constructor(title, url, description) {
    this.title = title;
    this.url = url;
    this.description = description;
    this.timestamp = new Date();
    this.likeCount = 0;
  }
}

//region prepare
function setupUserData() {
  for (const userId of getUserIds()) {
    if (!getData(userId)) {
      setData(userId, []);
    }
  }
}

function setupUserSelect() {
  getUserSelect().addEventListener("change", onChangeUserSelect);
}

function setupBookmarkAddForm() {
  //TODO: If it's needed add setup other bookmark add form elements
  setupBookmarkAddFormOkBtn();
  // setupBookmarkAddFormCancelBtn();
}

function setupBookmarkAddFormOkBtn() {
  //TODO: implement getting the bookmark add form OK button element 
  document
    .querySelector("#bookmark-form-submit-button")
    .addEventListener("click", onClickBookmarkAddFormOkBtn);
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
  const bookmarkElement = document.getElementById("bookmark-element-template")
    .content.cloneNode(true);

  renderBookmarkElementTitle(bookmarkData, bookmarkElement);
  renderBookmarkElementCopyBtn(bookmarkData, bookmarkElement);
  renderBookmarkElementDescription(bookmarkData, bookmarkElement);
  renderBookmarkElementTimestamp(bookmarkData, bookmarkElement);
  renderBookmarkElementLikeBtn(bookmarkData, bookmarkElement, index);

  getBookmarkElementsContainer().appendChild(bookmarkElement);
}

function renderBookmarkElementTitle(data, element) {
  const titleElement = element.querySelector(".bookmark-element-title a");
  
  titleElement.innerText = data.title;
  titleElement.href = data.url;
}

function renderBookmarkElementCopyBtn(data, element) {
  const copyBtn = element.querySelector(".bookmark-element-copy-button");
  
  copyBtn.dataset.url = data.url;
  copyBtn.addEventListener("click", onClickBookmarkElementCopyBtn);
}

function renderBookmarkElementDescription(data, element) {
  element.querySelector(".bookmark-element-description p").innerText = data.description;
}

function renderBookmarkElementTimestamp(data, element) {
  element.querySelector(".bookmark-element-timestamp p").innerText =
    data.timestamp.toLocaleString();
}

function renderBookmarkElementLikeBtn(data, element, index) {
  const likeBtn = element.querySelector(".bookmark-element-like-button");

  likeBtn.dataset.bookmarkIndex = index;
  likeBtn.innerText = data.likeCount;
  likeBtn.addEventListener("click", onClickBookmarkElementLikeBtn);
}

function renderNoBookmarksMessage() {
  clearBookmarkElementsContainer();
  getBookmarkElementsContainer().innerHTML = NO_BOOKMARKS_MESSAGE;
}
//endregion


//region listeners
function onLoadWindow() {
  setupUserData();
  setupUserSelect();
  setupBookmarkAddForm();
  renderUserSelect();
  dispatchUserSelectChangeEvent();
}

function onChangeUserSelect(event) {
  renderBookmarkElements(getData(getCurrentUserId()));
}

function onClickBookmarkAddFormOkBtn() {
  const title = document.getElementById("bookmark-form-title-input").value;
  const url = document.getElementById("bookmark-form-url-input").value;
  const description = document.getElementById("bookmark-form-description-textarea").value;

  if (checkIsUrlCorrect(url) && checkIsDescriptionCorrect(description)) {
    const currentUserId = getCurrentUserId();
    const currentUserData = getData(currentUserId);
    
    currentUserData.unshift(new Bookmark(title, url, description));
    console.log("add bookmark:", currentUserData);
    setData(currentUserId, currentUserData);

    dispatchUserSelectChangeEvent();
  }
}

function onClickBookmarkAddFormCancelBtn() {
  const url = document.querySelector("URL input query string").value = "";
  const description = document.querySelector("Description input query string").value = "";
}

function onClickBookmarkElementCopyBtn(event) {
  const url = event.target.data.url;

  navigator.clipboard.writeText(url)
    .then(() => {
      console.log(`URL '${url}' successfully copied to clipboard`);
    })
    .catch((error) => {
      `Failed to copy URL '${url}' to clipboard:\n${error}`;
    })
}

function onClickBookmarkElementLikeBtn(event) {
  const likeBtn = event.target;
  const bookmarkIndex = likeBtn.dataset.bookmarkIndex;
  const currentUserData = getData(getCurrentUserId());

  likeBtn.innerText = ++currentUserData[bookmarkIndex].likeCount;

  setData(getCurrentUserId(), currentUserData);
}
//endregion


//region utilities
function getCurrentUserId() {
  return getUserSelect().value;
}

function getUserSelect() {
  return document.getElementById("user-select");
}

function dispatchUserSelectChangeEvent() {
  getUserSelect().dispatchEvent(new Event("change"));
}

function getBookmarkElementsContainer() {
  return document.getElementById("bookmark-elements-container");
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
window.onload = onLoadWindow();
