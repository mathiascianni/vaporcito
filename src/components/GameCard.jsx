import { useState } from 'react';
import { Card, CardContent, CardActionArea, CardMedia, Typography, Grow } from '@mui/material';

const GameCard = (props) => {
    return (
        <Card sx={{ height: '100%' }}>
            <CardActionArea sx={{ height: '100%' }}>
                <CardMedia component="img" image={props.image} alt={props.title} sx={{height:191}} />
                <CardContent sx={{ height: '100%' }}>
                    <Typography variant="h5" className='fontTitle'>{props.title}</Typography>
                    <Typography variant="body1" color="secondary">{props.genre}</Typography>
                    <Typography variant="body2">{props.description}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default GameCard;