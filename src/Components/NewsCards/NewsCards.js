import NewsCard from '../NewsCard/NewsCard.js'
import { Grid, Grow, Typography } from '@mui/material';
import './styles1.css'

const infoCards = [
    { color: '#00838f', title: 'Latest News', text: 'Give me the latest news' },
    { color: '#1565c0', title: 'News by Categories', info: 'Business, Entertainment, General, Health, Science, Sports, Technology', text: 'Give me the latest Technology news' },
    { color: '#4527a0', title: 'News by Terms', info: 'Bitcoin, Artificial Technology, Chat-GPT, Russia-Ukraine War...', text: 'What\'s up with Bitcoin' },
    { color: '#283593', title: 'News by Sources', info: 'CNN, Wired, BBC News, Time, IGN, Buzzfeed, ABC News...', text: 'Give me the news from CNN' },
  ];
  
function NewsCards( { totalResults, articles, activeArticle} ){
    if(!articles.length){
        return(
            <Grow in>
                <Grid className = "cardContainer">
                    {infoCards.map((infoCard) => (
                        <Grid item xs = {12} sm = {6} md = {4} lg = {3} className = "infoCard">
                            <div className = "card1" style = {{backgroundColor: infoCard.color}}>
                                <Typography variant = "h6">{infoCard.title}</Typography>
                                {
                                    (infoCard.info) ? 
                                    <Typography variant = "p">
                                        <strong>
                                            {infoCard.title.split(' ')[2]}:
                                        </strong>
                                        <br/>
                                            {infoCard.info}
                                    </Typography>
                                    : null
                                }

                                <Typography variant = "p">
                                    Try Saying:
                                    <br/>
                                {infoCard.text}
                                </Typography>
                                    
                                
                            </div>
                        </Grid>
                    ))}
                </Grid>
            </Grow>
        )
    }
    return(
        <Grow in>
            <Grid className = "container" container alignItems = "stretch" spacing = {3}>
                
                    {articles.map((article, ind) => (
                    <Grid item xs = {12} sm = {6} md = {4} lg = {3} style = {{display: "flex"}}>
                        <NewsCard article = { article } ind = { ind } key = { ind } activeArticle = {activeArticle}/>
                    </Grid>
                    ))}
                
            </Grid>
           
        </Grow>
    )
}
export default NewsCards;