//Components
import { Button, Input, TextArea, SelectorWithBadges, InputErrorNotification } from "../../components/_index";

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
import allPlatforms from "../../constants/allPlatforms";
import allGenres from "../../constants/allGenres";
import esrbRating from "../../constants/esrbRating";
import ErrorHandler from "../../utils/ErrorHandler";
import validationRules from "../../constants/validationRules";

//Icons
import { MdHideImage } from "react-icons/md";

const CreateGame = () => {

    //Input handlers
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState("");
    const [languages, setLanguages] = useState([]);
    const [genres, setGenres] = useState([]);
    const [esrb, setEsrb] = useState("e");
    const [platforms, setPlatforms] = useState([]);
    const [developer, setDeveloper] = useState("");
    //Lanzamiento, Características de multijugador, Es early access, Etiquetas, Specs

    //Error handler
    const [errors, setErrors] = useState({});

    const [imgPreview, setImgPreview] = useState(null);
    const [imageUpload, setImageUpload] = useState(null);
    const [checkboxes, setCheckboxes] = useState([]);
    const gamesCollectionRef = collection(db, "games");
    const currentDateTime = useCurrentDateTime();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        try {
            //Validation
            Object.entries(validationRules).forEach(([field, rules]) => {
                rules.forEach((rule) => {
                    if (rule.condition(eval(field))) {
                        if (!newErrors[field]) {
                            newErrors[field] = [];
                        }
                        newErrors[field].push(rule.message);
                    }
                });
            });

            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                throw new ErrorHandler("Se han producido errores");
            }

            setErrors({});

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
                genres: genres,
                esrb: esrb,
                platforms: platforms,
                developer: developer,
                imgUrl: downloadURL
            });

            //Reset form
            setTitle("");
            setDesc("");
            setPrice("");
            setLanguages([]);
            setGenres([]);
            setEsrb("");
            setPlatforms([]);
            setDeveloper("");
            setCheckboxes([]);
        } catch (error) {
            console.error(error.message);
        }
    }

    const handleArrayChange = (array, setArray, code, name) => {
        const newArray = [...array];
        const index = newArray.indexOf(code);
        if (index === -1) {
            newArray.push(code);
        } else {
            newArray.splice(index, 1);
        }
        setCheckboxes([...checkboxes, name]);
        setArray(newArray);
    }

    const uploadImg = (e) => {
        setImageUpload(e.target.files[0]);
        if (e.target.files[0]) setImgPreview(URL.createObjectURL(e.target.files[0]));
    }

    return (
        <div className="container mx-auto">
            <h1>Añadir un nuevo juego</h1>
            <div className="grid grid-cols-3 gap-4">
                <form onSubmit={handleSubmit} className="col-span-2">
                    <div className="w-full flex gap-4">
                        <div className="w-full">
                            <Input type="text" name="title" placeholder="Minecraft" change={(e) => setTitle(e.target.value)} value={title}>Título</Input>
                            <InputErrorNotification errors={errors} field="title" />
                        </div>
                        <div className="w-full">
                            <Input type="number" name="price" placeholder="12,99" change={(e) => setPrice(Number(e.target.value))} value={price}>Precio</Input>
                            <InputErrorNotification errors={errors} field="price" />
                        </div>
                    </div>
                    <div>
                        <TextArea name="desc" placeholder="Un juego sandbox de generación procedural..." change={(e) => setDesc(e.target.value)} value={desc}>Descripción</TextArea>
                        <InputErrorNotification errors={errors} field="desc" />
                    </div>

                    <div className="w-full flex mb-4 justify-between">
                        <div className="w-full mr-4">
                            <SelectorWithBadges title="Idiomas disponibles" inputValues={allLangs} name="languages" handleChange={handleArrayChange} setArray={setLanguages} badges={languages} checkboxes={checkboxes} />
                            <InputErrorNotification errors={errors} field="languages" />
                        </div>

                        <div className="w-full">
                            <SelectorWithBadges title="Géneros" inputValues={allGenres} name="genres" handleChange={handleArrayChange} setArray={setGenres} badges={genres} limit={true} checkboxes={checkboxes} />
                            <InputErrorNotification errors={errors} field="genres" />
                        </div>

                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                            <SelectorWithBadges title="Plataformas disponibles" inputValues={allPlatforms} name="platforms" handleChange={handleArrayChange} setArray={setPlatforms} badges={platforms} checkboxes={checkboxes} />
                            <InputErrorNotification errors={errors} field="platforms" />
                        </div>
                        <div>
                            <p className="pl-4 mb-1">Clasificación ESRB</p>
                            <select name="esrb" id="esrb" className="bg-input px-4 py-2 rounded-full w-full mb-2 focus:outline-none focus:ring-2 focus:ring-primary" value={esrb} onChange={(e) => setEsrb(e.target.value)}>
                                {esrbRating.map((esrb) => (
                                    <option key={esrb.id} value={esrb.code}>{esrb.name}</option>
                                ))}
                            </select>
                            <InputErrorNotification errors={errors} field="esrb" />
                        </div>
                        <div>
                            <Input type="text" name="developer" placeholder="Mojang" change={(e) => setDeveloper(e.target.value)} value={developer}>Desarrollador</Input>
                            <InputErrorNotification errors={errors} field="developer" />
                        </div>
                    </div>


                    <Button type="submit">Añadir</Button>
                </form>
                <div>
                    <div className="mb-4">
                        <p className="pl-4 mb-1">Banner actual</p>
                        {imgPreview ? <img src={imgPreview} alt="" className="w-full h-60 object-cover" /> : <div className="w-full h-60 bg-input flex flex-col items-center justify-center"><MdHideImage className="text-2xl" /> No hay imagen</div>}
                        <InputErrorNotification errors={errors} field="imageUpload" />
                    </div>
                    <Input type="file" change={(e) => uploadImg(e)} id="banner" >Cambiar Banner</Input>
                </div>
            </div>
        </div>
    );
}

export default CreateGame;
