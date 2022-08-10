import { Card, CardContent, CardMedia, Typography, Button, Link } from '@mui/material';

const AllDetailCard = (props) => {
    return (
        <Card>
            <CardMedia component="img" image={props.image} alt={props.title} />
            <CardContent sx={{ height: '100%' }}>
                <Typography variant="h1" className='fontTitle' sx={{fontSize:'1.5rem'}}>{props.title}</Typography>
                {!props.genre ? '' : (props.genre).map((gen, index) => {
                    return <Typography key={index} variant="body2" sx={{ mb: '1rem', display:'inline', mr:'.5rem' }} color="secondary">{gen['name']}</Typography>
                })}
                <Link variant="body2" color="secondary" href={props.game_url} target="_blank" underline="none" sx={{display:'block', mt:'1rem'}}>View game website</Link>
                <Typography variant="body1" sx={{ mb: '1rem' }}>{props.platform}</Typography>
                <Typography variant="body2" sx={{ mb: '1rem' }}>{props.description}</Typography>
                <Typography variant="body2" sx={{ mb: '1rem' }}>{props.dev}</Typography>
                <Button variant='contained' color='secondary' fullWidth>Mark as favorite</Button>
            </CardContent>
        </Card>
    );
}

export default AllDetailCard;