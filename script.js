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
    this.bookmarkID = crypto.randomUUID() //this function will created random crypted ID by bookmark
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
    if (
      verifyTitle(bookmarkTitle) &&
      verifyUrl(bookmarkURL) &&
      verifyDescription(bookmarkDescription)
    ) {
      saveBookmark(bookmarkTitle.value, bookmarkURL.value, bookmarkDescription.value, userID.value)
      renderBookmarks(getData(userID.value))
      event.preventDefault()
    }
  })
}

//region render
function renderUserSelect() {
  const userID = document.querySelector('#user_selector')
  const users = getUserIds()

  users.forEach((user) => {
    const userOption = document.createElement('option')
    userOption.textContent = user
    userID.append(userOption)
  })
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

  bookmarkLike.addEventListener('click', () => addLike(bookmarkData, bookmarkLike))
  bookmarkShare.addEventListener('click', () => shareBookmark(bookmarkData))
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
  const bookmarkSection = document.querySelector('#bookmarks')
  const nobookmarkArticle = document.createElement('article')
  const paragraph = document.createElement('p')

  paragraph.textContent = NO_BOOKMARKS_MESSAGE
  nobookmarkArticle.append(paragraph)
  bookmarkSection.append(nobookmarkArticle)
}

//Increases the like count of a specific bookmark and updates the stored data for the selected user.
function addLike(bookmarkData, bookmarkLike) {
  const currentuserID = document.querySelector('#user_selector').value
  const currentuserBookmarks = getData(currentuserID)
  const updatedBookmarks = currentuserBookmarks.map((element) => {
    if (element.bookmarkID == bookmarkData.bookmarkID) {
      element.likeCount++
      bookmarkLike.textContent = `${element.likeCount} Like`
    }
    return element
  })
  setData(currentuserID, updatedBookmarks)
}

//Generates a shareable link for a specific bookmark and copies it to the clipboard.
async function shareBookmark(bookmarkCard) {
  const currentuserID = document.querySelector('#user_selector').value
  const url = `${window.location.origin}/?user=${currentuserID}&bookmark=${bookmarkCard.bookmarkID}`
  await navigator.clipboard.writeText(url)
  alert('URL COPIED')
}

//Reads user and bookmark IDs from the URL and renders the corresponding shared bookmark.
function renderSharedBookmarkFromURL() {
  const query = new URLSearchParams(window.location.search)
  const selectedUserId = query.get('user')
  const selectedBookmarkID = query.get('bookmark')
  if (selectedUserId && selectedBookmarkID) {
    const currentUser = document.querySelector('#user_selector')
    currentUser.value = selectedUserId
    const userBookmarks = getData(selectedUserId)
    const bookmarkToRender = userBookmarks.filter(
      (userBookmark) => userBookmark.bookmarkID == selectedBookmarkID,
    )
    renderBookmarks(bookmarkToRender)
  }
}

function verifyTitle(title) {
  if (title.value.length > 3) {
    return true
  }
  alert('Title length should be more than 3.')
}

function verifyUrl(url) {
  if (!/https?:\/\/\S+/.test(url.value)) {
    alert('URL should start from http:// or https://.')
  }
  if (/\s+/.test(url.value)) {
    alert("URL couldn't contain spaces.")
  }
  return true
}

function verifyDescription(description) {
  if (description.value.length > 10) {
    return true
  }
  alert('Description length should be more than 10 symbols.')
}

function init() {
  renderUserSelect()
  const initUser = document.querySelector('#user_selector')
  renderBookmarks(getData(initUser.value))
  setupUserSelect()
  setupBookmarkAddForm()
  renderSharedBookmarkFromURL()
}

init()
