let employees = [];

const employeeList = document.getElementById("employee-list");
const employeeInfo = document.getElementById("employeeInfo");

function loadEmployees() {
  // Try localStorage first
  const stored = JSON.parse(localStorage.getItem("employees"));
  if (stored && stored.length > 0) {
    employees = stored;
    renderEmployees();
  } else {
    // fallback to data.json
    fetch("data.json")
      .then((res) => res.json())
      .then((data) => {
        employees = data;
        renderEmployees();
      })
      .catch((err) => console.error(err));
  }
}

function renderEmployees() {
  employeeList.innerHTML = "";

  employees.forEach((emp) => {
    const div = document.createElement("div");
    div.classList.add("employee-item");

    div.innerHTML = `
      <span onclick="renderSingleEmployee(${emp.id})">
        ${emp.firstName} ${emp.lastName}
      </span>
      <button onclick="deleteEmployee(${emp.id})">❌</button>
    `;
    employeeList.appendChild(div);
  });
}

function renderSingleEmployee(id) {
  const emp = employees.find((e) => e.id === id);
  if (!emp) return;

  employeeInfo.innerHTML = `
    <div class="employee-card">
      <img src="${emp.image || "https://via.placeholder.com/100"}" />
      <p><strong>Name:</strong> ${emp.firstName} ${emp.lastName}</p>
      <p><strong>Email:</strong> ${emp.email}</p>
      <p><strong>Contact:</strong> ${emp.contact}</p>
      <p><strong>DOB:</strong> ${emp.dob}</p>
      <p><strong>Salary:</strong> ${emp.salary}</p>
    </div>
  `;
}

function deleteEmployee(id) {
  employees = employees.filter((emp) => emp.id !== id);
  localStorage.setItem("employees", JSON.stringify(employees));
  renderEmployees();
  employeeInfo.innerHTML = "";
}

// Initialize
document.addEventListener("DOMContentLoaded", loadEmployees);
