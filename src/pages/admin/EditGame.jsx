//Hooks
import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import useCurrentDateTime from "../../hooks/useCurrentDateTime";

//Context
import { useGames } from "../../context/games/GamesContext";

//Components
import { Button, Input, Loader, TextArea, SelectorWithBadges, InputErrorNotification, ResponsiveLayout, Title, SquareSelector, MediaPreview, MediaCarousel, EditMediaFiles } from "../../components/_index";

//Firebase
import { updateDoc, doc, getDoc, collection } from "firebase/firestore";
import { db, storage } from "../../config/config.firebase";
import { getDownloadURL, ref, uploadBytes, deleteObject } from "firebase/storage";

//Utils
import { generateNewFileName } from "../../utils/generateNewFileName";
import allLangs from "../../constants/allLangs";
import allGenres from "../../constants/allGenres";
import esrbRating from "../../constants/esrbRating";
import { AiOutlineCheck } from "react-icons/ai";
import gameplayTags from "../../constants/gameplayTags";
import allPlatforms from "../../constants/allPlatforms";
import { v4 as uuid } from "uuid";

const EditGame = () => {
    const { id } = useParams();
    const currentDateTime = useCurrentDateTime();
    const navigate = useNavigate();

    const { getGameById, game, loading } = useGames();
    const [errors, setErrors] = useState({});
    const [newGame, setNewGame] = useState({});
    const [checkboxes, setCheckboxes] = useState([]);

    //Media
    const [dbMedia, setDbMedia] = useState([]);
    const [actualMedia, setActualMedia] = useState([]);
    const [allMedia, setAllMedia] = useState([]);

    const [isEA, setIsEA] = useState(false);

    useEffect(() => {
        getGameById(id);
    }, []);

    useEffect(() => {
        setNewGame(game);
        setCheckboxes(game.languages, game.genres, game.platforms);
        setIsEA(game.isEarlyAccess);

        //TODO: set media type on upload
        setDbMedia(game.media?.map((media) => {
            return { url: media, id: uuid(), type: "image" }
        }));
        setAllMedia(game.media?.map((media) => {
            return { url: media, id: uuid(), type: "image" }
        }));
    }, [game]);

    const handleUpdateGame = async (e) => {
        e.preventDefault();

        try {

            //Validation

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

            navigate("/admin");
        } catch (error) {
            console.error(error);
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

        const nameIndex = checkboxes.indexOf(code);
        if (nameIndex === -1) {
            setCheckboxes([...checkboxes, code]);
        } else {
            setCheckboxes(checkboxes.filter((checkbox) => checkbox !== code));
        }
        setArray({ ...newGame, [name]: newArray });
    }

    const uploadMedia = (e) => {
        const file = e.target.files;
        if (!file) return;
        const selectedFiles = Array.from(file);
        //set in actual media, the dbMedia and selected files with a unique id
        setActualMedia([...actualMedia, ...selectedFiles.map((file) => {
            console.log(file.type)
            return { url: URL.createObjectURL(file), id: uuid(), type: file.type.split("/")[0] }
        })]);
    }

    useEffect(() => {
        setAllMedia([...dbMedia, ...actualMedia]);
    }, [actualMedia, dbMedia])

    return (
        <ResponsiveLayout>
            {!loading && Object.keys(newGame).length > 0 ?
                <>
                    <Title type="h1">Editar {game.title}</Title>
                    <form onSubmit={handleUpdateGame} className="md:grid grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                            <div className="w-full flex flex-col md:flex-row gap-4">
                                <div className="w-full">
                                    <Input
                                        type="text"
                                        name="title"
                                        id="title"
                                        placeholder="Minecraft"
                                        change={(e) => setNewGame({ ...newGame, title: e.target.value })}
                                        value={newGame.title}
                                    >Título</Input>
                                    <InputErrorNotification error={errors} field="title" />
                                </div>
                                <div className="w-full">
                                    <Input
                                        type="number"
                                        name="price"
                                        id="price"
                                        placeholder="12,99"
                                        change={(e) => setNewGame({ ...newGame, price: Number(e.target.value) })}
                                        value={newGame.price}
                                    >Precio</Input>
                                    <InputErrorNotification error={errors} field="price" />
                                </div>
                            </div>
                            <div>
                                <TextArea
                                    name="desc"
                                    placeholder="Un juego sandbox de generación procedural..."
                                    change={(e) => setNewGame({ ...newGame, desc: e.target.value })}
                                    value={newGame.desc}
                                >Descripción</TextArea>
                                <InputErrorNotification error={errors} field="desc" />
                            </div>

                            <div className="w-full flex flex-col md:flex-row gap-4 mb-4 justify-between">
                                <div className="w-full mr-4">
                                    <SelectorWithBadges
                                        title="Idiomas disponibles"
                                        inputValues={allLangs}
                                        name="languages"
                                        handleChange={handleArrayChange}
                                        setArray={setNewGame}
                                        badges={newGame.languages}
                                        checkboxes={newGame.languages}
                                    />
                                    <InputErrorNotification error={errors} field="languages" />
                                </div>
                                <div className="w-full">
                                    <SelectorWithBadges
                                        title="Géneros"
                                        inputValues={allGenres}
                                        name="genres"
                                        handleChange={handleArrayChange}
                                        setArray={setNewGame}
                                        badges={newGame.genres}
                                        checkboxes={newGame.genres}
                                        limit
                                    />
                                    <InputErrorNotification error={errors} field="genres" />
                                </div>
                            </div>
                            <div className="md:grid grid-cols-3 gap-4 mb-4">
                                <div>
                                    <p className="pl-4 mb-1">Clasificación ESRB</p>
                                    <select
                                        name="esrb"
                                        id="esrb"
                                        className="bg-input cursor-pointer px-4 py-2 rounded-full w-full mb-2 focus:outline-none focus:ring-2 focus:ring-primary"
                                        value={newGame.esrb}
                                        onChange={(e) => setNewGame({ ...newGame, esrb: e.target.value })}>
                                        {esrbRating.map((esrb) => (
                                            <option key={esrb.id} value={esrb.code}>{esrb.name}</option>
                                        ))}
                                    </select>
                                    <InputErrorNotification errors={errors} field="esrb" />
                                </div>
                                <div>
                                    <Input
                                        type="text"
                                        name="developer"
                                        id="developer"
                                        placeholder="Mojang"
                                        change={(e) => setNewGame({ ...newGame, developer: e.target.value })}
                                        value={newGame.developer}
                                    >Desarrollador</Input>
                                    <InputErrorNotification error={errors} field="developer" />
                                </div>
                                <div>
                                    <SquareSelector
                                        name="isEarlyAccess"
                                        content={<AiOutlineCheck />}
                                        checkboxes={checkboxes}
                                        handleChange={setIsEA}
                                        title="¿Está en Early Access?"
                                        toggle={isEA}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row gap-4 mb-4">
                                <div className="w-full">
                                    <SelectorWithBadges
                                        title="Características de multijugador"
                                        inputValues={gameplayTags}
                                        name="multiplayer"
                                        handleChange={handleArrayChange}
                                        setArray={setNewGame}
                                        badges={newGame.multiplayer}
                                        checkboxes={newGame.multiplayer}
                                    />
                                    <InputErrorNotification error={errors} field="multiplayer" />
                                </div>
                                <div className="w-full">
                                    <SelectorWithBadges
                                        title="Plataformas disponibles"
                                        inputValues={allPlatforms}
                                        name="platforms"
                                        handleChange={handleArrayChange}
                                        setArray={setNewGame}
                                        badges={newGame.platforms}
                                        checkboxes={newGame.platforms}
                                    />
                                    <InputErrorNotification error={errors} field="platforms" />
                                </div>
                            </div>
                            <div className="w-full bg-input p-4">
                                <Input
                                    type="file-multiple"
                                    change={(e) => uploadMedia(e)}
                                    id="mediaUpload">
                                    Subir archivos
                                </Input>
                                {
                                    allMedia.length > 0 &&
                                    <>
                                        <p className="pl-4 mb-1">Archivos actuales</p>
                                        <EditMediaFiles
                                            media={allMedia}
                                            setMedia={setAllMedia}
                                            setDbMedia={setDbMedia}
                                            setActualMedia={setActualMedia}
                                            dbMedia={dbMedia}
                                            actualMedia={actualMedia}
                                            title={game.title}
                                        />
                                    </>
                                }
                            </div>
                            <InputErrorNotification error={errors} field="" />
                        </div>
                    </form>

                </>
                :
                <div className="flex items-center justify-center">
                    <Loader />
                </div>
            }
        </ResponsiveLayout>
    );
}

export default EditGame;
