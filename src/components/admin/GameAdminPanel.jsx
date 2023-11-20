import { AdminCardTag, ModalNotification } from "../_index";
import { BsImageFill } from 'react-icons/bs';
import { FiAlertCircle } from "react-icons/fi";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useGames } from "../../context/games/GamesContext";
const GameAdminPanel = ({ games, loading }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const { deleteGame } = useGames();

    return (
        <>
            {
                games && !loading && games.map(game => (
                    <div key={game.id} className="w-full bg-input rounded-md flex flex-col md:flex-row mb-4">
                        <div className="md:aspect-square md:max-w-[200px] ">
                            {isLoading && <div className="md:aspect-square aspect-[4/2] w-full md:w-[200px] md:h-full bg-gray-300 animate-pulse flex items-center justify-center rounded-t-md md:rounded-tr-none md:rounded-l-md"><BsImageFill className="text-4xl" /></div>}
                            <img onLoad={() => setIsLoading(false)} src={game.imgUrl} alt={game.title} className={`w-full md:h-full object-cover object-center rounded-t-md md:rounded-tr-none md:rounded-l-md ${isLoading ? "hidden" : "block"}`} />
                        </div>
                        <div className="flex-1 p-4 md:overflow-x-scroll flex gap-4 md:gap-8 flex-col md:flex-row">
                            <AdminCardTag title="Título" content={game.title} />
                            <AdminCardTag title="Precio" content={"$" + game.price} />
                            <AdminCardTag title="Géneros" content={game.genres.map(genre => <span key={genre} className="capitalize bg-accent p-1 px-2 rounded-full text-xs mr-2">{genre}</span>)} />
                            <div className="flex flex-col h-full md:w-[300px] pl-2 border-l border-input-light">
                                <h3 className="border-b pb-1 max-w-max border-input-light p-2 mb-2">Acciones</h3>
                                <div className="flex-1 flex items-center h-full gap-2">
                                    <Link to={`/admin/edit-game/${game.id}`} state={{ imgUrl: game.imgUrl }} className="inline-block bg-primary p-1 px-4 rounded-full hover:bg-primary-dark transition w-full md:w-auto text-center">Editar</Link>
                                    <button className="inline-block border border-error text-error p-1 px-4 rounded-full hover:bg-error hover:text-white transition w-full md:w-auto text-center" onClick={() => setShowModal(true)}>Eliminar</button>
                                </div>
                            </div>
                        </div>
                        {showModal && <ModalNotification title="¿Deseas eliminar este juego?" subtitle="El juego se eliminará para siempre (¡Eso es mucho tiempo!)." icon={<FiAlertCircle className="text-4xl text-error" />} tBtnText="No, cancelar" tBtnAction={() => setShowModal(false)} fBtnText="Sí, eliminar" fBtnAction={() => deleteGame(game)} close={() => setShowModal(false)} iColor />}
                    </div>
                ))
            }
        </>
    )
}

export default GameAdminPanel;