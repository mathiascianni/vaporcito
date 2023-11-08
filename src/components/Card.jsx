import { Title } from "./_index";
import { Link } from "react-router-dom";

const Card = ({ data: game }) => {
    return (
        <Link to={`/game/${game.id}`} >
            <div className="aspect-[2/3] p-4 w-full bg-cover bg-center origin-top shadow-md hover:shadow-xl group card3d transition duration-300 relative overflow-hidden" style={{ backgroundImage: `url(${game.coverUrl})` }}>
                <div className="bg-white/5 w-[200%] blur-sm h-[50%] absolute top-0 left-full -translate-x-[40%] origin-center rotate-45 group-hover:-translate-x-[55%] group-hover:bg-white/10 transition duration-300 "></div>
                <div className="text-center absolute bottom-1 left-0 w-full p-4">
                    <p className="group-hover:opacity-100 opacity-0 transition duration-300">{game.title}</p>
                </div>
            </div>
        </Link>
    );
}

export default Card;
