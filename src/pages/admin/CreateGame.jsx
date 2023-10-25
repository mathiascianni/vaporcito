import { useEffect, useState } from "react";
import { Button, Input } from "../../components/_index";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../../config/config.firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import useCurrentDateTime from "../../hooks/useCurrentDateTime";
import { generateNewImageName } from "../../utils/generateNewImageName";

const CreateGame = () => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState("");
    const [imageUpload, setImageUpload] = useState(null);
    const gamesCollectionRef = collection(db, "games");
    const currentDateTime = useCurrentDateTime();


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            //Validation
            if (title === "") throw new Error("El nombre del juego no puede estar vacío");
            if (desc === "") throw new Error("La descripción no puede estar vacía");
            if (price === "") throw new Error("El precio no puede estar vacío");
            if (imageUpload == null) throw new Error("No se ha seleccionado una imagen");

            //Image handler
            const storageRef = ref(storage, `images/${generateNewImageName(imageUpload.name, currentDateTime)}`);
            const uploadImg = await uploadBytes(storageRef, imageUpload);
            const downloadURL = await getDownloadURL(uploadImg.ref);

            //Add game to database
            await addDoc(gamesCollectionRef, {
                title: title,
                desc: desc,
                price: price,
                imgUrl: downloadURL
            });
            
            //Reset form
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
                <Input type="text" name="title" placeholder="Game Title" change={(e) => handleTitleChange(e)} value={title}>Título</Input>
                <Input type="text" name="desc" placeholder="Game Description" change={(e) => handleDescChange(e)} value={desc}>Descripción</Input>
                <Input type="number" name="price" placeholder="Game Price" change={(e) => handlePriceChange(e)} value={price}>Precio</Input>
                <input type="file" onChange={(e) => setImageUpload(e.target.files[0])} />
                <Button type="submit">Añadir</Button>
            </form>
        </div>
    );
}

export default CreateGame;
