import { Container } from '@mui/system';
import { Typography, Grid, CircularProgress } from '@mui/material';
import GameList from '../components/GameList';

//Hooks
import { useEffect } from 'react';
import useFetch from '../hooks/useFetch';

const HomeView = () => {
    const url = `https://rawg-video-games-database.p.rapidapi.com/games?key=767d3e075bf24c058c4a5c1a63b98ebc`;
    const [{ response, error, isLoading }, doFetch] = useFetch(url);

    useEffect(() => {
        doFetch();
        console.log(isLoading);
    }, [doFetch]);

    return (
        <Container maxWidth="xl">
            <Typography variant="h1" sx={{ fontSize: "2rem", textTransform: "uppercase", my: "2rem" }} className="fontTitle">Featured games</Typography>
            {isLoading ? (<Grid item xs={12} sm={6} md={4} lg={3}><CircularProgress color='secondary' /></Grid>) : (!response) ? '' : <GameList response={response.results}></GameList>}
        </Container>
    );
}

export default HomeView;