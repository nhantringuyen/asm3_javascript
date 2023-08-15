"use strict";
/*-- Define variable Button --*/
const submitBtn = document.getElementById("btn-submit");
/*-- Define variable input and checkbox --*/
const firstName = document.getElementById("input-firstname");
const lastName = document.getElementById("input-lastname");
const userName = document.getElementById("input-username");
const password = document.getElementById("input-password");
const passwordConfirm = document.getElementById("input-password-confirm");

/*-- If has login then go to home page --*/
if (storedUser !== "") {
  window.location.href = "../index.html";
}
/**
 *
 * @param username string
 * @return {boolean}
 */
function isUsernameTaken(username) {
  return userArr.some((user) => user.username === username);
}
/**
 * validate data
 * @param data object
 * @param confirmPassword string
 * @return {boolean}
 */
function validateData(data, confirmPassword) {
  if (
    isEmpty(data.firstName) ||
    isEmpty(data.lastName) ||
    isEmpty(data.username) ||
    isEmpty(data.password) ||
    isEmpty(confirmPassword)
  ) {
    alert("Please input full field.");
    return false;
  }

  if (isUsernameTaken(data.username)) {
    alert("Username already exists.");
    return false;
  }

  if (data.password !== confirmPassword) {
    alert("Password and confirm password do not match.");
    return false;
  }

  if (data.password.length <= 8) {
    alert("Password must be at least 8 characters.");
    return false;
  }
  return true;
}


/* --submit form-- */
submitBtn.addEventListener("click", function (e) {
  const user = new User(
    firstName.value,
    lastName.value,
    userName.value,
    password.value
  );
  const validate = validateData(user, passwordConfirm.value);
  if (validate) {
    userArr.push(user);
    saveToStorage(KEY, JSON.stringify(userArr));
    window.location.href = "../pages/login.html";
  }
});
