import { useState } from "react";
import { Button, Input } from "../../components/_index";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/config.firebase";

const CreateGame = () => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState("");

    const gamesCollectionRef = collection(db, "games");

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            await addDoc(gamesCollectionRef, {
                title: title,
                desc: desc,
                price: price
            })

            setTitle("");
            setDesc("");
            setPrice("");
        } catch (error) {
            console.error(error);
        }
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleDescChange = (e) => {
        setDesc(e.target.value);
    }

    const handlePriceChange = (e) => {
        setPrice(Number(e.target.value));
    }

    return (
        <div className="container mx-auto">
            <h1>Añadir un nuevo juego</h1>
            <form onSubmit={handleSubmit}>
                <Input type="text" name="title" placeholder="Game Title" change={(e) => handleTitleChange(e)}  value={title}>Título</Input>
                <Input type="text" name="desc" placeholder="Game Description" change={(e) => handleDescChange(e)}  value={desc}>Descripción</Input>
                <Input type="number" name="price" placeholder="Game Price" change={(e) => handlePriceChange(e)}  value={price}>Precio</Input>
                <Button type="submit">Añadir</Button>
            </form>
        </div>
    );
}

export default CreateGame;
