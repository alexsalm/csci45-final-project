// Retrieve plan from local storage or initialize an empty array
let trueNorth = JSON.parse(localStorage.getItem("trueNorth")) || [];
const trueNorthInput = document.getElementById("true-north-input");
const headerButton = document.querySelector(".header-btn");


let plan = JSON.parse(localStorage.getItem("plan")) || [];
const planInput = document.getElementById("planInput");
const planList = document.getElementById("planList");
const planCount = document.getElementById("planCount");
const addButton = document.querySelector(".btn");
const deleteButton = document.getElementById("deleteButton");

let feedbackOption = JSON.parse(localStorage.getItem("feedbackOption")) || [];
const feedbackList = document.getElementById("feedbackList");

// Initialize
document.addEventListener("DOMContentLoaded", function () {
    headerButton.addEventListener("click", addTrueNorth);
    trueNorthInput.addEventListener('keydown', function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            addTrueNorth();
        }
    });
    displayTrueNorth();
    
    addButton.addEventListener("click", function () {
        let checkAlignment = prompt("Does this move you closer to your true north?");

        if (checkAlignment === "Yes" || checkAlignment === "yes") {
            addPlan();
            document.getElementById("not-aligned-message").innerHTML = "<h4></h4";
        }

        if (checkAlignment === "No" || checkAlignment === "no") {
            document.getElementById("not-aligned-message").innerHTML = 
            "<h4>this is not in alignment with your true north</h4>";
        }
    });

    feedbackList.addEventListener("change", (event) => {
        let currentOption = event.target.value;
        feedbackOption.push({
            text: currentOption,
            disabled: false,
        });
        saveToLocalStorage();
        console.log(currentOption);

        const submitButton = document.querySelector(".submit");
        const option0 = document.getElementById("no-option-selected").selected;
        const option1 = document.getElementById("needs-work").selected;
        const option2 = document.getElementById("very-helpful").selected;
        const option3 = document.getElementById("did-not-help").selected;
        const option4 = document.getElementById("not-sure-option").selected;

        if (submitButton) {
            submitButton.addEventListener("click", function() {
                if (option0 === true) {
                    document.getElementById("feedback-message").innerHTML = 
                    "<h4>No option selected</h4>"; 
                }
                if (option1 === true) {
                    document.getElementById("feedback-message").innerHTML = 
                    "<h4>Thanks for the feedback!</h4>";
                }
                if (option2 === true) {
                    document.getElementById("feedback-message").innerHTML =
                    "<h4>Thanks for the feedback!</h4>";
                }
                if (option3 === true) {
                    document.getElementById("feedback-message").innerHTML =
                    "<h4>Thanks for the feedback!</h4>";
                }
                if (option4 === true) {
                    document.getElementById("feedback-message").innerHTML =
                    "<h4>Thanks for the feedback!</h4>";
                }
                console.log("Submit button pressed");
            });
        }
    });

    planInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
        
            let checkAlignment = prompt("Does this move you closer to your true north?");

            if (checkAlignment === "Yes" || checkAlignment === "yes") {
                addPlan();
                document.getElementById("not-aligned-message").innerHTML = 
                "<h4></h4>";
            }

            if (checkAlignment === "No" || checkAlignment === "no") {
                document.getElementById("not-aligned-message").innerHTML = 
                "<h4>this is not in alignment with your True North</h4>";
            }
        }
    });
    deleteButton.addEventListener("click", deleteAllPlans);
    displayPlans();
});

function addTrueNorth() {
    const newTrueNorth = trueNorthInput.value.trim();
    if (newTrueNorth !== "") {
        trueNorth.push({
            text: newTrueNorth,
            disabled: false,
        });
        saveToLocalStorage();
        trueNorthInput.value = "";
        displayTrueNorth();
    }
}

function displayTrueNorth() {
    const userTrueNorth = document.getElementById("true-north-declaration");
    if (trueNorth.length > 0) {
        userTrueNorth.innerHTML = trueNorth[0].text;
        editTrueNorth();
    }
    else {
        userTrueNorth.innerHTML = "";
    }
    function editTrueNorth() {
        const existingTrueNorth = trueNorth[0].text;
        if (existingTrueNorth) {
            document.getElementById("true-north-input").disabled = true;
        }
        
        const trueNorthToEdit = document.createElement("input");
        trueNorthToEdit.setAttribute("id", "users-answer");

        trueNorthToEdit.value = existingTrueNorth;
        userTrueNorth.replaceWith(trueNorthToEdit);
        trueNorthToEdit.focus();

        trueNorthToEdit.addEventListener("blur", function () {
            const updatedTrueNorth = trueNorthToEdit.value.trim();
            if (updatedTrueNorth) {
                trueNorth[0].text = updatedTrueNorth;
                saveToLocalStorage();
            }
        });
    }
}

