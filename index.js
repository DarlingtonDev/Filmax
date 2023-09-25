if (document.title == "login"){
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
}
/* home.html */
function handleFirstResponse(response){
    const imagePath = response.results[3].poster_path;
    const overview = response.results[3].overview;
    let firstParagraph = document.querySelector(".firstParagraph");
    let firstImage = document.querySelector(".firstImage");
    let trendingFlex = document.querySelector(".trending-flex");
   firstImage.src = `https://image.tmdb.org/t/p/w500${imagePath}`;
   firstImage.alt = response.results[3].original_title
   firstParagraph.innerText = overview;
   const results = response.results;
   for (let i = 0; i < results.length; i++){
    if (i == 3){
        continue;
    }
    let div = document.createElement("div");
    div.classList.add("trending-box");
    let image = document.createElement("img");
    image.src = `https://image.tmdb.org/t/p/w500${results[i].poster_path}`;
    div.append(image);
    trendingFlex.append(div);
   }
}
async function fetchTrendingMovies(){
    const options = {
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
        for (let i = 0; i < 20; i++){
            const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`, options);
            const data = await response.json();
            newArray[i] = data.results;
            page+= 1;
        }
        console.log(newArray);
        
        for (let a = 0; a < newArray.length; a++){
            for (let b = 0; b < newArray[a].length; b++){
                if (newArray[a][b].genre_ids.includes(28) || newArray[a][b].genre_ids.includes(12)){
                    let actionFlex = document.querySelector(".action-adventure-flex");
                    let div = document.createElement("div");
                    div.classList.add("trending-box");
                    let image = document.createElement("img");
                    image.src = `https://image.tmdb.org/t/p/w500${newArray[a][b].poster_path}`;
                    div.append(image);
                    actionFlex.append(div);
                }
                
            }
        }
    }catch (error){
            console.log(error);
          }
}
fetchAll();