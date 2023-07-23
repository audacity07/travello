// fetch(`https://travelloproject.onrender.com/destination`).then((res) => {
//     return res.json();
// }).then((data) => {
//     console.log(data);
//     setTimeout(function() {
//         displayData(data);
//     }, 1000)
// })


async function getData(url) {
    try {
        let res = await fetch(url);
        let data = await res.json();
        console.log(data);
        setTimeout(function() {
            displayData(data);
        }, 1000)
    } catch(err) {
        console.log(err)
    }
}

getData(`https://travelloproject.onrender.com/destination`)

let mainSection = document.querySelector(".card-container")


function displayData(data) {
    mainSection.innerHTML = null;
    data.forEach((ele) => {
        let card = document.createElement("div");
        card.setAttribute("class", "card");
        let location = document.createElement("h1");
        location.setAttribute("class", "location");
        location.innerText = ele.location;
        let tagline = document.createElement("h3");
        tagline.innerText = ele.tagline;
        tagline.setAttribute("class", "tagline");
        let imgDiv = document.createElement("div");
        imgDiv.setAttribute("class", "imgDiv");
        let img =document.createElement("img");
        img.setAttribute("class", "img");
        img.src = ele.image;
        let about =document.createElement("p");
        about.setAttribute("class", "about");
        about.innerText = ele.about;
        let popo = document.createElement("h2");
        popo.setAttribute("class", "popular")
        popo.innerText = `Popular Places to Visit in ${ele.location}`
        let listHead = document.createElement("ul");
        listHead.setAttribute("class", "listHead")
        for(let i=0;i<ele.popularPlaces.length;i++) {
            let list = document.createElement("li");
            list.innerText = ele.popularPlaces[i];
            listHead.appendChild(list);
        }
        let price = document.createElement("h3");
        price.setAttribute("class", "price");
        price.innerText = `₹ ${ele.price}/-`;
        let button = document.createElement("button");
        button.setAttribute("class", "btn");
        button.innerText = "Add to Cart";
        button.addEventListener("click", function() {
            addToPackage(ele);
        })

        imgDiv.append(img)
        card.append(location, tagline, imgDiv, about, popo, listHead, price, button);
        mainSection.append(card)

    })
}

document.querySelector('#asc_btn').addEventListener("click", function() {
    fetch(`https://travelloproject.onrender.com/destination?_sort=price&_order=asc`).then((res) => {
        return res.json();
    }).then((data) => {
        console.log(data);
        displayData(data);
    })
})

document.querySelector('#desc_btn').addEventListener("click", function() {
    fetch(`https://travelloproject.onrender.com/destination?_sort=price&_order=desc`).then((res) => {
        return res.json();
    }).then((data) => {
        console.log(data);
        displayData(data);
    })
})

let filt = document.querySelector("#filter-btn");

filt.addEventListener("click", function() {
        let minVal = document.querySelector(".min-price");
        let maxVal = document.querySelector(".max-price");
        // `https://travelloproject.onrender.com/destination?price_gte=2000&price_lte=3000`
        fetch(`https://travelloproject.onrender.com/destination?price_gte=${minVal.value}&price_lte=${maxVal.value}`).then((res) => {
            return res.json();
        }).then((data) => {
            console.log(data);
            displayData(data);
        })
})


let write = document.querySelector("#input");

document.querySelector("#input").addEventListener("input", function(){
    temp();
})

function deBounce(func, delay) {
    let timer;

    return function() {
        if(timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(function() {
            func(`https://travelloproject.onrender.com/destination?location_like=${write.value}`)
        }, delay)
    }
}


let temp = deBounce(getData, 2000)


let userUrl = `https://users-mock-api.onrender.com/users`;
let loginId = localStorage.getItem("loginId")

let packageData = [];
let user;
let itemCount = document.querySelector("#item-count");
function addToPackage(ele) {
    user = {
        "package" : packageData
    }

    for(let i=0;i<packageData.length;i++) {
        if(packageData[i].id == ele.id) {
            openDopup();
            return;
        }
    }

    packageData.push(ele);
    console.log(packageData)
    openPopup();
    fetch(`https://travello-login-api.onrender.com/login/${loginId}`, {
        method : "PATCH",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            packages : packageData
        })
      }).then((res) => {
        return res.json();
      }).then((data) => {
        console.log(data);
      })
}

let popup = document.querySelector("#popup");
let dopup = document.querySelector("#dopup");
function openPopup() {
    popup.classList.add("open-popup");
    popup.style.zIndex = "2";
    itemCount.innerText = packageData.length
    itemCount.style.backgroundColor = "green";
    itemCount.style.color = "white";
}

function closePopup() {
    popup.classList.remove("open-popup");
}

function openDopup() {
    dopup.classList.add("open-dopup");
    dopup.style.zIndex = "2";
}

function closedopup() {
    dopup.classList.remove("open-dopup");
}