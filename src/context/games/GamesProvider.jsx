import { useState } from "react";
import { db } from "../../config/config.firebase";
import { GamesContext } from "./GamesContext";
import { getDocs, orderBy, collection, query, limit } from "firebase/firestore";

const GamesProvider = ({ children }) => {
    const gamesCollectionRef = collection(db, "games");
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);

    /**
     * Retrieves all games from the database and updates the games state.
     *
     * @return {Promise<void>} Resolves when the games state has been updated.
     */
    const getAllGames = async () => {
        const querySnapshot = await getDocs(gamesCollectionRef);
        const updatedGames = [];
        querySnapshot.forEach((doc) => {
            updatedGames.push({ ...doc.data(), id: doc.id });
        });
        setGames(updatedGames);
        setLoading(false);
    };

    const getLimitedGames = async (lim) => {
        const q = query(gamesCollectionRef, limit(lim));
        const querySnapshot = await getDocs(q);
        const updatedGames = [];
        querySnapshot.forEach((doc) => {
            updatedGames.push({ ...doc.data(), id: doc.id });
        });
        setGames(updatedGames);
        setLoading(false);
    }

    const value = {
        games,
        loading,
        getAllGames,
        getLimitedGames
    };

    return (
        <GamesContext.Provider
            value={value}>
            {children}
        </GamesContext.Provider>
    );
};

export default GamesProvider;