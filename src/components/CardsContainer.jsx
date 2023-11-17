import { Card, LoaderOrContent } from "./_index";
import { useGames } from "../context/games/GamesContext";
import { useEffect } from "react";

const CardsContainer = () => {
    const { games, loading, getAllGames } = useGames();
    useEffect(() => {
        getAllGames();
    },[])

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 container mx-auto">
            {games && <LoaderOrContent loading={loading} Component={Card} iterable={games} />}
        </div>
    );
}

export default CardsContainer;
