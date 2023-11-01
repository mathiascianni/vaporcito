//Components
import { Button, Input, TextArea } from "../../components/_index";

//Firebase
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../../config/config.firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

//Hooks
import useCurrentDateTime from "../../hooks/useCurrentDateTime";
import { useEffect, useState } from "react";

//Utils
import { generateNewImageName } from "../../utils/generateNewImageName";
import allLangs from "../../constants/allLangs";

//Icons
import { MdHideImage } from "react-icons/md";

const CreateGame = () => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [developer, setDeveloper] = useState("");
    const [isEarlyAccess, setIsEarlyAccess] = useState(false);
    const [languages, setLanguages] = useState([]);
    const [specs, setSpecs] = useState("");
    const [imgPreview, setImgPreview] = useState(null);
    //Genero, Subgenero, Plataforma, Lanzamiento, Desarrollador, Características de multijugador, Es early access, Rating ESRB, Etiquetas, Idiomas, Specs

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
            if (languages.length === 0) throw new Error("Debe seleccionar al menos un idioma");
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
                languages: languages,
                imgUrl: downloadURL
            });

            //Reset form
            setTitle("");
            setDesc("");
            setPrice("");
            setLanguages([]);
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

    const handleLangChange = (code) => {
        const newLangs = [...languages];
        const index = newLangs.indexOf(code);
        if (index === -1) {
            newLangs.push(code);
        } else {
            newLangs.splice(index, 1);
        }
        setLanguages(newLangs);
        
    }

    const uploadImg = (e) => {
        setImageUpload(e.target.files[0]);
        if (e.target.files[0]) setImgPreview(URL.createObjectURL(e.target.files[0]));
    }

    useEffect(() => {
        console.log(languages);
    }, [languages])

    return (
        <div className="container mx-auto">
            <h1>Añadir un nuevo juego</h1>
            <div className="grid grid-cols-3 gap-4">
                <form onSubmit={handleSubmit} className="col-span-2">
                    <div className="w-full flex gap-4">
                        <Input type="text" name="title" placeholder="Game Title" change={(e) => handleTitleChange(e)} value={title}>Título</Input>
                        <Input type="number" name="price" placeholder="Game Price" change={(e) => handlePriceChange(e)} value={price}>Precio</Input>
                    </div>
                    <TextArea name="desc" placeholder="Game Description" change={(e) => handleDescChange(e)} value={desc}>Descripción</TextArea>

                    <p>Idiomas disponibles</p>
                    <div className="w-full flex gap-1 my-2">
                        {languages.length > 0 && languages.map((lang) => (
                            <div key={lang} className="text-sm border border-primary px-2 py-1 w-10 rounded-full text-center uppercase	">{lang}</div>
                        ))}
                    </div>
                    <div className="overflow-y-scroll max-h-[150px]">
                        {allLangs.map((lang) => (
                            <Input key={lang.code} type="checkbox" name="lang" id={lang.code} value={lang.name} change={() => handleLangChange(lang.code)} />
                        ))}
                    </div>


                    <Button type="submit">Añadir</Button>
                </form>
                <div>
                    <div className="mb-4">
                        <p className="pl-4 mb-1">Banner actual</p>
                        {imgPreview ? <img src={imgPreview} alt="" className="w-full h-60 object-cover" /> : <div className="w-full h-60 bg-input flex flex-col items-center justify-center"><MdHideImage className="text-2xl" /> No hay imagen</div>}

                    </div>
                    <Input type="file" change={(e) => uploadImg(e)} id="banner" >Cambiar Banner</Input>
                </div>
            </div>
        </div>
    );
}

export default CreateGame;
