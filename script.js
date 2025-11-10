// Retrieve plan from local storage or initialize an empty array
let plan = JSON.parse(localStorage.getItem("plan")) || [];
const planInput = document.getElementById("planInput");
const planList = document.getElementById("planList");
const planCount = document.getElementById("planCount");
const addButton = document.getElementById("btn");
const deleteButton = document.getElementById("deleteButton");

// Initialize
document.addEventListener("DOMContentLoaded", function () {
    addButton.addEventListener("click", addTask);
    planInput.addEventListener('keydown', function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            addTask();
        }
    });
    deleteButton.addEventListener("click", deleteAllTasks);
});

function addTask() {
    // some logic
}

function deleteAllTasks() {
    // some logic
}