import { Container } from "@mui/system";
import { Typography, Select, InputLabel, MenuItem, FormControl } from '@mui/material';
import GameList from '../components/GameList';

//Hooks
import { useEffect } from 'react';
import useFetch from '../hooks/useFetch';


const ProductsView = () => {

    //Traer los datos de la api
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=alphabetical`;
    const [{ response, error, isLoading }, doFetch] = useFetch(url);
    useEffect(() => {
        doFetch();
    }, [doFetch]);

    return (
        <Container maxWidth="xl">
            <Typography variant="h1" sx={{ fontSize: "2rem", textTransform: "uppercase", my: "2rem" }} className="fontTitle">Todos los juegos</Typography>
            <FormControl variant="standard" sx={{ mb: "2rem", minWidth: {xs: '100%', md: 260 }}} color="secondary">
                <InputLabel id="filter">Filtrar por</InputLabel>
                <Select labelId="filter"  id="selectFilter" label="Filtrar por" autoWidth value="alphabetical">
                    <MenuItem value="alphabetical">Alfabetico</MenuItem>
                    <MenuItem value="release-date">Fecha de salida</MenuItem>
                    <MenuItem value="relevance">Relevancia</MenuItem>
                </Select>
            </FormControl>
            <GameList response={response} ></GameList>
        </Container>
    );
}

export default ProductsView;