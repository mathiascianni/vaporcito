import { Link } from 'react-router-dom';
import GameCard from '../components/GameCard';
import Grid from '@mui/material/Grid';
import { CircularProgress } from '@mui/material';

const GameList = ({ response, limit = -1 }) => {
    return (
        <Grid container spacing={2}>
            {!response ? <Grid item xs={12} sm={6} md={4} lg={3}><CircularProgress color='secondary' /></Grid> : response.map((game, index) => {
                if (limit > 0) {
                    if (index <= limit) {
                        return (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={index} >
                                <Link to={`/games/${game.id}`} className="linkStyle">
                                    <GameCard title={game.title} image={game.thumbnail} description={game.short_description} genre={game.genre} />
                                </Link>
                            </Grid>
                        );
                    }
                    return;
                } else {
                    return (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index} >
                            <Link to={`/games/${game.id}`} className="linkStyle">
                                <GameCard title={game.title} image={game.thumbnail} description={game.short_description} genre={game.genre} />
                            </Link>
                        </Grid>
                    );
                }
            })}
        </Grid>
    );
}

export default GameList;

