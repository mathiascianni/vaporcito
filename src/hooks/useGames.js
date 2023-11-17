import { db } from "../config/config.firebase";
import { useEffect, useState } from "react";
import { collection, onSnapshot, limit } from "firebase/firestore";

const useGames = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const gamesCollectionRef = collection(db, "games");

    useEffect(() => {
        const unsubscribe = onSnapshot(gamesCollectionRef, (querySnapshot) => {
            const updatedGames = [];
            querySnapshot.forEach((doc) => {
                updatedGames.push({ ...doc.data(), id: doc.id });
            });
            setGames(updatedGames);
            setLoading(false);
        });

        return () => {
            // Detener la suscripción cuando el componente se desmonte
            unsubscribe();
        };
    }, []);

    return {
        games,
        loading,
    };
}

export default useGames;