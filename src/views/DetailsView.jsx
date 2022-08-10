import { useParams } from 'react-router-dom';
import { Container } from '@mui/system';
import { Grid, CircularProgress, Typography } from '@mui/material';
import AllDetailCard from '../components/AllDetailCard';
import GameTrailers from '../components/GameTrailers';
import GameScreenshots from '../components/GameScreenshots';

//Hooks
import { useEffect } from 'react';
import useFetch from '../hooks/useFetch';

const DetailsView = () => {
    const { game_id } = useParams();

    //Traer los datos de la api
    const url = `https://rawg-video-games-database.p.rapidapi.com/games/${game_id}?key=767d3e075bf24c058c4a5c1a63b98ebc`;
    const [{ response, error, isLoading }, doFetch] = useFetch(url);
    useEffect(() => {
        doFetch();
    }, [doFetch]);

    console.log(response)

    return (
        <>
            {isLoading ? (<Grid item xs={12} sm={6} md={4} lg={3}><CircularProgress color='secondary' /></Grid>) : (!response) ? '' :
                <Container maxWidth="xl" sx={{ my: '2rem' }}>

                    <Grid container spacing={6}>
                        <Grid item xs={12} md={4}>
                            <AllDetailCard image={response.background_image} title={response.name} genre={response.genres} description={response.description_raw} game_url={response.website} dev={response.developer} platform={response.platform} date={response.release_date} />
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Typography variant='h2' className='fontTitle' sx={{fontSize:'2rem', mb:'1rem'}}>Game screenshots</Typography>
                            <GameScreenshots game_id={game_id} />
                            <Typography variant='h2' className='fontTitle' sx={{fontSize:'2rem', my:'2rem'}}>Game trailers</Typography>
                            <GameTrailers game_id={game_id} />
                        </Grid>
                    </Grid>
                </Container>
            }
        </>
    )
}

export default DetailsView;