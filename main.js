// const API_KEY = `656de5ef24e441f2919d26d1342916ee`;

let newList = [];
const getLatestNews = async () => {
    // const url = new URL(`https://noona-times-24-07-09.netlify.app/top-headlines?country=${COUNTRY}&apiKey=${API_KEY}`);
    // let url = `https://noona-times-24-07-09.netlify.app/top-headlines`
    
    const url = new URL(
        `https://third-js-project-sw-copy.netlify.app/top-headlines?country=us`
    ); 

    const response = await fetch(url)
    const data = await response.json();
    newList = data.articles;
    render()
    console.log("ddd", newList);
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
    const newsHTML = newList.map(
        (news) => `<div class="row news">
        <div class="col-lg-4">
            <img class="news-img-size" src="${news.urlToImage}"||"${otherImage}"/>
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
    document.getElementById('news-board').innerHTML=newsHTML;
}

getLatestNews();