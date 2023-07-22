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

fetch(`https://travello-login-api.onrender.com/login`).then((res) => {
  return res.json();
}).then((data) => {
  console.log(data);
  if(data.length > 0) {
    document.querySelector("#user-name").innerText = `HI ${(data[0].name).toUpperCase()}`;
  }
})