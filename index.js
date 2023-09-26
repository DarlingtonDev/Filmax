if (document.title == "login"){ //Executes the codes in the block if the title is "login"
    let person = {}; // created an empty object for login purpose
    setInterval(function(){  
        const loader = document.querySelector(".loadOne");  // This function supports the animation for the filmax page
        if (loader.style.opacity == 0){
            loader.style.opacity = 1;
        }
    }, 1500)
    
    setTimeout(function(){
        let home = document.querySelector(".homepage");
        
        if (home.style.height == "100vh"){  // This function supports the animation for the filmax page
            home.style.height = "0"
            home.style.visibility = "hidden";
        }
    }, 3000)
    
    let Slidein = document.querySelector(".slidein");
    let Slideout = document.querySelector(".slideout");
    const negativeTransform = "-100%";
    const positiveTransform = "100%";        //This part of the code performs the slidein effect of the login 
    const defaultTransform = "0%";
    Slidein.addEventListener('click', ()=>{
        let loginPage = document.querySelector(".login1");
        let signupPage = document.querySelector(".login2");
            loginPage.style.transform = `translate(${negativeTransform})`;
            signupPage.style.transform = `translate(${negativeTransform})`;
    })
    
    Slideout.addEventListener('click', ()=>{
        let loginPage = document.querySelector(".login1");
        let signupPage = document.querySelector(".login2");  //This part of the code performs the slideout effect
        loginPage.style.transform = `translate(${defaultTransform})`;  
        signupPage.style.transform = `translate(${defaultTransform})`;
    })
/* -----------------------------------------------------------------------------------------------------*/
    document.querySelector(".login-btn").addEventListener('click', () =>{
        const destinationUrl = "http://127.0.0.1:5500/home.html";
        window.location.href = destinationUrl;
    });

    /* ----------------------------------------------------------------------------------------------------- */
function formValidation(){
class users{
        constructor (email, password, conpassword){
            this.email = email;
            this.password = password;
            this.conpassword = conpassword;
        }
}
const email = document.getElementById("createemail");
const password = document.getElementById("createpass");               //This validates the signup form
const conpassword = document.getElementById("conpass");
document.querySelector(".createacctbtn").addEventListener('click', () =>{
    if (email.value == '' || password.value == '' || conpassword.value == ''){
        console.error("empty string");
    }else if(!email.value.includes("@gmail.com")){   
        console.log("Not a valid gmail");
    }else if(password.value != conpassword.value){
        console.log("Both passwords does not match");
    }else{
        person = new users(email.value, password.value, conpassword.value);
        console.log(person);
    }
})

}
formValidation();
}

