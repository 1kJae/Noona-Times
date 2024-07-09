const COUNTRY = 'kR';
const API_KEY = '656de5ef24e441f2919d26d1342916ee'
let news = []

const getLatestNews = async () => {
    const url = new URL(`https://newsapi.org/v2/top-headlines?country=${COUNTRY}&apiKey=${API_KEY}`);
    const response = await fetch(url)
    const data = await response.json()
    news = data.articles
    console.log("dddd", news)
};   

getLatestNews();