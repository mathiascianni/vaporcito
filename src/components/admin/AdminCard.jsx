import { Title, Button } from "../_index";
import { db, storage } from "../../config/config.firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { deleteObject, ref } from "firebase/storage";

const AdminCard = ({ data: game }) => {
    const deleteGame = async (id) => {
        const gameDoc = doc(db, "games", id);
        try {
            await deleteDoc(gameDoc);
            await deleteObject(ref(storage, game.imgUrl));
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <img src={game.imgUrl} alt={game.title} />
            <div className="bg-light text-dark rounded-md p-4">
                <Title type="h3">{game.title}</Title>
                <p>{game.desc}</p>
                <p>${game.price}</p>


                <Link to={`/admin/edit-game/${game.id}`} state={{ imgUrl: game.imgUrl }}>Editar</Link>
                <Button action={() => deleteGame(game.id)}>Eliminar</Button>
            </div>
        </div>
    );
}

export default AdminCard;
