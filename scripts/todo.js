"use strict";
isLogin();
// Define the Task class
class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}
// Initialize the todoArr array
const todoArr = getFromStorage("todoList")
  ? JSON.parse(getFromStorage("todoList"))
  : [];
const inputTask = document.getElementById("input-task");
const addBtn = document.getElementById("btn-add");
const taskListContainer = document.getElementById("todo-list");
const currentUser = getCurrentUser();

/**
 *
 * @param taskInput string
 * @return {boolean}
 */
function isExistTag(taskInput) {
  return todoArr.some(
    (task) => task.task === taskInput && task.owner === currentUser
  );
}
/**
 * validate data
 * @param task string
 * @return {boolean}
 */
function validateData(task) {
  if (task === "") {
    alert("Please input task");
    return false;
  }
  if (isExistTag(task)) {
    alert("Task is Exist");
    return false;
  }
  return true;
}
// Function to add a new task
function addTask() {
  // Get input values from the user
  const taskInput = inputTask.value; // Assuming you have an input field with id 'taskInput'
  const validate = validateData(taskInput);
  if (validate) {
    const owner = getCurrentUser(); // Assuming you have a function to get the current user
    // Create a new Task instance with default isDone value as false
    const newTask = new Task(taskInput, owner, false);
    // Add the new task to todoArr
    todoArr.push(newTask);
    // Update LocalStorage with updated todoArr data (convert it to JSON string)
    saveToStorage("todoList", JSON.stringify(todoArr));
    // Clear the input field after adding the task
    inputTask.value = "";
    displayTasks();
  }
}
/*-------------click add task-----------------*/
addBtn.addEventListener("click", addTask);

/*----------Function to display tasks for the current user------*/
function displayTasks() {
  // Clear previous content in case of re-displaying tasks
  taskListContainer.innerHTML = "";
  if (todoArr.length !== 0) {
    // Filter tasks based on owner matching the current user's username
    const filteredTasks = todoArr.filter((task) => task.owner === currentUser);
    // Loop through filteredTasks and create HTML elements for each task
    filteredTasks.forEach((task) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `${task.task}<span class="close">×</span>`;
      if (task.isDone) {
        listItem.classList.add("checked"); // Add a CSS class for styling completed tasks
      }
      taskListContainer.appendChild(listItem);
    });
  }
}

/*----- Call displayTasks() function when needed, e.g., after adding a new task or when loading the page.----*/
displayTasks();

/*------------------------Remove the task from todoArr---------------------------------*/
taskListContainer.addEventListener("click", function (event) {
  // Check if the clicked element has the desired class name
  if (event.target.classList.contains("close")) {
    const parentElement = event.target.parentNode;
    const taskIndex = Array.prototype.indexOf.call(
      parentElement.parentNode.children,
      parentElement
    );
    const taskText = parentElement.childNodes[0].nodeValue;
    /*--Find the index of the task in todoArr based on its index and owner matching the current user's username--*/
    const taskToDelete = todoArr.findIndex(
      (task) => task.task === taskText && task.owner === currentUser
    );
    if (taskToDelete !== -1) {
      /*------------------------Remove the task from todoArr using splice()---------------------------------*/
      todoArr.splice(taskToDelete, 1);
      /*-------------Update LocalStorage with updated storedData data (convert it to JSON string)-----------*/
      localStorage.setItem("todoList", JSON.stringify(todoArr));
      /*-------------------------------Re-display tasks after deleting--------------------------------------*/
      displayTasks();
    }
  }
});
/*------------------------Toggle the isDone property of the task-----------------------*/
taskListContainer.addEventListener("click", function (event) {
  if (event.target.nodeName === "LI") {
    const liElement = event.target;
    const taskText = liElement.childNodes[0].nodeValue;
    const currentUser = getCurrentUser();
    /*--Find the task in todoArr based on its index and owner matching the current user's username--*/
    const taskToUpdate = todoArr.find(
      (task) => task.task === taskText && task.owner === currentUser
    );
    if (taskToUpdate !== -1) {
      /*------------------------Toggle the isDone property of the found task-----------------------*/
      taskToUpdate.isDone = !taskToUpdate.isDone;
      /*--------Update LocalStorage with updated todoArr data (convert it to JSON string)----------*/
      localStorage.setItem("todoList", JSON.stringify(todoArr));
      /*----------------Re-display tasks after updating completion status--------------------------*/
      displayTasks();
    }
  }
});
