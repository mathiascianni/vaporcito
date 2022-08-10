import { Link } from 'react-router-dom';
import GameCard from '../components/GameCard';
import Grid from '@mui/material/Grid';
import { CircularProgress } from '@mui/material';

const GameList = ({ response }) => {
    console.log(response)
    return (
        <Grid container spacing={2}>
            {!response ? <Grid item xs={12} sm={6} md={4} lg={3}><CircularProgress color='secondary' /></Grid> : response.map((game, index) => {
                return (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index} >
                        <Link to={`/games/${game.id}`} className="linkStyle">
                            <GameCard title={game.name} image={game.background_image} genre={game.genres[0]['name']} />
                        </Link>
                    </Grid>
                )
            })}
        </Grid>
    );
}

export default GameList;

