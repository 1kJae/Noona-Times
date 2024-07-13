// const API_KEY = `656de5ef24e441f2919d26d1342916ee`;

let newsList = [];
const menus = document.querySelectorAll(".menus button")
menus.forEach(menu=>menu.addEventListener("click", (event)=>getNewsByCategory(event)))

const sideMenus = document.querySelectorAll(".side-menu-list button")
sideMenus.forEach(sideMenus=>sideMenus.addEventListener("click", (event)=>getNewsByCategory(event)))

let searchInput = document.getElementById("search-input");
searchInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    getNewsByKeyword();
  }
});

let url = new URL(`https://third-js-project-sw-copy.netlify.app/top-headlines?country=us`)

let totalResults = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;

const getNews = async () => { 
  try{
    url.searchParams.set("page", page) // -> &page = page
    url.searchParams.set("pageSize", pageSize)
    const response = await fetch(url)
    
    const data = await response.json()
    if (response.status === 200) {
      if(data.articles.length === 0) {
        throw new Error("no result for this search");
      }
      newsList = data.articles;
      totalResults = data.totalResults
      render()
      paginationRender()
    }
    else {
      throw new Error(data.message)
    }
  } catch(error) {
    errorRender(error.message)
  }
}

const getNewsByKeyword = async () => {
  let keyWord = document.getElementById("search-input").value
  url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=us&q=${keyWord}`)
  await getNews()
}

const getLatestNews = async () => {
  // const url = new URL(`https://noona-times-24-07-09.netlify.app/top-headlines?country=${COUNTRY}&apiKey=${API_KEY}`);
  // let url = `https://noona-times-24-07-09.netlify.app/top-headlines`
    
  url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=us`
  ); 
  await getNews();
} 

const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=us&category=${category}`)
  await getNews();
}

const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
};
  
  const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
};

const openSearchBox = () => {
  let inputArea = document.getElementById("input-area");
  if (inputArea.style.display === "inline") {
    inputArea.style.display = "none";
  } else {
    inputArea.style.display = "inline";
  }
};

const otherImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"
const render = () => {
    const newsHTML = newsList.map(
        (news) => `<div class="row news">
        <div class="col-lg-4">
            <img class="news-img-size" src="${news.urlToImage || otherImage}"/>
        </div>
        <div class="col-lg-8">
            <h2>${news.title}</h2>
            <p>${
              news.description == null || news.description == ""
                ? "내용없음"
                : news.description.length > 200
                ? news.description.substring(0, 200) + "..."
                : news.description
            }</p>
            <div>${news.rights || "no source"}${moment(news.published_date).fromNow()}</div>
        </div>
    </div>`
    ).join('');

    document.getElementById('news-board').innerHTML = newsHTML;
}

const errorRender = (errorMessage) => {
  const errorHTML = `<div class="alert alert-danger" role="alert">
  ${errorMessage}
  </div>`;

  document.getElementById("news-board").innerHTML=errorHTML
}

const paginationRender = () => {
  const totalPages = Math.ceil(totalResults / pageSize)
  const pageGroup = Math.ceil(page / groupSize);
  let lastPage = pageGroup * groupSize;

  if(lastPage > totalPages) {
    lastPage = totalPages
  }
  const firstPage = lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);

  let paginationHTML = ''
  
  if(page < 1 || page >= 2) {
    paginationHTML += `<li class="page-item" onclick="moveToPage(${1})">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&lt;&lt;</span>
        </a>
      </li>`
    paginationHTML += `<li class="page-item" onclick="minusToPage()">
      <a class="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&lt;</span>
      </a>
    </li>`
  }

  for (let i = firstPage; i <= lastPage; i++) {
    paginationHTML += `<li class="page-item ${i == page ? "active" : ""}" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`;
  }
  
  if (page > 20 || page <= 19) {
    paginationHTML += `<li class="page-item" onclick="plusToPage()">
    <a class="page-link" href="#" aria-label="Previous">
      <span aria-hidden="true">&gt;</span>
    </a>
    </li>` 
    paginationHTML += `<li class="page-item" onclick="moveToPage(${20})">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&gt;&gt;</span>
        </a>
      </li>`
  }
  document.querySelector(".pagination").innerHTML = paginationHTML
}
 
const plusToPage = () => {
  page++;
  getNews()
}
const minusToPage = () => {
  page--;
  getNews()
}

const moveToPage = (pageNum) => {
  page = pageNum;
  getNews()
};

getLatestNews();