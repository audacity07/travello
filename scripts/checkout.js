//-----------------hemanth changes start----js------>
let userName = document.querySelector(".userName");
let userAmount = document.querySelector(".userTotalAmount");
let loginId = localStorage.getItem("loginId");
let api = `https://travello-login-api.onrender.com/login`;
async function getUserData(url) {
  try {
    let res = await fetch(url);
    let data = await res.json();
    console.log(data);
    data.forEach((item) => {
      console.log(item.boughtPackages);
      userName.innerText = "Hi " + item.boughtPackages[0];
      +"..........";
      userAmount.innerText = "Total =Rs " + item.boughtPackages[1] + "/-";
    });
  } catch (error) {
    console.log(error);
  }
}
getUserData(`${api}`);
//-------hemanth changes--end---------------------
let card_number_input = document.querySelector(".card-number-input");
let card_number_box = document.querySelector(".card-number-box");
let card_holder_input = document.querySelector(".card-holder-input");
let card_holder_name = document.querySelector(".card-holder-name");
let month_input = document.querySelector(".month-input");
let exp_month = document.querySelector(".exp-month");
let year_input = document.querySelector(".year-input");
let exp_year = document.querySelector(".exp-year");
let cvv_input = document.querySelector(".cvv-input");
let cvv_box = document.querySelector(".cvv-box");
let front = document.querySelector(".front");
let back = document.querySelector(".back");
let form = document.querySelector("#form");

card_number_input.oninput = () => {
  card_number_box.innerText = card_number_input.value;
};
card_holder_input.oninput = () => {
  card_holder_name.innerText = card_holder_input.value;
};

month_input.oninput = () => {
  exp_month.innerText = month_input.value;
};

cvv_input.oninput = () => {
  cvv_box.innerText = cvv_input.value;
};

year_input.oninput = () => {
  exp_year.innerText = year_input.value;
};

cvv_input.onmouseenter = () => {
  front.style.transform = "perspective(1000px) rotateY(-180deg)";
  back.style.transform = "perspective(1000px) rotateY(0deg)";
};

cvv_input.onmouseleave = () => {
  front.style.transform = "perspective(1000px) rotateY(0deg)";
  back.style.transform = "perspective(1000px) rotateY(180deg)";
};
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    card_number_input.value.length < 16 ||
    card_number_input.value.length > 16
  ) {
    alert("Please fill correct card number");
  } else if (card_holder_input.value === "") {
    alert("Please fill card holder name");
  } else if (month_input.value === "") {
    alert("Please fill expiry month");
  } else if (year_input.value === "") {
    alert("Please fill expiry year");
  } else if (cvv_input.value.length < 3) {
    alert("Please fill correct cvv number");
  } else {
    // let submit = document.querySelector("#submit-btn");
    let pay = document.querySelector(".payment-success");
    // submit.addEventListener("click", function() {
    document.querySelector(".container").style.filter = "blur(8px)";
    // document.querySelector("#container").style.filter = "blur(8px)";
    document.querySelector(".custom-loader").style.zIndex = "2";

    setTimeout(() => {
      pay.classList.add("payment-success-popup");
      pay.zIndex = "4";
      let sec = 5;
      let timer = document.querySelector("#timer");
      setInterval(function () {
        timer.innerText = `You Will be Redirected to Home Page in ${sec}`;
        sec--;
        if (sec == -1) {
          window.location.href = "index.html";
        }
      }, 1000);
    }, 3000);
    // })
  }
});
