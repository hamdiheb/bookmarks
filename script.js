import {setData,getUserIds,getData} from './storage.js';

function renderUserOptions(){
    const userSelectElement = document.querySelector("#user_selector");
    // usersSelector.removeChild(document.querySelector(".user_selector_option"));
    const userIds = getUserIds();
    userIds.forEach(userId => {
        const option = document.createElement("option");
        option.value = userId;
        option.classList.add("user-selector-option");
        option.textContent = userId;
        userSelectElement.append(option);
    });
}

class Bookmark{
    constructor(title,url,description){
        this.title = title;
        this.url = url;
        this.description = description;
        this.createdAt = new Date();
    }
}

function createBookmarkFromForm(){
    const titleInput = document.querySelector("#fm_bookmark_title");
    const urlInput = document.querySelector("#fm_bookmark_url");
    const descriptionInput = document.querySelector("#fm_bookmark_description");
    return new Bookmark(
        titleInput.value,
        urlInput.value,
        descriptionInput.value
    );
}

function handleAddBookmark(){
    const userSelectElement = document.querySelector("#user_selector");
    const addButton = document.querySelector("#add_btn");

    addButton.addEventListener("click", (event) => {
        event.preventDefault();
        const selectedUserId = userSelectElement.value;
        if(selectedUserId === "All users"){
            console.log("Please Select a user");
        }else{
            const existingBookmarks = getData(selectedUserId);
            const newBookmark = createBookmarkFromForm();
            saveBookmark(existingBookmarks,newBookmark,selectedUserId);
        }
    })
}

function saveBookmark(existingBookmarks,newBookmark,selectedUserId){
    if (!existingBookmarks) {
        if(validateBookmarkForm()){
            console.log("No bookmarks found. Creating new list.");
            setData(selectedUserId, [newBookmark]);
        } else {
            console.log("Your input's can not be empty");
        }
    } else {
        if(validateBookmarkForm()){
            existingBookmarks.unshift(newBookmark);
            setData(selectedUserId, existingBookmarks);
        } else {
            console.log("Your input's can not be empty");
        }
    }
}

function validateBookmarkForm(){
    const titleInput = document.querySelector("#fm_bookmark_title");
    const urlInput = document.querySelector("#fm_bookmark_url");
    const descriptionInput = document.querySelector("#fm_bookmark_description");
    
    if(titleInput.value && urlInput.value && descriptionInput.value){
        return true;
    }else{
        return false;
    }
}

function bookmarkComponent(data){
    const article = document.createElement("article");
    const bookmarkTitle = document.createElement("h1");
    const bookmarkurl = document.createElement("a")
    const bookmarkDescription = document.createElement("p");

    const div = document.createElement("div");
    const date = document.createElement("h3");
    const shareBtn = document.createElement("button");
    const btnlike = document.createElement("button");

    date.innerText = data.createdAt;
    shareBtn.innerText = `Like`;
    btnlike.innerText = "Share";
    bookmarkurl.href = data.url;
    bookmarkurl.innerText = data.title;
    bookmarkDescription.innerText = data.description;

    div.append(date,shareBtn,btnlike);
    bookmarkTitle.append(bookmarkurl);
    article.append(bookmarkTitle,bookmarkDescription,div);
    return article;
}

function renderBookMarks(){
    const userIds = getUserIds();
    const bookmarks = document.querySelector("#bookmarks");
    const userSelector = document.querySelector("#user_selector");

    userSelector.addEventListener("change", (event) => {
        if(event.target.value === "All users"){
            bookmarks.innerHTML = ``;
            userIds.forEach(user => {
                const userBookMarks = getData(user);
                if(userBookMarks!=null){
                    for(let i=0;i<userBookMarks.length;i++){
                    bookmarks.append(bookmarkComponent(userBookMarks[i]));
                }
                }
            });
        }else{
            bookmarks.innerHTML = ``;
            const userBookMarks = getData(event.target.value);
            if(userBookMarks === null){
                console.log("no bookmarks");
            }else {
                for(let i=0;i<userBookMarks.length;i++){
                    bookmarks.append(bookmarkComponent(userBookMarks[i]));
                }
            }
        }
    });
}

function main(){
    renderUserOptions();
    handleAddBookmark();
    renderBookMarks();
}

main();
