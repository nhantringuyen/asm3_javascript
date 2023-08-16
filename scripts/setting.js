"use strict";
/*--------------------check login------------------------*/
isLogin();

/*--------------------current user object-----------------*/
const user = userArr.find((u) => u.username === storedUser.username);

/*--------------------variable for element ---------------*/
const newsPerPage = document.getElementById("input-page-size");
const newsCategory = document.getElementById("input-category");
const btnSubmit = document.getElementById("btn-submit");
newsPerPage.value = user.newsPerPage;
newsCategory.value = user.newsCategory;
/**
 * validate data
 * @param perPage string
 * @return {boolean}
 */
function validateData(perPage) {
  if (isNaN(perPage)) {
    alert("Please input number");
    return false;
  }
  return true;
}
/* --submit setting form-- */
btnSubmit.addEventListener("click", function () {
  const perPage = parseInt(newsPerPage.value);
  const category = newsCategory.value;
  const validate = validateData(perPage);
  if (validate) {
    // Update LocalStorage with new settings
    user.updateSettings(perPage, category);
    const index = userArr.findIndex((u) => u.username === storedUser.username);
    userArr[index] = user;
    saveToStorage(KEY, JSON.stringify(userArr));
    alert("Updated setting");
  }
});
