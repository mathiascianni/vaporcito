//Hooks
import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import useCurrentDateTime from "../../hooks/useCurrentDateTime";

//Components
import { Button, Input } from "../../components/_index";

//Firebase
import { updateDoc, doc, getDoc, collection } from "firebase/firestore";
import { db, storage } from "../../config/config.firebase";
import { getDownloadURL, ref, uploadBytes, deleteObject } from "firebase/storage";

//Utils
import { generateNewImageName } from "../../utils/generateNewImageName";


const EditGame = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const imgUrl = useLocation().state.imgUrl;

    const gameDocRef = doc(db, "games", id);

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState("");
    const [newGame, setNewGame] = useState({});
    const [imageUpload, setImageUpload] = useState(null);

    const currentDateTime = useCurrentDateTime();

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

            //Validation
            if (title === "") throw new Error("El nombre del juego no puede estar vacío");
            if (desc === "") throw new Error("La descripción no puede estar vacía");
            if (price === "") throw new Error("El precio no puede estar vacío");

            let downloadURL = imgUrl;

            if (imageUpload !== null) {
                //Image handler
                const storageRef = ref(storage, `images/${generateNewImageName(imageUpload.name, currentDateTime)}`);
                const uploadImg = await uploadBytes(storageRef, imageUpload);
                await deleteObject(ref(storage, imgUrl));
                downloadURL = await getDownloadURL(uploadImg.ref);
            }

            //Add game to database
            await updateDoc(gameDocRef, {
                title: newGame.title,
                desc: newGame.desc,
                price: newGame.price,
                imgUrl: downloadURL
            });

            //Reset form
            setTitle("");
            setDesc("");
            setPrice("");

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
                    <img src={imgUrl} alt="" />

                    <form onSubmit={handleUpdateGame}>
                        <Input type="text" name="title" placeholder="Game Title" change={(e) => handleTitleChange(e)} value={title}>Título</Input>
                        <Input type="text" name="desc" placeholder="Game Description" change={(e) => handleDescChange(e)} value={desc}>Descripción</Input>
                        <Input type="number" name="price" placeholder="Game Price" change={(e) => handlePriceChange(e)} value={price}>Precio</Input>
                        <input type="file" onChange={(e) => setImageUpload(e.target.files[0])} />
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
