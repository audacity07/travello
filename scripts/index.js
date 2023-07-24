// code to handle reviews

// JavaScript code for handling reviews and photos
const reviewsData = [
  {
    review: `"Incredible experience! Travello led me to an offbeat trekking destination that left me in awe of nature's beauty. The adventure-packed tour was well-organized and worth every penny."`,
    name: "Grace",
    photoUrl: "./images/LandingPage/review_pic2.png",
  },
  {
    review: `"A perfect blend of adventure and relaxation! I booked a Travello package and enjoyed thrilling water sports followed by a serene beach escape. Unforgettable memories, thanks to Travello!"`,
    name: "Dylan",
    photoUrl: "./images/LandingPage/review_pic3.png",
  },
  {
    review: `"Exhilarating escapade! Travello's jungle safari took us up close to fascinating wildlife. The knowledgeable guides made it an educational journey too. Can't wait to book another tour!"`,
    name: "Gili",
    photoUrl: "./images/LandingPage/review_pic4.png",
  },
  {
    review: `"From heart-racing water sports to peaceful beach getaways, Travello's package had it all. An unforgettable journey filled with excitement and relaxation. I'd book with them again!"`,
    name: "George",
    photoUrl: "./images/LandingPage/review_pic1.png",
  },
];

let currentReviewIndex = 0;
const reviewElement = document.querySelector(
  ".review-container .review-card p"
);
const nameElement = document.querySelector(
  ".review-container .name-container > p"
);
const photoElement = document.querySelector(
  ".review-container .name-container div img"
);

function displayReview(index) {
  reviewElement.textContent = reviewsData[index].review;
  nameElement.textContent = reviewsData[index].name;
  photoElement.src = reviewsData[index].photoUrl;
}

function showNextReview() {
  currentReviewIndex = (currentReviewIndex + 1) % reviewsData.length;
  displayReview(currentReviewIndex);
}

function showPreviousReview() {
  currentReviewIndex =
    (currentReviewIndex - 1 + reviewsData.length) % reviewsData.length;
  displayReview(currentReviewIndex);
}

document
  .querySelector(".left-arrow")
  .addEventListener("click", showPreviousReview);
document
  .querySelector(".right-arrow")
  .addEventListener("click", showNextReview);

// Initial display
displayReview(currentReviewIndex);
let userData;
let user_name;
let space;
let userId = localStorage.getItem("userId");
console.log(userId);
let loginId = localStorage.getItem("loginId");
console.log(loginId);
fetch(`https://travello-login-api.onrender.com/login/${loginId}`)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);
    userData = data;
    // if(data.length > 0) {
    space = userData.name.indexOf(" ");
    if (space == -1) {
      user_name = userData.name;
    } else {
      user_name = userData["name"].slice(0, space);
    }
    document.querySelector(
      "#user-name"
    ).innerText = `HI ${user_name.toUpperCase()}`;
    // console.log("userData.name", userData.name);
    document.querySelector("#user-name").removeAttribute("onclick");
    document.querySelector("#user-name").addEventListener("click", openPopup);
    document.querySelector("#cart-sec").innerText = "MY CART";
    document.querySelector("#cart-sec").removeAttribute("href");
    document.querySelector("#cart-sec").addEventListener("click", function () {
      window.location.href = "cart.html";
    });
    // }
  });

// to handle mobile navigation
const hamburger = document.querySelector(".hamburger");
const bar1 = document.querySelector(".bar1");
const bar2 = document.querySelector(".bar2");
const bar3 = document.querySelector(".bar3");
const mobileNav = document.querySelector(".mobileNav");

hamburger.addEventListener("click", function () {
  bar1.classList.toggle("animateBar1");
  bar2.classList.toggle("animateBar2");
  bar3.classList.toggle("animateBar3");
  mobileNav.classList.toggle("openDrawer");
});

window.addEventListener("resize", function () {
  let inputElement = document.getElementById("myInput");
  if (window.innerWidth <= 499) {
    inputElement.setAttribute("placeholder", "Search");
  } else {
    inputElement.setAttribute("placeholder", "Search for courses");
  }
});

// NISHANT JS ************************

let popup = document.querySelector(".profile");

function openPopup() {
  popup.classList.add("profile-popup");
  popup.style.zIndex = "3";
  document.querySelector(".userName").innerText = userData.name;
  document.querySelector(".userEmail").innerText = userData.email;
}

document.querySelector("#removePopup").addEventListener("click", function () {
  popup.classList.remove("profile-popup");
  popup.style.zIndex = "-1";
});

document.querySelector("#log-out").addEventListener("click", function () {
  console.log(userData.id);

  fetch(`https://travello-login-api.onrender.com/login/${loginId}`, {
    method: "DELETE",
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      localStorage.removeItem("userId");
      localStorage.removeItem("loginId");
    });

  setTimeout(function () {
    window.location.reload();
  }, 1000);
});

let redirectSignUp = document.querySelector("#user-name");

function goToLogin() {
  window.location.href = "login.html";
}

function deleteAcc() {
  fetch(`https://travello-login-api.onrender.com/login/${loginId}`, {
    method: "DELETE",
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
    });

  fetch(`https://users-mock-api.onrender.com/users/${userId}`, {
    method: "DELETE",
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      localStorage.removeItem("userId");
      localStorage.removeItem("loginId");
    });

  setTimeout(function () {
    window.location.reload();
  }, 1000);
}

// NISHANT JS ENDS HERE *************************
