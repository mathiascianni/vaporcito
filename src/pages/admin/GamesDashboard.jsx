import useGames from "../../hooks/useGames";
import { AdminCard, LoaderOrContent, ResponsiveLayout, Title } from "../../components/_index";
import { Link } from "react-router-dom";

const GamesDashboard = () => {
    const { games, loading } = useGames();

    return (
        <ResponsiveLayout>
            <Title type="h1">Panel de administracion de Juegos</Title>
            <Link to="/admin/create-game" className="inline-block bg-primary p-1 px-4 rounded-full hover:bg-primary-dark transition mb-8">Crear un nuevo juego</Link>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 container mx-auto">
                <LoaderOrContent loading={loading} Component={AdminCard} iterable={games} />
            </div>
        </ResponsiveLayout>
    );
}

export default GamesDashboard;
