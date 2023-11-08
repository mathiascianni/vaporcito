//Hooks
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

//Firebase
import { db } from "../config/config.firebase";
import { doc, getDoc } from "firebase/firestore";

//Components
import { MediaCarousel, ResponsiveLayout, Title } from "../components/_index";

//Constants
import allGenres from "../constants/allGenres";

const GameDetails = () => {
    const { id } = useParams();

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState("");
    const [media, setMedia] = useState([]);
    const [imgUrl, setImgUrl] = useState("");
    const [genres, setGenres] = useState([]);
    const [isEarlyAccess, setIsEarlyAccess] = useState(false);
    const [developer, setDeveloper] = useState("");

    const gameDocRef = doc(db, "games", id);
    const getGame = async () => {
        const docSnap = await getDoc(gameDocRef);
        docSnap.data();
        try {
            setTitle(docSnap.data().title);
            setDesc(docSnap.data().desc);
            setPrice(docSnap.data().price);
            setMedia(docSnap.data().media);
            setImgUrl(docSnap.data().imgUrl);

            const newGenres = [];
            docSnap.data().genres.forEach((genre) => {
                newGenres.push(allGenres.find((g) => g.code === genre));
            });

            setGenres(newGenres);
            setIsEarlyAccess(docSnap.data().isEarlyAccess);
            setDeveloper(docSnap.data().developer);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getGame();
    }, [])

    return (
        <ResponsiveLayout>
            <Title type="h1">{title}</Title>
            <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">

                    <div className="">
                        <MediaCarousel media={media} />
                    </div>
                </div>
                <div>
                    <img src={imgUrl} alt={"Banner de " + title} className="mb-4 rounded-md" />
                    <p className="mb-4">{desc}</p>
                    <div className="bg-input-light text-white rounded-md p-4 flex justify-between items-center mb-4">
                        <button className="bg-primary p-1 px-4 rounded-sm hover:bg-primary-dark transition">Añadir al carrito</button>
                        <div className="flex items-center">
                            <span className="bg-success p-1 px-2 rounded-l-sm">-20%</span>
                            <p className="bg-input p-1 px-2 rounded-r-sm">USD${price}</p>
                        </div>
                    </div>
                    <div>
                        <Title type="h2">Géneros</Title>
                        <div className="flex gap-1 text-xs">
                            {genres.map((genre) => (
                                <p key={genre.id} className="bg-accent p-1 px-2 rounded-full">{genre.name}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </ResponsiveLayout>
    );
}

export default GameDetails;