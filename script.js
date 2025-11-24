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
    
    addButton.addEventListener("click", addPlan);
    planInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            addPlan();
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
        const trueNorthToEdit = document.createElement("input");

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
}