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
        let allTrendingTrack = 0;
        let mostTrendingImage = [];
        let cast = [];
        for (let i  = 0; i < response.length; i++){
            for (let j = 0; j < response[i].length; j++){       // This loop is creating an array of all trending movies
                if (response[i][j].media_type == 'tv'){
                    continue;
                }
                allTrending[allTrendingTrack] = response[i][j];
                allTrendingTrack++;
            }
        }
        for (let i = 0; i < allTrending.length; i++){
                const options = {
                    method: 'GET',
                    headers: {
                      accept: 'application/json',
                      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODZkM2Q1ZGRjYjMwNGU2Mzg4M2ExMGQ5YTY5MmU1YiIsInN1YiI6IjY1MDc0NWNiOGE4OGIyMDEzY2ZhMWVmMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1LSdKndXpyOiBONS6vWxijlUrUINE5mntqfSp-_cxn8'
                    }
                  };
                  
                      fetch(`https://api.themoviedb.org/3/movie/${allTrending[i].id}/credits?language=en-US`, options)
                      .then(response => response.json())
                      .then(data => {
                        for (let j = 0; j < 5; j++){
                            cast[i] = data.cast;
                        }
                        })
                      .catch(err => console.log(err));
        }
         console.log(cast);
        //console.log(allTrending)
        
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
       
        const imagePath = mostTrendingImage.poster_path;
        const overview = mostTrendingImage.overview;
        let firstParagraph = document.querySelector(".firstParagraph");
        let firstImage = document.querySelector(".firstImage");       // This part of the code displays the trending 
        let trendingFlex = document.querySelector(".trending-flex");  // movies and displays it to the page
       firstImage.src = `https://image.tmdb.org/t/p/w500${imagePath}`;
       firstImage.alt = mostTrendingImage.original_title
       firstParagraph.innerText = overview;
       let categoryHead = document.querySelector(".category-head");
       let header4 = document.createElement("h4");
       header4.innerText = "Trending Movies";
       categoryHead.append(header4);
       for (let i = 0; i < allTrending.length; i++){
        if (allTrending[i].popularity == mostTrendingNum){
            continue;
        }
        let div = document.createElement("div");
        div.addEventListener('click', () =>{
            /* Movie details part */
            let prologDiv = document.createElement("div");
            let prologHead = document.createElement("h3");
            let prologBody = document.createElement("p");
            prologDiv.classList.add("prologDiv");
            prologHead.innerText = "movie overview";
            prologBody.innerText = allTrending[i].overview;
            prologDiv.append(prologHead);
            prologDiv.append(prologBody);
            let buttonDiv = document.createElement("div");
            buttonDiv.classList.add("btndiv");
            let btn = document.createElement("button");
            btn.innerText = "Play now";
            buttonDiv.append(btn);
            let iconOne = document.createElement("li");
            let iconTwo = document.createElement("li");
            let iconDivs = document.createElement("div")
            iconDivs.classList.add("icondivs");
            iconDivs.append(iconOne);
            iconDivs.append(iconTwo);
            iconOne.classList.add("fa-solid");
            iconOne.classList.add("fa-plus");
            iconTwo.classList.add("fa-solid");
            iconTwo.classList.add("fa-download");
            let movieTitle = allTrending[i].title;
            let titleDiv = document.createElement("div");
            titleDiv.classList.add("titlediv");
            let titleP = document.createElement("h4");
            titleP.innerText = movieTitle;
            titleDiv.append(titleP);
            titleDiv.append(iconDivs);
            let footer = document.querySelector(".footerImg");
            let realFooter = document.querySelector("footer");
            let checkIfChildIsPresent = realFooter.children[1].childElementCount
            let trendingbackdrop = allTrending[i].backdrop_path;
            let trendingImageSec = document.createElement("img");
            let trendingPreviewText = document.querySelector(".paragraphText");
            if (checkIfChildIsPresent <= 0){
            let p = document.createElement("p");
            p.innerText = "preview";
            trendingPreviewText.append(p); 
            trendingImageSec.src = `https://image.tmdb.org/t/p/w500${trendingbackdrop}`;
            footer.append(trendingImageSec);
            footer.append(titleDiv);
            footer.append(buttonDiv);
            footer.append(prologDiv);
            }else if (checkIfChildIsPresent >= 1){
            let p = document.createElement("p");
            p.innerText = "preview";
            trendingImageSec.src = `https://image.tmdb.org/t/p/w500${trendingbackdrop}`;
            footer.replaceChild(trendingImageSec, realFooter.children[1].childNodes[1]);
            footer.replaceChild(titleDiv, footer.children[1]);
            footer.replaceChild(buttonDiv, footer.children[2]);
            footer.replaceChild(prologDiv, footer.children[3]);
            //console.log(footer.children[3])
            }
            
            realFooter.style.height = "100vh";
        })
        div.classList.add("trending-box");
        let image = document.createElement("img");
        image.src = `https://image.tmdb.org/t/p/w500${allTrending[i].poster_path}`;
        div.append(image);
        trendingFlex.append(div);
       }
        //console.log(previewId)
        //console.log(allTrending);
    }
    async function fetchTrendingMovies(){
        let page = 1;
        let trendingMovies = [];
        const options = {                       //This is the async function that fetches trending movies
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODZkM2Q1ZGRjYjMwNGU2Mzg4M2ExMGQ5YTY5MmU1YiIsInN1YiI6IjY1MDc0NWNiOGE4OGIyMDEzY2ZhMWVmMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1LSdKndXpyOiBONS6vWxijlUrUINE5mntqfSp-_cxn8'
            }
          };
    try{
        for (let i = 0; i < 3; i++){
        const response = await fetch(`https://api.themoviedb.org/3/trending/all/day?language=en-US&page=${page}`, options);
        if(!response.ok){
            throw new Error("Reponse not okay!");
        }
        const data = await response.json();
        trendingMovies[i] = data.results;
        page++;
        }
        handleFirstResponse(trendingMovies);
        //console.log(trendingMovies);
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
            let actionAdv = document.querySelector(".action-adv");
            let kidsAmine = document.querySelector(".kids-animation");
            let crimeComedy = document.querySelector(".crime-comedyy");
            let onlyAdventure = document.querySelector(".adventure");
            let actualFooter = document.querySelector("footer");
            let footer = document.querySelector(".footerImg");
            let headerFourCrime = document.createElement("h4");
            headerFourCrime.innerText = "crime and comedy";
            crimeComedy.append(headerFourCrime);
            let headerFourAnime = document.createElement("h4");
            headerFourAnime.innerText = "kids and animation";
            kidsAmine.append(headerFourAnime);
            let headerFour = document.createElement("h4");
            headerFour.innerText = "get in on action"
            actionAdv.append(headerFour);
            let headerFourAdventure = document.createElement("h4");
            headerFourAdventure.innerText = "only adventure";
            onlyAdventure.append(headerFourAdventure);
            for (let a = 0; a < newArray.length; a++){
                for (let b = 0; b < newArray[a].length; b++){
    if (newArray[a][b].genre_ids.includes(28) && !newArray[a][b].genre_ids.includes(12) && !newArray[a][b].genre_ids.includes(16)){
                        let actionFlex = document.querySelector(".action-adventure-flex");
                        moviesAddedId[i]  = newArray[a][b].id;
                        i++;
                        let div = document.createElement("div");
                        div.classList.add("trending-box");
                        div.addEventListener('click', () =>{
                            let trendingPreviewText = document.querySelector(".paragraphText");
                            let divPoster = newArray[a][b].backdrop_path;
                            let movieTitle = newArray[a][b].title;
                            let titleDiv = document.createElement("div");
                            titleDiv.classList.add("titlediv");
                            let titleP = document.createElement("h4");
                            titleP.innerText = movieTitle;
                            titleDiv.append(titleP);
                            let backdropImg = document.createElement("img");
                            backdropImg.src = `https://image.tmdb.org/t/p/w500${divPoster}`;
                            let checkIfChildIsPresent = actualFooter.children[1].childElementCount;
                            if (checkIfChildIsPresent <= 0){
                            footer.append(backdropImg);
                            footer.append(titleDiv);
                            console.log(movieTitle);
                            let p = document.createElement("p");
                            p.innerText = "preview";
                            trendingPreviewText.append(p); 
                            }else if (checkIfChildIsPresent >= 1){
                                footer.replaceChild(backdropImg, actualFooter.children[1].childNodes[1]);
                               footer.replaceChild(titleDiv, footer.children[1]);
                                //console.log(footer.children);
                            }
                            let windowHeight = window.innerHeight
                            actualFooter.style.height = `${windowHeight}px`;
                            //console.log(actualFooter.children)
                        });
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
                        div.addEventListener('click', () =>{
                            let movieTitle = newArray[a][b].title;
                            let titleDiv = document.createElement("div");
                            titleDiv.classList.add("titlediv");
                            let titleP = document.createElement("h4");
                            titleP.innerText = movieTitle;
                            titleDiv.append(titleP);
                        let trendingPreviewText = document.querySelector(".paragraphText");
                        kidsImagePosterPath = newArray[a][b].backdrop_path
                        let kidsImage = document.createElement("img");
                        kidsImage.src = `https://image.tmdb.org/t/p/w500${kidsImagePosterPath}`;
                        let checkIfChildIsPresent = actualFooter.children[1].childElementCount
                        if(checkIfChildIsPresent <= 0){
                            footer.append(backdropImg);
                            footer.append(titleDiv);
                            console.log(movieTitle);
                        footer.append(kidsImage);
                        let p = document.createElement("p");
                        p.innerText = "preview";
                        trendingPreviewText.append(p); 
                        }else if (checkIfChildIsPresent >= 1){
                            footer.replaceChild(kidsImage, actualFooter.children[1].childNodes[1]);
                            footer.replaceChild(titleDiv, footer.children[1]);
                        }
                        actualFooter.style.height = "100%";
                        })
                        let image = document.createElement("img");
                        image.src = `https://image.tmdb.org/t/p/w500${newArray[a][b].poster_path}`;
                        div.append(image);
                        animationFlex.append(div);
                    }
                    else if(newArray[a][b].genre_ids.includes(12) && !newArray[a][b].genre_ids.includes(28) && !newArray[a][b].genre_ids.includes(16))
                    {
                        let adventureFlex = document.querySelector(".adventure-flex");
                        moviesAddedId[i]  = newArray[a][b].id;
                        i++
                        let div = document.createElement("div");
                        div.classList.add("trending-box");
                        div.addEventListener('click', () =>{
                            let movieTitle = newArray[a][b].title;
                            let titleDiv = document.createElement("div");
                            titleDiv.classList.add("titlediv");
                            let titleP = document.createElement("h4");
                            titleP.innerText = movieTitle;
                            titleDiv.append(titleP);
                        let trendingPreviewText = document.querySelector(".paragraphText");
                        let adventureImagePosterPath = newArray[a][b].backdrop_path;
                        let adventureImage = document.createElement("img");
                        adventureImage.src = `https://image.tmdb.org/t/p/w500${adventureImagePosterPath}`;
                        let checkIfChildIsPresent = actualFooter.children[1].childElementCount
                        if(checkIfChildIsPresent <= 0){
                        footer.append(adventureImage);
                        footer.append(titleDiv);
                        let p = document.createElement("p");
                        p.innerText = "preview";
                        trendingPreviewText.append(p);
                        }else if (checkIfChildIsPresent >= 1){
                            footer.replaceChild(adventureImage, actualFooter.children[1].childNodes[1]);
                            footer.replaceChild(titleDiv, footer.children[1]);
                        }
                        actualFooter.style.height = "100%";
                        })
                        let image = document.createElement("img");
                        image.src = `https://image.tmdb.org/t/p/w500${newArray[a][b].poster_path}`;
                        div.append(image);
                        adventureFlex.append(div);
                    }
                    else if((newArray[a][b].genre_ids.includes(35) && newArray[a][b].genre_ids.includes(80)) || newArray[a][b].genre_ids.includes(35) || newArray[a][b].genre_ids.includes(80) && !newArray[a][b].genre_ids.includes(28))
                    {
                        let crimeFlex = document.querySelector(".crime-flex");
                        moviesAddedId[i]  = newArray[a][b].id;
                        i++;
                        let div = document.createElement("div");
                        div.addEventListener('click', () =>{
                            let movieTitle = newArray[a][b].title;
                            let titleDiv = document.createElement("div");
                            titleDiv.classList.add("titlediv");
                            let titleP = document.createElement("h4");
                            titleP.innerText = movieTitle;
                            titleDiv.append(titleP);
                        let trendingPreviewText = document.querySelector(".paragraphText");
                        crimeImagePosterPath = newArray[a][b].backdrop_path
                        let crimeImage = document.createElement("img");
                        crimeImage.src = `https://image.tmdb.org/t/p/w500${crimeImagePosterPath}`;
                        let checkIfChildIsPresent = actualFooter.children[1].childElementCount
                        if(checkIfChildIsPresent <= 0){
                        footer.append(crimeImage);
                        footer.append(titleDiv);
                        let p = document.createElement("p");
                        p.innerText = "preview";
                        trendingPreviewText.append(p); 
                        }else if (checkIfChildIsPresent >= 1){
                            footer.replaceChild(crimeImage, actualFooter.children[1].childNodes[1]);
                            footer.replaceChild(titleDiv, footer.children[1]);
                        }
                        actualFooter.style.height = "100%";
                        })
                        div.classList.add("trending-box");
                        let image = document.createElement("img");
                        image.src = `https://image.tmdb.org/t/p/w500${newArray[a][b].poster_path}`;
                        div.append(image);
                        crimeFlex.append(div);
                    }
                    
                }
            }
            //console.log(moviesAddedId);
        }catch (error){
                console.log(error);
              }
    }
    fetchAll();
        let arrowLeft = document.querySelector(".backiconOne");
        arrowLeft.addEventListener('click', () =>{
        let originalFooter = document.querySelector("footer");
        
        //originalFooter.removeChild()
        originalFooter.style.height = "0";
        })
}
