//Hooks
import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import useCurrentDateTime from "../../hooks/useCurrentDateTime";

//Components
import { Button, Input, Loader, TextArea } from "../../components/_index";

//Firebase
import { updateDoc, doc, getDoc, collection } from "firebase/firestore";
import { db, storage } from "../../config/config.firebase";
import { getDownloadURL, ref, uploadBytes, deleteObject } from "firebase/storage";

//Utils
import { generateNewFileName } from "../../utils/generateNewFileName";


const EditGame = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const imgUrl = useLocation().state.imgUrl;

    const gameDocRef = doc(db, "games", id);

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState("");
    const [imgPreview, setImgPreview] = useState(null);
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

        try {

            //Validation
            if (title === "") throw new Error("El nombre del juego no puede estar vacío");
            if (desc === "") throw new Error("La descripción no puede estar vacía");
            if (price === "") throw new Error("El precio no puede estar vacío");

            let downloadURL = imgUrl;

            if (imageUpload !== null) {
                //Image handler
                const storageRef = ref(storage, `images/${generateNewFileName(imageUpload.name, currentDateTime)}`);
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

    const uploadImg = (e) => {
        setImageUpload(e.target.files[0]);
        if (e.target.files[0]) setImgPreview(URL.createObjectURL(e.target.files[0]));
    }

    return (
        <div className="container mx-auto">
            {Object.keys(newGame).length > 0 ?
                <>
                    <h1 className="text-3xl mb-8">Editar juego</h1>

                    <div className="grid grid-cols-3 gap-4">
                        <form onSubmit={handleUpdateGame} className="col-span-2">
                            <div className="w-full flex gap-4">
                                <Input type="text" name="title" placeholder="Game Title" change={(e) => handleTitleChange(e)} value={title} id="titulo">Título</Input>
                                <Input type="number" name="price" placeholder="Game Price" change={(e) => handlePriceChange(e)} value={price} id="precio">Precio</Input>
                            </div>
                            
                            <TextArea name="desc" placeholder="Game Description" change={(e) => handleDescChange(e)} value={desc}>Descripción</TextArea>
                            <Button type="submit">Guardar cambios</Button>
                        </form>
                        <div>
                            <div className="mb-4">
                                <p className="pl-4 mb-1">Banner actual</p>
                                {imgPreview ? <img src={imgPreview} alt="" className="w-full h-60 object-cover" /> : <img src={imgUrl} alt="" className="w-full h-60 object-cover" />}
                                
                            </div>
                            <Input type="file" change={(e) => uploadImg(e)} id="banner" >Cambiar Banner</Input>
                        </div>
                    </div>
                </>
                :
                <div className="flex items-center justify-center">
                    <Loader />
                </div>
            }

        </div>
    );
}

export default EditGame;
