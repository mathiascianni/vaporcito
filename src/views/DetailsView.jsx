import { useParams } from 'react-router-dom';
import { Container } from '@mui/system';
import { Typography, Grid, CircularProgress } from '@mui/material';

//Hooks
import { useEffect } from 'react';
import useFetch from '../hooks/useFetch';

const DetailsView = () => {
    const { game_id } = useParams();

    //Traer los datos de la api
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${game_id}`;
    const [{response, error, isLoading}, doFetch] = useFetch(url);
    useEffect(() => {
        doFetch();
    }, [doFetch]);


    return (
        !response ? <Container maxWidth="xl"><Grid item xs={12} sm={6} md={4} lg={3}><CircularProgress color='secondary' /></Grid></Container> : (
            <Container maxWidth="xl">               
                <img src={response.thumbnail} alt={response.title}/> {/* Insertar un MUI de img | box o similar */}
                <Typography variant="h1" sx={{ fontSize: "2rem", textTransform: "uppercase", my: "2rem" }} className="fontTitle"></Typography>
                <Typography variant="body1">{response.description}</Typography>
                <Typography variant="body1" component="a" href={response.game_url} target="_blank">Descargalo acá </Typography>
            </Container>
        )
    )
}

export default DetailsView;