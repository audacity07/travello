
let card_number_input = document.querySelector(".card-number-input")
    let card_number_box = document.querySelector(".card-number-box")
    let card_holder_input = document.querySelector(".card-holder-input")
    let card_holder_name = document.querySelector(".card-holder-name")
    let month_input = document.querySelector(".month-input")
    let exp_month = document.querySelector(".exp-month")
    let year_input = document.querySelector(".year-input")
    let exp_year = document.querySelector(".exp-year")
    let cvv_input = document.querySelector(".cvv-input")
    let cvv_box = document.querySelector(".cvv-box")
    let front = document.querySelector(".front")
    let back = document.querySelector(".back")
    let form = document.querySelector("#form")

    
    card_number_input.oninput = () => {
        card_number_box.innerText = card_number_input.value
    }

    card_holder_input.oninput = () => {
        card_holder_name.innerText = card_holder_input.value
    }
    
    month_input.oninput = () => {
        exp_month.innerText = month_input.value
    }
    
    cvv_input.oninput = () => {
        cvv_box.innerText =  cvv_input.value
    }
    
    year_input.oninput = () => {
        exp_year.innerText =  year_input.value
    }
    
    
    cvv_input.onmouseenter = () => {
        front.style.transform = "perspective(1000px) rotateY(-180deg)";
        back.style.transform = "perspective(1000px) rotateY(0deg)";
    }
  
    cvv_input.onmouseleave = () => {
        front.style.transform = "perspective(1000px) rotateY(0deg)";
        back.style.transform = "perspective(1000px) rotateY(180deg)";
    }


    form.addEventListener("submit",(e)=>{
        e.preventDefault()
        if(card_number_input.value.length < 14){
            alert("Please fill correct card number")
        }
        else if(card_holder_input.value===""){
            alert("Please fill card holder name")
        }
        else if (month_input.value===""){
            alert("Please fill expiry month")
        }
        else if (year_input.value===""){
            alert("Please fill expiry year")
        }
        else if (cvv_input.value.length < 4){
            alert("Please fill correct cvv number")
        }
        else {
            alert("Your payment is succesfully done!");
        }
        // alert("Your payment is succesfully done!")
    })