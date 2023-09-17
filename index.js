const accessKey ="JQyCcynuQQ-GEYUvjV2STSlsriEJM9OcfDpElwVImY0";

const formEl= document.querySelector('form');
const inputEl= document.getElementById('search-input');
const searchResult= document.querySelector('.search-results');
const  showMore=document.querySelector('#show-more-button');

let inputResult = "";
let page = 1;

 async function getSearchResult() {
  inputResult = inputEl.value;
  const url =`http://api.unsplash.com/search/photos?page=${page}&query=${inputResult}&client_id=${accessKey}`

  const response = await fetch(url);
  const data =await response.json();
  const results = data.results;

  if(page === 1){
    searchResult.innerHtml= " ";
  }

  results.map((result)=>{
    const imageWrapper=document.createElement('div');
    imageWrapper.classList.add("search-result");
    const image =document.createElement('img');
    image.src= result.urls.small;
    image.alt= result.alt_description;
    const imageLink=document.createElement('a');
    imageLink.href= result.links.html;
    imageLink.target="_blank";
    imageLink.textContent=result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResult.appendChild(imageWrapper);


  });

  page++;
  if(page > 1){
    showMore.style.display="block"
  }

}

formEl.addEventListener("submit",(event)=>{
  event.preventDefault()
  page=1;
  getSearchResult();

})

showMore.addEventListener("click",()=>{
  getSearchResult();
})