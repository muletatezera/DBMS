// Wait for DOM
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-container");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // stop default form submit reload

    / / Collect form data
    const newEmployee = {
      id: Date.now(),
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      email: document.getElementById("emailAdress").value,
      contact: document.getElementById("contactNumber").value,
      dob: document.getElementById("dateOfBirth").value,
      salary: document.getElementById("salary").value,
      image: document.getElementById("inputImage").value || "",
    };

    // Get existing employees from localStorage
    const stored = JSON.parse(localStorage.getItem("employees")) || [];
    stored.push(newEmployee);
    localStorage.setItem("employees", JSON.stringify(stored));

    // Redirect to index.html AFTER saving
    window.location.href = "index.html";
  });
});
