import { GameAdminPanel, ResponsiveLayout, Title } from "../../components/_index";
import { Link } from "react-router-dom";
import { useGames } from "../../context/games/GamesContext";
import { useEffect, useState } from "react";



const GamesDashboard = () => {
    const { games, loading, getAllGames } = useGames();

    useEffect(() => {
        getAllGames();
    }, [])

    return (
        <ResponsiveLayout>
            <Title type="h1">Panel de administracion de Juegos</Title>
            <Link to="/admin/create-game" className="inline-block bg-primary p-1 px-4 rounded-full hover:bg-primary-dark transition mb-8">Crear un nuevo juego</Link>
            <GameAdminPanel games={games} loading={loading}/>
        </ResponsiveLayout>
    );
}

export default GamesDashboard;
