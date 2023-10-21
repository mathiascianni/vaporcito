import useGames from "../../hooks/useGames";
import { AdminCard, LoaderOrContent } from "../../components/_index";

const GamesDashboard = () => {
    const { games, loading } = useGames();

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 container mx-auto">
                <LoaderOrContent loading={loading} Component={AdminCard} iterable={games} />
            </div>
        </div>
    );
}

export default GamesDashboard;
