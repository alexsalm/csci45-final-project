// Retrieve plan from local storage or initialize an empty array
let plan = JSON.parse(localStorage.getItem("plan")) || [];
const planInput = document.getElementById("planInput");
const planList = document.getElementById("planList");
const planCount = document.getElementById("planCount");
const addButton = document.querySelector(".btn");
const deleteButton = document.getElementById("deleteButton");

// Initialize
document.addEventListener("DOMContentLoaded", function () {
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
}

function togglePlan(index) {
    plan[index].disabled = !plan[index].disabled;
    saveToLocalStorage();
    displayPlans();
}

function saveToLocalStorage() {
    localStorage.setItem("plan", JSON.stringify(plan));
}