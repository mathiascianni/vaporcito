//Components
import { Title, Button, ModalNotification } from "../_index";
import { Link } from "react-router-dom";

//Hooks
import { useState } from "react";

//Firebase
import { db, storage } from "../../config/config.firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

//Icons
import { FiAlertCircle } from "react-icons/fi";

const AdminCard = ({ data: game }) => {
    const [modal, setModal] = useState(false);
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
                <Button action={() => setModal(true)}>Eliminar</Button>
            </div>
            {modal &&
                <ModalNotification
                    title="Confirmar eliminar juego"
                    subtitle={`¿Esta seguro de eliminar el juego ${game.title}?`}
                    icon={<FiAlertCircle />}
                    iColor="text-error"
                    fBtnAction={() => deleteGame(game.id)}
                    fBtnText="Eliminar"
                    tBtnAction={() => setModal(false)}
                    tBtnText="Cancelar"
                    close={() => setModal(false)}
                />}
        </div>
    );
}

export default AdminCard;
