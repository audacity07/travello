fetch(`http://localhost:3000/destination`).then((res) => {
    return res.json();
}).then((data) => {
    console.log(data);
    setTimeout(function() {
        displayData(data);
    }, 1000)
})

let mainSection = document.querySelector(".card-container")


function displayData(data) {
    mainSection.innerHTML = null;
    data.forEach((ele) => {
        let card = document.createElement("div");
        card.setAttribute("class", "card");
        let location = document.createElement("h2");
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
        let listHead = document.createElement("ul");
        listHead.setAttribute("class", "listHead")
        for(let i=0;i<ele.popularPlaces.length;i++) {
            let list = document.createElement("li");
            list.innerText = ele.popularPlaces[i];
            listHead.appendChild(list);
        }
        let price = document.createElement("h3");
        price.setAttribute("class", "price");
        price.innerText = `Rs. ${ele.price}`;
        let button = document.createElement("button");
        button.setAttribute("class", "btn");
        button.innerText = "Add to Cart"

        imgDiv.append(img)
        card.append(location, tagline, imgDiv, about, listHead, price, button);
        mainSection.append(card)

    })
}

{/* <button class="button-82-pushable" role="button">
  <span class="button-82-shadow"></span>
  <span class="button-82-edge"></span>
  <span class="button-82-front text">
    Button 82
  </span>
</button> */}

// {
//     "id": 1,
//     "location": "Kerala",
//     "tagline": "God's Own Country",
//     "image": "https://static-blog.treebo.com/wp-content/uploads/2018/06/Kerala.jpg",
//     "about": "Kerala is one of the prettiest states, rightfully dubbed Gods Own Country. Here you will find pristine beaches at Kovalam, Muzhappilangad and Varkala. Besides beaches, the state also has a plethora of historical monuments, enthralling waterfalls and some breathtaking hill stations. There are also plenty of ecotourism drives conducted to promote sustainable tourism.",
//     "popularPlaces": [
//         "Alleppey",
//         "Munnar",
//         "Kumarakom"
//     ],
//     "price": "6009"
// }