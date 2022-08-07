import { Container } from '@mui/system';
import { Typography } from '@mui/material';
import GameList from '../components/GameList';

//Hooks
import { useEffect } from 'react';
import useFetch from '../hooks/useFetch';

const HomeView = () => {
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=relevance`;
    const [{response, error, isLoading}, doFetch] = useFetch(url);

    useEffect(() => {
        doFetch();
    }, [doFetch]);

    return (
        <Container maxWidth="xl">
            <Typography variant="h1" sx={{ fontSize: "2rem", textTransform: "uppercase", my: "2rem" }} className="fontTitle">Juegos destacados</Typography>
            <GameList response={response} limit={7}></GameList>
        </Container>
    );
}

export default HomeView;