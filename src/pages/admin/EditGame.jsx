import { useEffect, useState } from "react";
import { Button, Input } from "../../components/_index";
import { updateDoc, doc, getDoc, collection } from "firebase/firestore";
import { db } from "../../config/config.firebase";
import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";

const EditGame = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const gameDocRef = doc(db, "games", id);

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState("");
    const [newGame, setNewGame] = useState({});
    const getGame = async () => {
        const docSnap = await getDoc(gameDocRef);
        docSnap.data();
        try {
            setTitle(docSnap.data().title);
            setDesc(docSnap.data().desc);
            setPrice(docSnap.data().price);
            setNewGame({ title: docSnap.data().title, desc: docSnap.data().desc, price: docSnap.data().price });
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getGame();
    }, [])


    const handleUpdateGame = async (e) => {
        e.preventDefault();
        console.log(newGame)

        try {
            await updateDoc(gameDocRef, {
                title: newGame.title,
                desc: newGame.desc,
                price: newGame.price
            })
            navigate("/admin");
        } catch (error) {
            console.error(error);
        }
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        setNewGame({ ...newGame, title: e.target.value });
    }

    const handleDescChange = (e) => {
        setDesc(e.target.value);
        setNewGame({ ...newGame, desc: e.target.value });
    }

    const handlePriceChange = (e) => {
        setPrice(Number(e.target.value));
        setNewGame({ ...newGame, price: Number(e.target.value) });
    }

    return (
        <div className="container mx-auto">
            {Object.keys(newGame).length > 0 ?
                <>
                    <h1>Editar juego</h1>

                    <form onSubmit={handleUpdateGame}>
                        <Input type="text" name="title" placeholder="Game Title" change={(e) => handleTitleChange(e)} value={title}>Título</Input>
                        <Input type="text" name="desc" placeholder="Game Description" change={(e) => handleDescChange(e)} value={desc}>Descripción</Input>
                        <Input type="number" name="price" placeholder="Game Price" change={(e) => handlePriceChange(e)} value={price}>Precio</Input>
                        <Button type="submit">Guardar cambios</Button>
                    </form>
                </>
                :
                <p>Loading...</p>
            }

        </div>
    );
}

export default EditGame;
