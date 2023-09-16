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

