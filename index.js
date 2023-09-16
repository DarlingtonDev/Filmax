setInterval(function(){
    const loader = document.querySelector(".loadOne");
    if (loader.style.opacity == 0){
        loader.style.opacity = 1;
    }
}, 1500)

setTimeout(function(){
    let home = document.querySelector(".homepage");
    
    if (home.style.height == "100vh"){
        home.style.height = "0"
        home.style.visibility = "hidden";
    }
}, 3000)

let Slidein = document.querySelector(".slidein");
let Slideout = document.querySelector(".slideout");
const negativeTransform = "-100%";
const positiveTransform = "100%";
const defaultTransform = "0%";
Slidein.addEventListener('click', ()=>{
    let loginPage = document.querySelector(".login1");
    let signupPage = document.querySelector(".login2");
        loginPage.style.transform = `translate(${negativeTransform})`;
        signupPage.style.transform = `translate(${negativeTransform})`;
})

Slideout.addEventListener('click', ()=>{
    let loginPage = document.querySelector(".login1");
    let signupPage = document.querySelector(".login2");
    loginPage.style.transform = `translate(${defaultTransform})`;
    signupPage.style.transform = `translate(${defaultTransform})`;
})
