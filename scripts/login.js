"use strict";
/*-- Define variable Button --*/
const submitBtn = document.getElementById("btn-submit");
/*-- Define variable input and checkbox --*/
const userName = document.getElementById("input-username");
const password = document.getElementById("input-password");

/*-- If has login then go to home page --*/
if (storedUser !== "") {
    window.location.href = "../index.html";
}

/**
 *
 * @param username string
 * @param password string
 * @return {boolean}
 */
function isUsernameTaken(username,password) {
    return userArr.some((user) => user.username === username && user.password === password);
}

/**
 * validate data
 * @param data object
 * @return {boolean}
 */
function validateData(data) {
    if (
        isEmpty(data.username) ||
        isEmpty(data.password)
    ) {
        alert("Please enter enough Username and Password");
        return false;
    }
    if (userArr.length === 0 || !isUsernameTaken(data.username,data.password)){
        alert('Invalid username or password. Please try again.');
        return false;
    }
    return true;
}

/* --submit form-- */
submitBtn.addEventListener("click", function (e) {
    const currentUser = {
        username:  userName.value,
        password: password.value
    }
    const validate = validateData(currentUser);
    if (validate) {
        // Successful login, save current user information to localStorage
        saveToStorage("currentUser", JSON.stringify(currentUser));
        // Redirect to the Home page
        window.location.href = "../index.html";
    }
});