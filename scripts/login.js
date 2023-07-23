
let container = document.getElementById("container");
let overlayCon = document.getElementById("overlayCon");
let overlayBtn = document.getElementById("overlayBtn");
let passwLength = document.getElementsByClassName("length")

overlayBtn.addEventListener("click",()=>{
    container.classList.toggle("right-panel-active");

    overlayBtn.classList.remove("btnScaled");
    window.requestAnimationFrame( ()=>{
        overlayBtn.classList.add("btnScaled");
    })
})

// ********** SIGN UP SCRIPT STARTS HERE

let upName = document.querySelector("#upName");
let upEmail = document.querySelector("#upEmail");
let upPassword = document.querySelector("#upPassword");

let newUserData = `https://users-mock-api.onrender.com/users`;

document.querySelector("#sign-up").addEventListener("click", function() {
    event.preventDefault();
    if(upName.value == "" && upEmail.value == "" && upPassword.value == "") {
        alert("Sorry but we dont allow anonymous user");
        return;
    }
    if(upName.value == "") {
        alert("Looks like <Name> field is Empty! Please Write down your Good name");
        return;
    }
    if(upEmail.value == "") {
        alert("Looks like <Email> field is Empty!");
        return;
    }
    if(upPassword.value == "") {
        alert("Looks like <Password> field is Empty! I dont think you want you account to be public");
        return;
    }
    fetch(`https://users-mock-api.onrender.com/users?email_like=${upEmail.value}`, {
        method : "GET"
    }).then((res) => {
        return res.json();
    }).then((data) => {
        // console.log(data)
        if(data.length==0) {
            console.log("No data found, Creating new user...")
            fetch(newUserData, {
                    method : "POST",
                    headers : {
                        "Content-Type" : "application/json"
                    },
                    body : JSON.stringify({
                        "name" : upName.value,
                        "email" : upEmail.value,
                        "password" : upPassword.value,
                        "packages": []
                    })
            }).then((res) => {
                return res.json();
            }).then((data) => {
                console.log(data);
                // localStorage.removeItem("userId");
                // localStorage.setItem("userId", JSON.stringify(data.id));
            })
            container.classList.toggle("right-panel-active");
            overlayBtn.classList.remove("btnScaled");
            window.requestAnimationFrame( ()=>{
                overlayBtn.classList.add("btnScaled");
            })

        }
        for(let i=0;i<data.length;i++) {
            if(data[i].email == upEmail.value) {
                alert("Same email id found")
            }
            else {
                console.log("Creating new account...")
                fetch(newUserData, {
                    method : "POST",
                    headers : {
                        "Content-Type" : "application/json"
                    },
                    body : JSON.stringify({
                        "name" : upName.value,
                        "email" : upEmail.value,
                        "password" : upPassword.value,
                        "packages": []
                    })
                }).then((res) => {
                    return res.json();
                }).then((data) => {
                    console.log(data);
                    // localStorage.removeItem("userId");
                    // localStorage.setItem("userId", JSON.stringify(data.id));
                })
                
                container.classList.toggle("right-panel-active");
                overlayBtn.classList.remove("btnScaled");
                window.requestAnimationFrame( ()=>{
                overlayBtn.classList.add("btnScaled");
                })
            }
        }
    }).catch((err) => {
        console.log(err)
    })
})



function postData() {
    
    fetch(newUserData, {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            "name" : upName.value,
            "email" : upEmail.value,
            "password" : upPassword.value,
            "packages": []
        })
    }).then((res) => {
        return res.json();
    }).then((data) => {
        console.log(data);
    })

    container.classList.toggle("right-panel-active");
    overlayBtn.classList.remove("btnScaled");
    window.requestAnimationFrame( ()=>{
    overlayBtn.classList.add("btnScaled");
    })
}

// ********** SIGN UP SCRIPT ENDS HERE


// ********** SIGN IN SCRIPT STARTS HERE

let inEmail = document.querySelector("#inEmail");
let inPass = document.querySelector("#inPassword");

document.querySelector("#sign-in").addEventListener("click", function() {
    event.preventDefault();
    if(inEmail.value == "") {
        alert("Enter you Email");
        return;
    }
    if(inPass.value == "") {
        alert("Enter your password");
        return;
    }
    fetch(`https://users-mock-api.onrender.com/users?email_like=${inEmail.value}`, {
        method : "GET"
    }).then((res) => {
        return res.json();
    }).then((dataNew) => {
        if(dataNew.length == 0) {
            // console.log("no dta found");
            alert("No any account found in our database");
            return;
        }
        for(let i=0;i<dataNew.length;i++) {
            if(dataNew[i].email == inEmail.value && dataNew[i].password == inPass.value) {
                console.log("Found a user with same credentials, redirecting to landing page...");
                localStorage.removeItem("userId");
                localStorage.setItem("userId", JSON.stringify(dataNew[i].id))
                fetch(`https://travello-login-api.onrender.com/login`, {
                    method : "POST",
                    headers : {
                        "Content-Type" : "application/json"
                    },
                    body : JSON.stringify({
                        "name" : dataNew[0].name,
                        "email" : dataNew[0].email,
                        "password" : dataNew[0].password,
                        "package" : []
                    })
                }).then((res) => {
                    return res.json();
                }).then((data) => {
                    console.log(data)
                    localStorage.removeItem("loginId");
                    localStorage.setItem("loginId", JSON.stringify(data.id));
                    location.href = "index.html"
                })
                return;
            }
            if(dataNew[i].email == inEmail.value) {
                // console.log("wrong pass");
                alert("Wrong Password");
                return;
            }
        }
    })


    // container.classList.toggle("right-panel-active");
    // overlayBtn.classList.remove("btnScaled");
    // window.requestAnimationFrame( ()=>{
    //     overlayBtn.classList.add("btnScaled");
    // })
})


// ********** SIGN IN SCRIPT ENDS HERE

// ********** ADDITIONAL 

let flag = true;
function slideRight() {
    if(flag) {
        document.querySelector("#up-in").innerText = "SIGN IN";
        flag = false;
    }
    else {
        document.querySelector("#up-in").innerText = "SIGN UP";
        flag = true;
    }

    container.classList.toggle("right-panel-active");
    overlayBtn.classList.remove("btnScaled");
    window.requestAnimationFrame( ()=>{
        overlayBtn.classList.add("btnScaled");
    })
}
