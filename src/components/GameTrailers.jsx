import { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { Box, ImageList, ImageListItem } from '@mui/material';

const GameTrailers = (props) => {
    const url = `https://rawg-video-games-database.p.rapidapi.com/games/${props.game_id}/movies?key=767d3e075bf24c058c4a5c1a63b98ebc`;
    const [{ response, error, isLoading }, doFetch] = useFetch(url);
    useEffect(() => {
        doFetch();
    }, [doFetch]);

    return (

        <ImageList cols={2}>
            {isLoading ? '' : !response ? '' : response.count == 0 ? 'no maidens?' : response.results.map((video, index) => {
                return (<ImageListItem key={index}><Box component="video" src={video['data']['max']} poster={video['preview']} sx={{ width: '100%' }} controls></Box></ImageListItem>)
            })}
        </ImageList >
    );
}

export default GameTrailers;