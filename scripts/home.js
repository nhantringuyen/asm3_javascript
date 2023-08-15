"use strict";
/*--------------------variable for element ---------------*/
const loginModal = document.getElementById("login-modal");
const mainContent = document.getElementById("main-content");
const welcomeMessage = document.getElementById("welcome-message");

/*--- Define variable logout Button---*/
const logoutBtn = document.getElementById("btn-logout");

document.addEventListener("DOMContentLoaded", function () {
  // If user is logged in, show main content
  if (storedUser) {
    /*--------------------current user object-----------------*/
    const user = userArr.find((u) => u.username === storedUser.username);
    welcomeMessage.innerText = `Welcome ${user.firstName}`;
    loginModal.style.display = "none";
    mainContent.style.display = "block";
  }
  // Otherwise, display the login modal
  else {
    loginModal.style.display = "block";
    mainContent.style.display = "none";
  }
});
// Process event click Logout
logoutBtn.addEventListener("click", function () {
  // Delete current User from LocalStorage
  localStorage.removeItem("currentUser");
  // Redirect to Login page
  window.location.href = "../pages/login.html";
});
