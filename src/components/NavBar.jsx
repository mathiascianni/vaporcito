import { AppBar, Button, Toolbar, Typography, IconButton, Badge, Tooltip, Box, Container } from "@mui/material";
import GamesIcon from '@mui/icons-material/Games';
import GradeIcon from '@mui/icons-material/Grade';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Link to="/" className="linkStyle"><Typography variant="body1" className="logo menuItem" ><GamesIcon /> Vaporcito</Typography></Link>
                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'end', gap: '.5rem' }} component="nav">
                        <Link to="/" className="linkStyle"><Button variant="text" className="menuItem" >Home</Button></Link>
                        <Link to="/games" className="linkStyle"><Button variant="text" className="menuItem" >Games</Button></Link>
                        <IconButton variant="text" className="menuItem" aria-label="cart"><Badge badgeContent={5} max={99} color="secondary"><Tooltip title="Mis Favoritos"><GradeIcon /></Tooltip></Badge></IconButton>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default NavBar;