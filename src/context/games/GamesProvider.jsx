import { useState } from "react";
import { db, storage } from "../../config/config.firebase";
import { GamesContext } from "./GamesContext";
import { getDocs, orderBy, collection, query, limit, deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

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

    const deleteGame = async (game) => {
        const gameDoc = doc(db, "games", game.id);
        await deleteDoc(gameDoc);

        try {
            //Delete banner
            await deleteObject(ref(storage, `${game.imgUrl}`));
            
            //Delete cover
            await deleteObject(ref(storage, `${game.coverUrl}`));

            //Delete screenshots
            for (const screenshot of game.media) {
                await deleteObject(ref(storage, `${screenshot}`));
            }

        } catch (error) {
            console.error(error);
        }
    }

    const value = {
        games,
        loading,
        getAllGames,
        getLimitedGames,
        deleteGame
    };

    return (
        <GamesContext.Provider
            value={value}>
            {children}
        </GamesContext.Provider>
    );
};

export default GamesProvider;