// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds, getData, setData, clearData } from './storage.js'

const USER_STRING_PREFIX = 'User_'

const NO_BOOKMARKS_MESSAGE = "There's no any bookmarks yet"

class Bookmark {
  constructor(title, url, description) {
    this.title = title
    this.url = url
    this.description = description
    this.timestamp = new Date()
    this.likeCount = 0
  }
}

//initializes the user selection dropdown by attaching a change event listener to the #user_selector element
//When event is lunched the UI will be updated by rendering the corresponding bookmarks
function setupUserSelect() {
  const userSelector = document.querySelector('#user_selector')
  userSelector.addEventListener('change', (event) => {
    const userID = event.target.value
    renderBookmarks(getData(userID))
  })
}

//creating a Bookmark object, updating the user’s stored bookmarks (creating the list if it doesn’t exist)
function saveBookmark(title, url, description, userID) {
  //TODO  if (checkIsUrlCorrect(url) && checkIsDescriptionCorrect(description) && validateTitle(title)) {
  const newBookmark = new Bookmark(title, url, description)
  let userBookmarks = getData(userID)

  if (!userBookmarks) {
    console.log('User have no Bookmark , creating new one')
    userBookmarks = [newBookmark]
  } else {
    userBookmarks.unshift(newBookmark)
  }
  setData(userID, userBookmarks)
}

//Handles adding a new bookmark for the selected user and wiring the form button to trigger this process on click.
function setupBookmarkAddForm() {
  const bookmarkTitle = document.querySelector('#fm_bookmark_title')
  const bookmarkURL = document.querySelector('#fm_bookmark_url')
  const bookmarkDescription = document.querySelector('#fm_bookmark_description')
  const userID = document.querySelector('#user_selector')
  const bookmarkAddBtn = document.querySelector('#bookmark_add_btn')
  bookmarkAddBtn.addEventListener('click', (event) => {
    saveBookmark(bookmarkTitle.value, bookmarkURL.value, bookmarkDescription.value, userID.value)
    renderBookmarks(getData(userID.value))
    event.preventDefault()
  })
}

//region render
function renderUserSelect() {
  const userSelect = getUserSelect()

  userSelect.options.length = 0
  for (const id of getUserIds()) {
    userSelect.add(new Option(`${USER_STRING_PREFIX}${id}`, id))
  }
}

function clearBookmarks(sectionBookmarks) {
  // sectionBookmarks.removeChild(sectionBookmarks.firstElementChild)
  sectionBookmarks.innerHTML = ``
}

// Creates and returns a DOM element representing a single bookmark card
function createBookmarkCard(bookmarkData) {
  const bookmarkCard = document.createElement('article')
  const bookmarkTitle = document.createElement('a')
  const bookmarkDescription = document.createElement('p')
  const bookmarkTime = document.createElement('date')
  const bookmarkSetting = document.createElement('div')
  const bookmarkLike = document.createElement('button')
  const bookmarkShare = document.createElement('button')

  bookmarkTitle.textContent = bookmarkData.title
  bookmarkTitle.href = bookmarkData.url
  bookmarkDescription.textContent = bookmarkData.description
  bookmarkTime.textContent = bookmarkData.timestamp
  bookmarkLike.textContent = `${bookmarkData.likeCount} Like`
  bookmarkShare.textContent = 'Share'

  bookmarkLike.addEventListener('click', () => addLike(bookmarkData))
  bookmarkShare.addEventListener('click', () => shareBookmark(bookmarkCard))
  bookmarkSetting.append(bookmarkLike, bookmarkShare)
  bookmarkCard.append(bookmarkTitle, bookmarkDescription, bookmarkTime, bookmarkSetting)
  return bookmarkCard
}

// Renders a list of bookmarks into the #bookmarks section
function renderBookmarks(bookmarks) {
  const sectionBookmarks = document.querySelector('#bookmarks')
  clearBookmarks(sectionBookmarks)
  if (!bookmarks) {
    renderNoBookmarksMessage()
  } else {
    bookmarks.forEach((bookmark) => {
      const bookmarkCard = createBookmarkCard(bookmark)
      sectionBookmarks.append(bookmarkCard)
    })
  }
}

function renderNoBookmarksMessage() {
  //TODO: implement setting no bookmarks message to the its container
}
//endregion

//Increases the like count of a specific bookmark and updates the stored data for the selected user.
function addLike(bookmarkData) {
  const currentuserID = document.querySelector('#user_selector').value
  const currentuserBookmarks = getData(currentuserID)
  const updatedBookmarks = currentuserBookmarks.map((element) => {
    if (element.timestamp == bookmarkData.timestamp) {
      element.likeCount++
    }
    return element
  })
  setData(currentuserID, updatedBookmarks)
  renderBookmarks(updatedBookmarks)
}

function shareBookmark(bookmarkCard) {
  navigator.clipboard.writeText(bookmarkCard)
  console.log('hi', bookmarkCard)
}

function shareBookmarkLink(event) {
  let url = `${document.URL}/1/124`

  if (navigator.clipboard.writeText(url)) {
    alert('URL Copied')
    console.log(url)
  }
}

function onClickBookmarkElementLikeBtn(event) {
  const likeBtn = event.target
  const bookmarkIndex = likeBtn.dataset.bookmarkIndex
  const bookmark = getData(getCurrentUserId())[bookmarkIndex]

  likeBtn.innerText = bookmark.addLikeCount()
}

function checkIsUrlCorrect(url) {
  //TODO: implement url check logic and message show if it's incorrect.
  return true
}

function checkIsDescriptionCorrect(description) {
  //TODO: implement description check logic and message show if it's incorrect.
  return true
}
//endregion

//TODO: uncomment when script will be ready.
//window.onload = onLoadWindow();

function init() {
  const initUser = document.querySelector('#user_selector')
  renderBookmarks(getData(initUser.value))
  setupUserSelect()
  setupBookmarkAddForm()
}

init()
