const API_KEY="3a3b9de78bef4a36a7306d3bf8809dd7";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener('load',()=> fetchNews("India"));

function reload() {
    window.location.reload();
    
}
async function fetchNews(query){
    const res = await fetch(`${url}${query}&apikey=${API_KEY}`);
    const data = await res.json();
    console.log(data);
    binddata(data.articles);
}

function binddata(articles){
    const cardcontainer=document.getElementById("card-container");
    const cardtemplate=document.getElementById("card-template");
     cardcontainer.innerHTML="";
      
     articles.forEach((article) => {
        if(!article.urlToImage) return;
         
        const cardClone=cardtemplate.content.cloneNode(true);
        fillDataIncard(cardClone,article);
        cardcontainer.appendChild(cardClone);
     });
}

function fillDataIncard(cardClone,article) {
    const newsImg=cardClone.querySelector('#news-img');
    const newsTitle=cardClone.querySelector('#news-title');
    const newsSource=cardClone.querySelector('#news-source');
    const newsDesc=cardClone.querySelector('#news-desc');
  
    newsImg.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDesc.innerHTML=article.description;
    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone : "Asia/jakarta"
    });
    newsSource.innerHTML=(`${article.source.name}· ${date}`);

    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,"_blank");
    })
}

let currNavItem=null;
function onNavItemClick(id){
  fetchNews(id);
  const navItem= document.getElementById(id);
  currNavItem?.classList.remove("active");
  currNavItem= navItem;
  currNavItem.classList.add("active");
}

const searchButton=document.getElementById("search-button");
const searchText=document.getElementById("serach-text");

searchButton.addEventListener("click" , ()=>{
   const query=searchText.value;
    if(!query) return;
    fetchNews(query);
    currNavItem?.classList.remove("active");
    currNavItem=null;
})