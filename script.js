const API_KEY = "61ce1547b4864e0d8e185bd68704b31d"
const url = " https://newsapi.org/v2/everything?q="


 async function fetchData(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`)
    const data = await res.json()
    return data 
}
fetchData("all").then(data => renderMain(data.articles))


let mobilemenu = document.querySelector(".mobile")
let menuBtn = document.querySelector(".menuBtn")
let menuBtndisplay = true;

menuBtn.addEventListener("click",()=>{
    mobilemenu.classList.toggle("hidden")
})


//render news
function renderMain(arr){
    let mainHTML = ''
    for(let i = 0 ; i < arr.length ;i++){
        if(arr[i].urlToImage){
        mainHTML += ` <div class="card">
                        <a href=${arr[i].url}>
                        <img src=${arr[i].urlToImage} lazy="loading"/>
                         <h4>${arr[i].title}</h4>
                         <div class="publishbyDate">
                              <p>${arr[i].source.name}</p>
                              <span>•</span>
                              <p>${new Date(arr[i].publishedAt).toLocaleDateString()}</p>
                         </div>
                         <div class="desc">
                           ${arr[i].description} 
                         </div>
                         </a>
                    </div>
        `
        }
    }

    document.querySelector("main").innerHTML = mainHTML
}

const searchBtn = document.getElementById("searchform")
const searchBtnMobile = document.getElementById("searchformMobile")

const searchInputMobile = document.getElementById("searchInputMobile")
const searchInput= document.getElementById("searchInput")

searchBtn.addEventListener("submit",async(e) =>{
    e.preventDefault()
    console.log(searchInput.value)

    const data = await fetchData(searchInput.value)
    renderMain(data.articles)
    

})
searchBtnMobile.addEventListener("submit",async(e) =>{
    e.preventDefault()
    const data = await fetchData(searchInputMobile.value)
    renderMain(data.articles)

})

 async function Search(queary){
    const data = await fetchData(queary)
    renderMain(data.articles)
}