function addPlan() {
    const newPlan = planInput.value.trim();
    if (newPlan !== "") {
        plan.push({
            text: newPlan,
            disabled: false,
        });
        saveToLocalStorage();
        planInput.value = "";
        displayPlans();
    }
}

function deleteAllPlans() {
    plan = [];
    saveToLocalStorage();
    displayPlans();
}

function displayPlans() {
    planList.innerHTML = "";
    plan.forEach((item, index) => {
        const p = document.createElement("p");
        p.innerHTML = `
            <div class="plan-container">
                <input type="checkbox" class="plan-checkbox" id="input-${index}" 
                ${item.disabled ? "checked" : ""
                }>
                <p id="plan-${index}" class="${item.disabled ? "disabled" : ""}"
                onclick ="editPlan(${index})">${item.text}
                </p>
            </div>
        `;
        p.querySelector(".plan-checkbox").addEventListener("change", () =>
            togglePlan(index)
        );
        planList.appendChild(p);
    });
    planCount.textContent = plan.length;
}

const clarityArray = [
    "I will focus on only one learning resource (The Odin Project, freeCodeCamp, Codecademy), and complete it",
    "I will dedicate 1-2 hours per day to learn by doing, not just following some tutorial",
    "I will pick one programming language (JavaScript, Python, C++) and stick with it",
    "I will avoid YouTube doom scrolling at all costs",
    "Maintain a clean workspace that will allow me to focus",
    "Write down the following day's programming goals the night before",
    "I will cut out noise surrounding AI replacing jobs",
    "I will keep a long term horizon",
    "Remind oneself to stay patient, but persistent in this career transistion",
    "Get adequate sleep and regular exercise",
    "Never quit",
    "I will show up everyday, and at a minimum program for 30 minutes ",
    "I will be my own biggest fan throughout this journey",
    "Learning to program is an iterative process, not a linear one"
];

const generateExample = document.querySelector(".generateExample");

generateExample.addEventListener("click", function () {
    const random1 = clarityArray[(Math.floor(Math.random() * (clarityArray.length)))];
    const exampleText = document.getElementById("exampleText");
    exampleText.innerHTML = random1;
    console.log(random1);
});

const getFeedback = document.getElementById("feedback");
const cancelButton = document.getElementById("cancel");
const feedbackDialog = document.getElementById("feedbackDialog");

if (getFeedback) {
    function openCheck(feedbackDialog) {
        if (feedbackDialog.open) {
            console.log("Feedback dialog open");
        } else {
            console.log("Feedback dialog closed");
        }
    }

    getFeedback.addEventListener("click", (event) => {
        event.preventDefault();
        feedbackDialog.showModal();
        openCheck(feedbackDialog);
    });

    cancelButton.addEventListener("click", (event) => {
        event.preventDefault();
        feedbackDialog.close("noFeedbackCheck");
        openCheck(attentionDialog);
    });
}

function editPlan(index) {
    const planItem = document.getElementById(`plan-${index}`);
    const existingText = plan[index].text;
    const inputElement = document.createElement("input");

    inputElement.value = existingText;
    planItem.replaceWith(inputElement);
    inputElement.focus();

    inputElement.addEventListener("blur", function () {
        const updatedText = inputElement.value.trim();
        if (updatedText) {
            plan[index].text = updatedText;
            saveToLocalStorage();
        }
        displayPlans();
    });

    inputElement.addEventListener('keyup', function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            inputElement.blur();
        }
    });
}

function togglePlan(index) {
    plan[index].disabled = !plan[index].disabled;
    saveToLocalStorage();
    displayPlans();
}

function saveToLocalStorage() {
    localStorage.setItem("plan", JSON.stringify(plan));
    localStorage.setItem("trueNorth", JSON.stringify(trueNorth));
    localStorage.setItem("feedbackOption", JSON.stringify(feedbackOption));
}