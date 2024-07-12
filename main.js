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

const getNews = async () => { 
  try{
    const response = await fetch(url)
    const data = await response.json()
    if (response.status === 200) {
      if(data.articles.length === 0) {
        throw new Error("no result for this search");
      }
      newsList = data.articles
      render()
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
  url = new URL(`https://third-js-project-sw-copy.netlify.app/top-headlines?country=us&q=${keyWord}`)
  getNews()
}

const getLatestNews = async () => {
  // const url = new URL(`https://noona-times-24-07-09.netlify.app/top-headlines?country=${COUNTRY}&apiKey=${API_KEY}`);
  // let url = `https://noona-times-24-07-09.netlify.app/top-headlines`
    
  url = new URL(
    `https://third-js-project-sw-copy.netlify.app/top-headlines?country=us`
  ); 
  getNews();
} 

const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  url = new URL(`https://third-js-project-sw-copy.netlify.app/top-headlines?country=us&category=${category}`)
  getNews();
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

getLatestNews();

// 에러 핸들링 1
// let weight = 29
// try{
  // 소스코드를 쓴다.
  // 이 안에서 에러가 발생하면
  // noona

  // if (weight < 30) {
  //   throw new Error ("당신은 너무 말랐어") 에러를 강제로 발생
  // 에러가 발생되는 순간 아래 코드는 발생 안 되고 바로 catch로 내려감.
  // }
// } catch(error) {
  // console.log("내가 잡은 에러는", error.message)
  // catch가 에러를 잡아준다.
// }