/* --------------------------------------------------------- home.html ----------------------------------------- */
window.onload = function(){
    document.querySelector(".loadbarforhome").style.display = "none";//| this part of the code terminates the loader
    document.querySelector(".homebody").style.opacity = 1;           //| that is built-in to continue until receivin data 
    function handleFirstResponse(response){    // This is the function that handles the response gotten from the async
        let mostTrendingNum = 0;               // function that fetches all trending movies
        let allTrending = [];
        let mostTrendingImage = [];
        for (let i = 0; i < response.results.length; i++){ // This loop is creating an array of all trending movies
                allTrending[i] = response.results[i];
        }
        for(let i = 0; i < allTrending.length; i++){
            if (allTrending[i].popularity > mostTrendingNum){  //This part of the code loops through the trending movies
                mostTrendingNum = allTrending[i].popularity;   // array and stores the highest trending movie in the
            }                                                  // variable mostTrendingNum
        }

        for (let i = 0; i < allTrending.length; i++){
            if (allTrending[i].popularity == mostTrendingNum){  // This part retrieves the object that is initiated to 
                mostTrendingImage = allTrending[i];             // the most trending movie
            }else{
                continue;
            }
        }
        console.log(mostTrendingImage);
        const imagePath = mostTrendingImage.poster_path;
        const overview = mostTrendingImage.overview;
        let firstParagraph = document.querySelector(".firstParagraph");
        let firstImage = document.querySelector(".firstImage");       // This part of the code displays the trending 
        let trendingFlex = document.querySelector(".trending-flex");  // movies and displays it to the page
       firstImage.src = `https://image.tmdb.org/t/p/w500${imagePath}`;
       firstImage.alt = mostTrendingImage.original_title
       firstParagraph.innerText = overview;
       const results = response.results;
       for (let i = 0; i < results.length; i++){
        if (response.results[i].popularity == mostTrendingNum){
            continue;
        }
        let div = document.createElement("div");
        div.classList.add("trending-box");
        let image = document.createElement("img");
        image.src = `https://image.tmdb.org/t/p/w500${results[i].poster_path}`;
        div.append(image);
        trendingFlex.append(div);
       }
        //console.log(previewId)
        //console.log(allTrending);
    }
    async function fetchTrendingMovies(){
        const options = {                       //This is the async function that fetches trending movies
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODZkM2Q1ZGRjYjMwNGU2Mzg4M2ExMGQ5YTY5MmU1YiIsInN1YiI6IjY1MDc0NWNiOGE4OGIyMDEzY2ZhMWVmMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1LSdKndXpyOiBONS6vWxijlUrUINE5mntqfSp-_cxn8'
            }
          };
    try{
        const response = await fetch('https://api.themoviedb.org/3/trending/all/day?language=en-US', options);
        if(!response.ok){
            throw new Error("Reponse not okay!");
        }
        const data = await response.json();
        handleFirstResponse(data);
    }catch (error){
    console.error(error);
    }
         
    }
    fetchTrendingMovies();
    
    async function fetchAll(){
        let moviesAddedId = [];    // This function fetches all the movies from the discover part in the api
        let i = 0;
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODZkM2Q1ZGRjYjMwNGU2Mzg4M2ExMGQ5YTY5MmU1YiIsInN1YiI6IjY1MDc0NWNiOGE4OGIyMDEzY2ZhMWVmMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1LSdKndXpyOiBONS6vWxijlUrUINE5mntqfSp-_cxn8'
            }
          };
    //array = [20 ..[], 20 ..[], 20 ..[], 20 ..[], 20 ..[], 20 ..[], 20 ..[], 20 ..[], 20 ..[], 20 ..[],];
          try{
            let newArray = [];
            let page = 1;
            for (let i = 0; i < 30; i++){
                const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`, options);
                const data = await response.json();
                newArray[i] = data.results;
                page+= 1;
            }
            //console.log(newArray);
            
            for (let a = 0; a < newArray.length; a++){
                for (let b = 0; b < newArray[a].length; b++){
                    if (newArray[a][b].genre_ids.includes(28) && newArray[a][b].genre_ids.includes(12)){
                        let actionFlex = document.querySelector(".action-adventure-flex");
                        moviesAddedId[i]  = newArray[a][b].id;
                        i++
                        let div = document.createElement("div");
                        div.classList.add("trending-box");
                        let image = document.createElement("img");
                        image.src = `https://image.tmdb.org/t/p/w500${newArray[a][b].poster_path}`;
                        div.append(image);
                        actionFlex.append(div);
                    }else if(newArray[a][b].genre_ids.includes(16))
                    {
                        let animationFlex = document.querySelector(".animation-flex");
                        moviesAddedId[i]  = newArray[a][b].id;
                        i++
                        let div = document.createElement("div");
                        div.classList.add("trending-box");
                        let image = document.createElement("img");
                        image.src = `https://image.tmdb.org/t/p/w500${newArray[a][b].poster_path}`;
                        div.append(image);
                        animationFlex.append(div);
                    }else if(newArray[a][b].genre_ids.includes(35) && newArray[a][b].genre_ids.includes(80))
                    {
                        let crimeFlex = document.querySelector(".crime-flex");
                        moviesAddedId[i]  = newArray[a][b].id;
                        i++;
                        let div = document.createElement("div");
                        div.classList.add("trending-box");
                        let image = document.createElement("img");
                        image.src = `https://image.tmdb.org/t/p/w500${newArray[a][b].poster_path}`;
                        div.append(image);
                        crimeFlex.append(div);
                    }
                    
                }
            }
            console.log(moviesAddedId);
        }catch (error){
                console.log(error);
              }
    }
    fetchAll();
}
