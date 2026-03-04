// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds, getData, setData, clearData } from "./storage.js";

const USER_STRING_PREFIX = "User_";
const NO_BOOKMARKS_MESSAGE = "<h2>There's no any bookmarks yet</h2>";

const userSelect = document.getElementById("user-select");
const bookmarkAddButton = document.querySelector("#bookmark-form-submit-button");
const bookmarkClearButton = document.querySelector("#bookmark-form-cancel-button");
const bookmarkElementsContainer = document.getElementById("bookmark-elements-container");
const bookmarkTemplate = document.getElementById("bookmark-element-template");


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
function setupPageControlElements() {
  userSelect.options.length = 0;

  for (const id of getUserIds()) {
    userSelect.add(new Option(`${USER_STRING_PREFIX}${id}`, id));
  }
  userSelect.addEventListener("change", () =>
    renderBookmarks(getData(getCurrentUserId()))
  );

  bookmarkAddButton.addEventListener("click", onClickBookmarkFormAddButton)
  bookmarkClearButton.addEventListener("click", clearBookmarkForm);
}
//endregion


//region render
function renderBookmarks(bookmarkList) {
  bookmarkElementsContainer.innerHTML = "";

  if (bookmarkList) {
    for (let i = 0; i < bookmarkList.length; i++) {
      renderBookmarkElement(bookmarkList[i], i);
    }
  } else {
    bookmarkElementsContainer.innerHTML = NO_BOOKMARKS_MESSAGE;
  }
}

function renderBookmarkElement(data, index) {
  let element = bookmarkTemplate.content.cloneNode(true);

  let titleElement = element.querySelector(".bookmark-element-title a");
  titleElement.innerText = data.title;
  titleElement.href = data.url;

  let copyButton = element.querySelector(".bookmark-element-copy-button");
  copyButton.dataset.url = data.url;
  copyButton.addEventListener("click", onClickBookmarkElementCopyBtn);

  let descriptionElement = element.querySelector(".bookmark-element-description p")
  descriptionElement.innerText = data.description;

  let timestampElement = element.querySelector(".bookmark-element-timestamp p")
  timestampElement.innerText = data.timestamp.toLocaleString();
  
  let likeButton = element.querySelector(".bookmark-element-like-button");
  likeButton.dataset.bookmarkIndex = index;
  likeButton.innerText = data.likeCount;
  likeButton.addEventListener("click", onClickBookmarkElementLikeBtn);
  
  bookmarkElementsContainer.appendChild(element);
}
//endregion


//region listeners
function onLoadWindow() {
  setupPageControlElements();
  dispatchUserSelectChangeEvent();
}

function onClickBookmarkFormAddButton() {
  const title = document.getElementById("bookmark-form-title-input").value;
  const url = document.getElementById("bookmark-form-url-input").value;
  const description = document.getElementById("bookmark-form-description-textarea").value;

  if (checkIsUrlCorrect(url) && checkIsDescriptionCorrect(description)) {
    let currentUserId = getCurrentUserId();
    let currentUserData = getData(currentUserId);
    if (!currentUserData) {
      console.log(`Created new bookmarks array for user ${currentUserId} to store in the local storage`)
      currentUserData = [];
    }
    currentUserData.unshift(new Bookmark(title, url, description));
    setData(currentUserId, currentUserData);
    
    clearBookmarkForm();
    dispatchUserSelectChangeEvent();
  }
}

function onClickBookmarkElementCopyBtn(event) {
  let url = event.target.dataset.url;

  navigator.clipboard.writeText(url)
    .then(() => {
      console.log(`URL '${url}' successfully copied to clipboard`);
    })
    .catch((error) => {
      `Failed to copy URL '${url}' to clipboard:\n${error}`;
    })
}

function onClickBookmarkElementLikeBtn(event) {
  let likeButton = event.target;
  let bookmarkIndex = likeButton.dataset.bookmarkIndex;
  let currentUserData = getData(getCurrentUserId());

  likeButton.innerText = ++currentUserData[bookmarkIndex].likeCount;

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

function getBookmarkForm() {
  return document.getElementById("bookmark-form");
}

function clearBookmarkForm() {
  getBookmarkForm().reset();
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