// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds, getData, setData, clearData } from "./storage.js";

const USER_STRING_PREFIX = "User_";

const NO_BOOKMARKS_MESSAGE = "There's no any bookmarks yet";

class Bookmark {
  constructor(title,url,description) {
    this.title = title;
    this.url = url;
    this.description = description;
    this.timestamp = new Date();
    this.likeCount = 0;
  }
}

//initializes the user selection dropdown by attaching a change event listener to the #user_selector element
//When event is lunched the UI will be updated by rendering the corresponding bookmarks
function setupUserSelect() {
  const userSelector = document.querySelector("#user_selector");
  userSelector.addEventListener("change", (event) => {
    renderBookmarkElement(getData(event.target.value))
  });
}

//creating a Bookmark object, updating the user’s stored bookmarks (creating the list if it doesn’t exist)
function bookmarkHandler(title,url,description,userID){
  //TODO  if (checkIsUrlCorrect(url) && checkIsDescriptionCorrect(description) && validateTitle(title)) {
  const newbookMark = new Bookmark(title,url,description);
  let userbookMarks = [];

  if(!getData(userID)){
    console.log("User have no Bookmark , creating new one");
    userbookMarks.push(newbookMark);
    setData(userID,userbookMarks);
  }else{
    userbookMarks = getData(userID);
    userbookMarks.unshift(newbookMark);
    setData(userID,userbookMarks)
  }
}

//Handles adding a new bookmark for the selected user and wiring the form button to trigger this process on click.
function setupBookmarkAddForm() {
  const bookmarkTitle = document.querySelector("#fm_bookmark_title");
  const bookmarkURL = document.querySelector("#fm_bookmark_url");
  const bookmarkDescription = document.querySelector("#fm_bookmark_description");
  const userID = document.querySelector("#user_selector");
  const bookmarkAddBtn = document.querySelector("#bookmark_add_btn");
  bookmarkAddBtn.addEventListener("click", (event) => {
        bookmarkHandler(bookmarkTitle.value,bookmarkURL.value,bookmarkDescription.value,userID.value);
        event.preventDefault();
  })
}

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

function onClickBookmarkElementCopyBtn(event){
    let url = `${document.URL}/1/124`;

    if(navigator.clipboard.writeText(url)){
        alert("URL Copied");
        console.log(url);
    }
}

function onClickBookmarkElementLikeBtn(event) {
  const likeBtn = event.target;
  const bookmarkIndex = likeBtn.dataset.bookmarkIndex;
  const bookmark = getData(getCurrentUserId())[bookmarkIndex];

  likeBtn.innerText = bookmark.addLikeCount();
}
//endregion

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

function init(){
  // setupUserSelect();
  setupBookmarkAddForm();
}

init();