// Retrieve plan from local storage or initialize an empty array
let plan = JSON.parse(localStorage.getItem("plan")) || [];
const planInput = document.getElementById("planInput");
const planList = document.getElementById("planList");
const planCount = document.getElementById("planCount");
const addButton = document.getElementById("btn");
const deleteButton = document.getElementById("deleteButton");