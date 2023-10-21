import { Title, Button } from "../_index";
import { db } from "../../config/config.firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";

const AdminCard = ({ data: game }) => {
    const deleteGame = async (id) => {
        const gameDoc = doc(db, "games", id);
        try {
            await deleteDoc(gameDoc);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="bg-light text-dark rounded-md p-4">
            <Title type="h3">{game.title}</Title>
            <p>{game.desc}</p>
            <p>${game.price}</p>

            <Link to={`/admin/edit-game/${game.id}`}>Editar</Link>
            <Button action={() => deleteGame(game.id)}>Eliminar</Button>
        </div>
    );
}

export default AdminCard;
