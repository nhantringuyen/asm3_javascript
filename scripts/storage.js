"use strict";
/***
 * sava data to storage
 * @param key string
 * @param value json
 * */
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}
/***
 * get data from storage
 * @param key string
 * @param defaults string
 * */
function getFromStorage(key, defaults) {
  return localStorage.getItem(key) ?? defaults;
}
/**
 *  check value input is empty
 * @param value string
 * @return {boolean}
 */
function isEmpty(value) {
  return value.trim() === "";
}

/**
 *
 * @param userData object
 * @return {User}
 */
function parseUser(userData) {
  const user = new User(
    userData.firstName,
    userData.lastName,
    userData.username,
    userData.password,
    userData.newsPerPage,
    userData.newsCategory
  );
  return user;
}
const KEY = "USER_ARRAY";
const users = getFromStorage(KEY) ? JSON.parse(getFromStorage(KEY)) : [];
const userArr = users.map((user) => parseUser(user));
const storedUser = getFromStorage("currentUser")
  ? JSON.parse(getFromStorage("currentUser"))
  : "";

/*--------------check user is login------------------- */
function isLogin() {
  if (storedUser === "") {
    alert("Please login or register.");
    window.location.href = "../index.html";
  }
}
/*--------------Function to get current user------------------- */
function getCurrentUser() {
  return storedUser.username;
}
