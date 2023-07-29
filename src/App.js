import React, { useState, useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import Navbar from './Navbar.js'
import NewsCards from './Components/NewsCards/NewsCards.js'
import wordsToNumbers from 'words-to-numbers';
const alanKey = AlanAI_KEY;

function App(){
  const [newsArticles, setnewsArticles] = useState([]);
  const [activeArticle, setactiveArticle] = useState(-1);
  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        if (command === 'newHeadlines') {
          setnewsArticles(articles);
          setactiveArticle(-1);
        }else if(command === 'highlight'){
          setactiveArticle((prevactiveArticle) => prevactiveArticle + 1);
        }else if (command === 'open') {
          const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
          const article = articles[parsedNumber - 1];

          if (parsedNumber > articles.length) {
            alanBtn().playText('Please try that again...');
          } else if (article) {
            window.open(article.url, '_blank');
            alanBtn().playText('Opening...');
          } else {
            alanBtn().playText('Please try that again...');
          }
        }
      },
    });
  }, []);
  return(
    <>
      <Navbar/>
      <NewsCards articles = { newsArticles } activeArticle = {activeArticle}/>
    </>
  )
}

export default App;
