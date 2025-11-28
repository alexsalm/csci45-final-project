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

let attentionOption = JSON.parse(localStorage.getItem("attentionOption")) || [];
const attentionList = document.getElementById("attentionList");

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

    attentionList.addEventListener("change", (event) => {
        let currentOption = event.target.value;
        attentionOption.push({
            text: currentOption,
            disabled: false,
        });
        saveToLocalStorage();
        console.log(currentOption);

        const submitButton = document.querySelector(".submit");
        const option0 = document.getElementById("no-option-selected").selected;
        const option1 = document.getElementById("true-north-option").selected;
        const option2 = document.getElementById("other-obligations").selected;
        const option3 = document.getElementById("distraction-option").selected;
        const option4 = document.getElementById("not-sure-option").selected;

        if (submitButton) {
            submitButton.addEventListener("click", function() {
                if (option0 === true) {
                    document.getElementById("attention-message").innerHTML = 
                    "<h4>No option selected</h4>"; 
                }
                if (option1 === true) {
                    document.getElementById("attention-message").innerHTML = 
                    "<h4>You're locked in</h4>";
                }
                if (option2 === true) {
                    document.getElementById("attention-message").innerHTML =
                    "<h4>Are these obligations serving you?</h4>";
                }
                if (option3 === true) {
                    document.getElementById("attention-message").innerHTML =
                    "<h4>You need to remove these distractions</h4>";
                }
                if (option4 === true) {
                    document.getElementById("attention-message").innerHTML =
                    "<h4>Okay, we need to reassess what we are doing</h4>";
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

const pressAttention = document.getElementById("attention");
const cancelButton = document.getElementById("cancel");
const attentionDialog = document.getElementById("attentionDialog");

if (pressAttention) {
    function openCheck(attentionDialog) {
        if (attentionDialog.open) {
            console.log("Attention dialog open");
        } else {
            console.log("Attention dialog closed");
        }
    }

    pressAttention.addEventListener("click", (event) => {
        event.preventDefault();
        attentionDialog.showModal();
        openCheck(attentionDialog);
    });

    cancelButton.addEventListener("click", (event) => {
        event.preventDefault();
        attentionDialog.closest("noAttentionCheck");
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
    localStorage.setItem("attentionOption", JSON.stringify(attentionOption));
}