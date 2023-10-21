import useGames from "../hooks/useGames";
import { Card, LoaderOrContent } from "./_index"

const CardsContainer = () => {
    const { games, loading } = useGames();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 container mx-auto">
            {
                <LoaderOrContent loading={loading} Component={Card} iterable={games} />
            }
        </div>
    );
}

export default CardsContainer;
