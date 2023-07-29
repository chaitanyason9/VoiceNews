import { Card, CardActions, CardActionArea, CardContent, CardMedia, Button, Typography} from '@mui/material';
import "./styles.css"
export default function NewsCard({ article: { description, publishedAt, source, title, url, urlToImage }, ind, activeArticle}){
    return(
        <Card className = {`card + ${activeArticle === ind ? ' active':''}`}>
            <CardActionArea href = {url} target = "_blank">
                <CardMedia className = "media" image = {urlToImage || 'https://st.depositphotos.com/1006899/3776/i/950/depositphotos_37765339-stock-photo-news.jpg'}/>
                <div className = "details">
                    <Typography variant = "body2" color = "textSecondary" component = "p">{( new Date(publishedAt)).toDateString() }</Typography>
                    <Typography variant = "body2" color = "textSecondary" component = "p">{ source.name }</Typography>
                </div>
                <Typography variant = "h5" className="title">{ title }</Typography>
                <CardContent variant = "body2" color = "textSecondary" component = "p">{ description }</CardContent>
            </CardActionArea>
            <CardActions className = "bottom">
                <Button size = "small" color = "primary">Learn more</Button>
                <Typography variant = "h6" color = "textSecondary">{ ind+1 }</Typography>
            </CardActions>
            
        </Card>
    )
}