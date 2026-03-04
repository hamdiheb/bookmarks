import { getUserIds, getData, setData, clearData } from "./storage.js";


const USER_STRING_PREFIX = "User_";
const NO_BOOKMARKS_MESSAGE = "<h2>There's no any bookmarks yet</h2>";

const USER_SELECT = document.getElementById("user-select");

const BOOKMARK_ADD_FORM = document.getElementById("bookmark-form");
const BOOKMARK_ADD_FORM_TITLE = document.getElementById("bookmark-form-title-input");
const BOOKMARK_ADD_FORM_URL = document.getElementById("bookmark-form-url-input");
const BOOKMARK_ADD_FORM_DESCRIPTION = document.getElementById("bookmark-form-description-textarea");
const BOOKMARK_ADD_BUTTON = document.querySelector("#bookmark-form-submit-button");
const BOOKMARK_CLEAR_BUTTON = document.querySelector("#bookmark-form-cancel-button");

const BOOKMARK_ELEMENTS_CONTAINER = document.getElementById("bookmark-elements-container");

const BOOKMARK_TEMPLATE = document.getElementById("bookmark-element-template");


//region prepare
function setupPageControlElements() {
  USER_SELECT.options.length = 0;

  for (const id of getUserIds()) {
    USER_SELECT.add(new Option(`${USER_STRING_PREFIX}${id}`, id));
  }
  USER_SELECT.addEventListener("change", () =>
    renderBookmarks(getData(getCurrentUserId()))
  );

  BOOKMARK_ADD_BUTTON.addEventListener("click", onClickBookmarkFormAddButton)
  BOOKMARK_CLEAR_BUTTON.addEventListener("click", clearBookmarkForm);
}
//endregion


//region render
function renderBookmarks(bookmarkList) {
  BOOKMARK_ELEMENTS_CONTAINER.innerHTML = "";

  if (bookmarkList) {
    for (let i = 0; i < bookmarkList.length; i++) {
      renderBookmarkElement(bookmarkList[i], i);
    }
  } else {
    BOOKMARK_ELEMENTS_CONTAINER.innerHTML = NO_BOOKMARKS_MESSAGE;
  }
}

function renderBookmarkElement(data, index) {
  let element = BOOKMARK_TEMPLATE.content.cloneNode(true);

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
  
  BOOKMARK_ELEMENTS_CONTAINER.appendChild(element);
}
//endregion


//region listeners
function onLoadWindow() {
  setupPageControlElements();
  dispatchUserSelectChangeEvent();
}

function onClickBookmarkFormAddButton() {
  const title = BOOKMARK_ADD_FORM_TITLE.value;
  const url = BOOKMARK_ADD_FORM_URL.value;
  const description = BOOKMARK_ADD_FORM_DESCRIPTION.value;

  if (checkIsUrlCorrect(url) && checkIsDescriptionCorrect(description)) {
    let currentUserId = getCurrentUserId();
    let currentUserData = getData(currentUserId);
    if (!currentUserData) {
      console.log(`Created new bookmarks array for user ${currentUserId} to store in the local storage`)
      currentUserData = [];
    }
    currentUserData.unshift(
      {title: title, url: url, description: description, timestamp: new Date(), likeCount: 0}
    );
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
  return USER_SELECT.value;
}

function clearBookmarkForm() {
  BOOKMARK_ADD_FORM.reset();
}

function dispatchUserSelectChangeEvent() {
  USER_SELECT.dispatchEvent(new Event("change"));
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


window.onload = onLoadWindow();