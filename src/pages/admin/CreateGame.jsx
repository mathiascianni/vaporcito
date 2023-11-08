//Components
import { Button, Input, TextArea, SelectorWithBadges, InputErrorNotification, SquareSelector, ResponsiveLayout, Title, MediaPreview } from "../../components/_index";

//Firebase
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../../config/config.firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

//Hooks
import useCurrentDateTime from "../../hooks/useCurrentDateTime";
import { useEffect, useState } from "react";

//Utils
import { generateNewFileName } from "../../utils/generateNewFileName";
import ErrorHandler from "../../utils/ErrorHandler";

//Constants
import allLangs from "../../constants/allLangs";
import allPlatforms from "../../constants/allPlatforms";
import allGenres from "../../constants/allGenres";
import esrbRating from "../../constants/esrbRating";
import validationRules from "../../constants/validationRules";
import gameplayTags from "../../constants/gameplayTags";

//Icons
import { MdHideImage } from "react-icons/md";
import { AiOutlineCheck } from "react-icons/ai";

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
    const [multiplayer, setMultiplayer] = useState([]);
    const [isEarlyAccess, setIsEarlyAccess] = useState(false);
    //Lanzamiento, Es early access, Etiquetas, Specs

    //Error handler
    const [errors, setErrors] = useState({});

    const [imgPreview, setImgPreview] = useState(null);
    const [imageUpload, setImageUpload] = useState(null);
    const [selectedMedia, setSelectedMedia] = useState([]);
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

            //Banner image handler
            const storageRef = ref(storage, `images/${generateNewFileName(imageUpload.name, currentDateTime)}`);
            const uploadImg = await uploadBytes(storageRef, imageUpload);
            const downloadURL = await getDownloadURL(uploadImg.ref);

            const mediaUrls = []
            //Media handler
            if (selectedMedia.length > 0) {
                const uploadPromises = selectedMedia.map(async (media) => {
                    const mediaStorageRef = ref(storage, `media/${generateNewFileName(title, currentDateTime)}/${generateNewFileName(media.name, currentDateTime)}`);
                    const uploadMedia = await uploadBytes(mediaStorageRef, media);
                    const downloadMediaURL = await getDownloadURL(uploadMedia.ref);
                    mediaUrls.push(downloadMediaURL);
                    return downloadMediaURL;
                });
                //Awaits all the urls from the database
                await Promise.all(uploadPromises);
            }

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
                isEarlyAccess: isEarlyAccess,
                multiplayer: multiplayer,
                imgUrl: downloadURL,
                media: mediaUrls
            });

            //Reset form
            setTitle("");
            setDesc("");
            setPrice("");
            setLanguages([]);
            setGenres([]);
            setEsrb("e");
            setPlatforms([]);
            setDeveloper("");
            setCheckboxes([]);
            setIsEarlyAccess(false);
            setSelectedMedia([]);
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

        const nameIndex = checkboxes.indexOf(name);
        if (nameIndex === -1) {
            setCheckboxes([...checkboxes, name]);
        } else {
            setCheckboxes(checkboxes.filter((checkbox) => checkbox !== name));
        }
        setArray(newArray);
    }

    const uploadImg = (e) => {
        setImageUpload(e.target.files[0]);
        if (e.target.files[0]) setImgPreview(URL.createObjectURL(e.target.files[0]));
    }

    const uploadMedia = (e) => {
        const file = e.target.files;
        if (!file) return;
        const selectedFiles = Array.from(file);
        setSelectedMedia(selectedFiles);
    }

    return (
        <ResponsiveLayout>
            <Title type="h1">Crear juego</Title>
            <form onSubmit={handleSubmit} className="md:grid grid-cols-3 gap-4">
                <div className="md:col-span-2">
                    <div className="w-full flex flex-col md:flex-row gap-4">
                        <div className="w-full">
                            <Input type="text" name="title" placeholder="Minecraft" id="title" change={(e) => setTitle(e.target.value)} value={title}>Título</Input>
                            <InputErrorNotification errors={errors} field="title" />
                        </div>
                        <div className="w-full">
                            <Input type="number" name="price" placeholder="12,99" id="price" change={(e) => setPrice(Number(e.target.value))} value={price}>Precio</Input>
                            <InputErrorNotification errors={errors} field="price" />
                        </div>
                    </div>
                    <div>
                        <TextArea name="desc" placeholder="Un juego sandbox de generación procedural..." change={(e) => setDesc(e.target.value)} value={desc}>Descripción</TextArea>
                        <InputErrorNotification errors={errors} field="desc" />
                    </div>

                    <div className="w-full flex flex-col md:flex-row gap-4 mb-4 justify-between">
                        <div className="w-full mr-4">
                            <SelectorWithBadges title="Idiomas disponibles" inputValues={allLangs} name="languages" handleChange={handleArrayChange} setArray={setLanguages} badges={languages} checkboxes={checkboxes} />
                            <InputErrorNotification errors={errors} field="languages" />
                        </div>

                        <div className="w-full">
                            <SelectorWithBadges title="Géneros" inputValues={allGenres} name="genres" handleChange={handleArrayChange} setArray={setGenres} badges={genres} limit={true} checkboxes={checkboxes} />
                            <InputErrorNotification errors={errors} field="genres" />
                        </div>

                    </div>
                    <div className="md:grid grid-cols-3 gap-4 mb-4">
                        <div>
                            <p className="pl-4 mb-1">Clasificación ESRB</p>
                            <select name="esrb" id="esrb" className="bg-input cursor-pointer px-4 py-2 rounded-full w-full mb-2 focus:outline-none focus:ring-2 focus:ring-primary" value={esrb} onChange={(e) => setEsrb(e.target.value)}>
                                {esrbRating.map((esrb) => (
                                    <option key={esrb.id} value={esrb.code}>{esrb.name}</option>
                                ))}
                            </select>
                            <InputErrorNotification errors={errors} field="esrb" />
                        </div>
                        <div>
                            <Input type="text" name="developer" placeholder="Mojang" id="developer" change={(e) => setDeveloper(e.target.value)} value={developer}>Desarrollador</Input>
                            <InputErrorNotification errors={errors} field="developer" />
                        </div>
                        <div>
                            <SquareSelector name="isEarlyAccess" content={<AiOutlineCheck />} checkboxes={checkboxes} handleChange={setIsEarlyAccess} title="¿Está en Early Access?" toggle={isEarlyAccess} />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 mb-4">
                        <div className="w-full">
                            <SelectorWithBadges title="Características de multijugador" inputValues={gameplayTags} name="multiplayer" handleChange={handleArrayChange} setArray={setMultiplayer} badges={multiplayer} checkboxes={checkboxes} />
                            <InputErrorNotification errors={errors} field="multiplayer" />
                        </div>
                        <div className="w-full">
                            <SelectorWithBadges title="Plataformas disponibles" inputValues={allPlatforms} name="platforms" handleChange={handleArrayChange} setArray={setPlatforms} badges={platforms} checkboxes={checkboxes} />
                            <InputErrorNotification errors={errors} field="platforms" />
                        </div>
                    </div>

                    <div className="w-full bg-input p-4">
                        <Input type="file-multiple" media={selectedMedia} change={(e) => uploadMedia(e)} id="mediaUpload" >Subir archivos</Input>
                        {
                            selectedMedia.length > 0 &&
                            <MediaPreview media={selectedMedia} />
                        }
                    </div>
                    <InputErrorNotification errors={errors} field="selectedMedia" />
                </div>
                <div>
                    <div className="mb-4">
                        <p className="pl-4 mb-1">Banner actual</p>
                        {imgPreview ? <img src={imgPreview} alt="" className="w-full h-60 object-cover" /> : <div className="w-full h-60 bg-input flex flex-col items-center justify-center"><MdHideImage className="text-2xl" /> No hay imagen</div>}
                        <InputErrorNotification errors={errors} field="imageUpload" />
                    </div>
                    <Input type="file" change={(e) => uploadImg(e)} id="banner" >Cambiar Banner</Input>
                </div>
                <Button type="submit">Añadir</Button>
            </form>
        </ResponsiveLayout>
    );
}

export default CreateGame;
