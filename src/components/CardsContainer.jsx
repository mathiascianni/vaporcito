import { db } from "../config/config.firebase";
import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { Card } from "./_index"

const CardsContainer = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const gamesCollectionRef = collection(db, "games");

    useEffect(() => {
        const getGames = async () => {
            try {
                const data = await getDocs(gamesCollectionRef);
                // ...doc.data() recupera todos los datos del documento y se le añade la propiedad id porque esta no viene por defecto
                const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                setGames(filteredData);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        getGames();
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 container mx-auto">
            {
                loading ? <p>Cargando...</p> :
                games.length > 0 ? games.map((game) => (
                    <Card key={game.id} game={game} />
                )) : <p>No hay juegos</p>
            }
        </div>
    );
}

export default CardsContainer;
