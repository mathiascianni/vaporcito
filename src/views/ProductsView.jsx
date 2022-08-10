import { Container } from "@mui/system";
import { Typography, Select, InputLabel, MenuItem, FormControl, CircularProgress, Grid } from '@mui/material';
import GameList from '../components/GameList';

//Hooks
import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';


const ProductsView = () => {
    const [selectValue, setSelectValue] = useState('name');
    
    //Traer los datos de la api
    const url = `https://rawg-video-games-database.p.rapidapi.com/games?key=767d3e075bf24c058c4a5c1a63b98ebc&search=grad&page_size=8`;
    const [{ response, error, isLoading }, doFetch] = useFetch(url);

    const handleChange = event => {
        setSelectValue(event.target.value);
        doFetch();
    }
    
    useEffect(() => {
        doFetch();
    }, [doFetch]);

    return (
        <Container maxWidth="xl">
            <Typography variant="h1" sx={{ fontSize: "2rem", textTransform: "uppercase", my: "2rem" }} className="fontTitle">All games</Typography>
            <FormControl variant="standard" sx={{ mb: "2rem", minWidth: {xs: '100%', md: 260 }}} color="secondary">
                <InputLabel id="filter">Sort By</InputLabel>
                <Select labelId="filter" id="selectFilter" label="Sort By" autoWidth value={selectValue} onChange={handleChange}>
                    <MenuItem value="name">Alphabetical</MenuItem>
                    <MenuItem value="released">Release</MenuItem>
                    <MenuItem value="rating">Relevance</MenuItem>
                </Select>
            </FormControl>
            {isLoading ? (<Grid item xs={12} sm={6} md={4} lg={3}><CircularProgress color='secondary' /></Grid>) : (!response) ? '' : <GameList response={response.results}></GameList>}
        </Container>
    );
}

export default ProductsView;