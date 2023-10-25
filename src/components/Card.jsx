import { Title } from "./_index";

const Card = ({ data: game }) => {
    return (
        <div>
            <div className="overflow-hidden">
                <img src={game.imgUrl} alt={game.title} className="rounded-t-md object-cover object-center w-full h-[300px] hover:scale-105 transition" />
            </div>

            <div className="bg-light text-dark rounded-b-md p-4">
                <Title type="h3">{game.title}</Title>
                <p>{game.desc}</p>
                <p>${game.price}</p>
            </div>
        </div>
    );
}

export default Card;
