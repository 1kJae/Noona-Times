// const API_KEY = `656de5ef24e441f2919d26d1342916ee`;

let news = [];
const getLatestNews = async () => {
    // const url = new URL(`https://noona-times-24-07-09.netlify.app/top-headlines?country=${COUNTRY}&apiKey=${API_KEY}`);
    // let url = `https://noona-times-24-07-09.netlify.app/top-headlines`
    
    const url = new URL(
        `https://third-js-project-sw-copy.netlify.app/top-headlines?country=us`
    ); 

    const response = await fetch(url)
    const data = await response.json();
    news = data.articles;
    console.log("ddd", news);
} 

getLatestNews();