let tableBody = document.querySelector(".body-container");
let userData = [];
let baseUrl = `https://users-mock-api.onrender.com/users`;

async function fetchData() {
  try {
    let response = await fetch(baseUrl);
    let data = await response.json();
    console.log(data);
    displayData(data.slice(1, data.length));
    // console.log(data.slice(1, data.length));
  } catch (error) {
    console.log(error);
  }
}
// fetchData();

function displayData(data) {
  tableBody.innerHTML = null;
  data.forEach(function (ele, ind) {
    let tableRow = document.createElement("tr");
    tableRow.classList.add("table-row");

    let name = document.createElement("td");
    name.innerText = ele.name;
    let email = document.createElement("td");
    email.innerText = ele.email;
    let password = document.createElement("td");
    password.innerText = ele.password;
    let editCol = document.createElement("td");
    let editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.classList.add("edit-button");
    editCol.append(editBtn);
    let deleteCol = document.createElement("td");
    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.classList.add("delete-button");
    deleteCol.append(deleteBtn);

    tableRow.append(name, email, password, editCol, deleteCol);
    tableBody.append(tableRow);
  });
}
