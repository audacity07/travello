let tableBody = document.querySelector(".body-container");
let userData = [];
let baseUrl = `https://users-mock-api.onrender.com/users`;

async function fetchUsersData(val) {
  try {
    let url = baseUrl;
    if (val) {
      url += `?name_like=${val}`;
    }
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    if (data[0].id === 1) {
      displayUsersData(data.slice(1, data.length));
    } else {
      displayUsersData(data);
    }

    // console.log(data.slice(1, data.length));
  } catch (error) {
    console.log(error);
  }
}
fetchUsersData();

function displayUsersData(data) {
  tableBody.innerHTML = null;
  data.forEach(function (ele, ind) {
    let tableRow = document.createElement("tr");
    tableRow.classList.add("table-row");

    let id = document.createElement("td");
    id.innerText = ele.id;
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
    deleteBtn.addEventListener("click", function () {
      deleteUser(ele.id);
    });
    deleteCol.append(deleteBtn);

    tableRow.append(id, name, email, password, editCol, deleteCol);
    tableBody.append(tableRow);
  });
}

// search functionality
let searchTag = document.querySelector("#search-user-data");
searchTag.addEventListener("input", function () {
  fetchUsersData(searchTag.value);
});

// pop up to update user details
let nameTag = document.querySelector("#name");
let emailTag = document.querySelector("#email");
let passwordTag = document.querySelector("#password");
let popup = document.querySelector(".main-outer-container .popup");
let closeBtn = document.querySelector(
  ".main-outer-container .popup .close-btn"
);
let confirmBtn = document.querySelector(".confirm-btn");
let userId = null;

// Add an event listener to the table body to listen for button clicks
tableBody.addEventListener("click", (event) => {
  const target = event.target; // The clicked element (button)

  // Check if the clicked element is the "Edit" button
  if (target.classList.contains("edit-button")) {
    // Get the parent row (tr) of the clicked button
    const row = target.closest("tr");

    // Get the data from each cell in the row
    const id = row.cells[0].innerText;
    let name = row.cells[1].innerText;
    let email = row.cells[2].innerText;
    let password = row.cells[3].innerText;
    userId = id;

    nameTag.value = name;
    emailTag.value = email;
    passwordTag.value = password;

    // testing popup code
    popup.classList.add("active");
  }
});

// handling confirm button
confirmBtn.addEventListener("click", function () {
  // Get the data from the input fields
  const id = userId;
  const name = nameTag.value;
  const email = emailTag.value;
  const password = passwordTag.value;

  patchUserData(id, name, email, password);

  // Close the popup after the data is sent
  popup.classList.remove("active");
});

// close button
closeBtn.addEventListener("click", function () {
  popup.classList.remove("active");
  userId = null;
});

async function patchUserData(id, name, email, password) {
  try {
    await fetch(`${baseUrl}/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    });
    fetchUsersData();
  } catch (error) {
    console.log(error);
  }
}

async function deleteUser(id) {
  try {
    await fetch(`${baseUrl}/${id}`, {
      method: "DELETE",
    });
    fetchUsersData();
  } catch (error) {
    console.log(error);
  }
}

// end of pop up to update user details

// -------------------------------
// pop up code add new user

// pop up to update user details
let newUsernameTag = document.querySelector(".popup-new-user #name");
let newUserEmailTag = document.querySelector(".popup-new-user #email");
let newUserPasswordTag = document.querySelector(".popup-new-user #password");
let newUserPopUp = document.querySelector(
  ".main-outer-container .popup-new-user"
);
let newUserCloseBtn = document.querySelector(
  ".main-outer-container .popup-new-user .close-btn"
);
let newUserConfirmBtn = document.querySelector(
  ".main-outer-container .popup-new-user .confirm-btn"
);
let newUserTag = document.querySelector(".inside-button");

newUserTag.addEventListener("click", function () {
  newUserPopUp.classList.add("active");
});

// handling confirm button
newUserConfirmBtn.addEventListener("click", function () {
  // Get the data from the input fields
  const name = newUsernameTag.value;
  const email = newUserEmailTag.value;
  const password = newUserPasswordTag.value;

  postNewUserData(name, email, password);

  // Close the popup after the data is sent
  newUserPopUp.classList.remove("active");
});

// close button
newUserCloseBtn.addEventListener("click", function () {
  newUserPopUp.classList.remove("active");
  userId = null;
});

async function postNewUserData(name, email, password) {
  try {
    await fetch(`${baseUrl}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    });
    fetchUsersData();
  } catch (error) {
    console.log(error);
  }
}
// end of pop up code add new user
// -------------------------------
