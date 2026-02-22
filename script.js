// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds, getData, setData, clearData } from "./storage.js";

//region prepare
function setupUserSelect() {
  getUserSelect().addEventListener("input", onInputUserSelect);
}
//endregion


//region render
//endregion


//region listeners
function onLoadWindow() {
  setupUserSelect();
}

function onInputUserSelect(event) {
  console.log(event.target.value);
}
//endregion


//region utilities
function getUserSelect() {
  return document.getElementById("user-select");
}
//endregion

window.onload = onLoadWindow();
