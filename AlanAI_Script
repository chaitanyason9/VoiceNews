intent('What does this app do?', 'What can I do here?',
      reply('This is a news application'));
// intent('Start', (p) => {
//     p.play({command: 'testcommand'});
// })

const NEWS_API_KEY = '';
let savedArticles = [];
//News by Source
intent('(Give me | tell me | show me) the news (from | by | on | in) $(source* .+)', (p) => {
let NEWS_API_URL = 'https://newsapi.org/v2/top-headlines';

if(p.source.value) {
    p.source.value=p.source.value.toLowerCase().split(" ").join("-");
    NEWS_API_URL = `${NEWS_API_URL}?sources=${p.source.value}&apiKey=${NEWS_API_KEY}`
}

api.request(NEWS_API_URL, {headers: {"user-agent": 'user agent' }}, (error, response, body) => {
    const { totalResults, articles } = JSON.parse(body);
    
    if(totalResults == 0) {
        p.play('Sorry, please try searching for news from a different source');
        return;
    }
    
    savedArticles = articles;
    
    p.play({ command: 'newHeadlines', articles });
    if(p.source.value !== 'bbc-news') p.play(`Here are (latest|recent) ${p.source.value} news.`);
    else p.play(`Here are (latest|recent) ${p.source.value}.`);

    p.play('Would you like me to read the headlines?');
    p.then(confirmation);
});
})
//News by term
intent('whats up with $(term* .+)', (p) => {
let NEWS_API_URL = 'https://newsapi.org/v2/top-headlines';

if(p.term.value) {
    
    NEWS_API_URL = `${NEWS_API_URL}?q=${p.term.value}&apiKey=${NEWS_API_KEY}`
}

api.request(NEWS_API_URL, {headers: {"user-agent": 'user agent' }}, (error, response, body) => {
    const { totalResults, articles } = JSON.parse(body);
    
    if(totalResults == 0) {
        p.play('Sorry, please try searching for different article');
        return;
    }
    
    savedArticles = articles;
    
    p.play({ command: 'newHeadlines', articles });
    p.play(`Here are (latest|recent) articles on ${p.term.value}.`);

    p.play('Would you like me to read the headlines?');
    p.then(confirmation);
});
})

const CATEGORIES = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
const CATEGORIES_INTENT = `${CATEGORIES.map((category) => `${category}~${category}`).join('|')}`;
intent(`(show|what is|tell me|give me|what's|what are|what're|read) (the|) (recent|latest|) news (in|about|on|) $(C~ ${CATEGORIES_INTENT})`,
  `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) `, (p) => {
let NEWS_API_URL = 'https://newsapi.org/v2/top-headlines';

if(p.C.value) {
    
    NEWS_API_URL = `${NEWS_API_URL}?q=${p.C.value}&apiKey=${NEWS_API_KEY}`
}

api.request(NEWS_API_URL, {headers: {"user-agent": 'user agent' }}, (error, response, body) => {
    const { totalResults, articles } = JSON.parse(body);
    
    if(totalResults == 0) {
        p.play('Sorry, please try searching for different category');
        return;
    }
    
    savedArticles = articles;
    
    p.play({ command: 'newHeadlines', articles });
   
    
    if(p.C.value){
         p.play(`Here are (latest|recent) articles on ${p.C.value}.`);
    }else{
         p.play(`Here are (latest|recent) news`);
    }
    p.play('Would you like me to read the headlines?');
    p.then(confirmation);
});
})

//latest news
intent('Give me the latest news', (p) => {
let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${NEWS_API_KEY}`;

api.request(NEWS_API_URL, {headers: {"user-agent": 'user agent' }}, (error, response, body) => {
    const { totalResults, articles } = JSON.parse(body);
    
    if(totalResults == 0) {
        p.play('Sorry, please try searching for different article');
        return;
    }
    
    savedArticles = articles;
    
    p.play({ command: 'newHeadlines', articles });
    p.play(`Here are (latest|recent) news.`);

    p.play('Would you like me to read the headlines?');
    p.then(confirmation);
});
})

//Confirmation
const confirmation = context(() => {
    intent('Yes', async (p)=>{
        for(let i=0;i<savedArticles.length;i++){
            p.play({ command: 'highlight', article: savedArticles[i]});
            p.play(`${savedArticles[i].title}`);
        }
    })
    intent('No',
      reply('Sure, no problem!'));
})

intent('open (the|) (article|) (number|) $(number* (.*))', (p) => {
    if(p.number.value) {
        p.play({ command:'open', number: p.number.value, articles: savedArticles})
    }
})

intent('(go|) back', (p) => {
    p.play('Sure, going back');
    p.play({ command: 'newHeadlines', articles: []})
})
