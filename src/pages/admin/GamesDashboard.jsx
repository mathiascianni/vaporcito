import useGames from "../../hooks/useGames";
import { AdminCard, LoaderOrContent, ResponsiveLayout } from "../../components/_index";

const GamesDashboard = () => {
    const { games, loading } = useGames();

    return (
        <ResponsiveLayout>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 container mx-auto">
                <LoaderOrContent loading={loading} Component={AdminCard} iterable={games} />
            </div>
        </ResponsiveLayout>
    );
}

export default GamesDashboard;
