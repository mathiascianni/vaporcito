import { Title } from "./_index";

const Card = ({ data: game }) => {
    return (
        <div className="bg-light text-dark rounded-md p-4">
            <Title type="h3">{game.title}</Title>
            <p>{game.desc}</p>
            <p>${game.price}</p>
        </div>
    );
}

export default Card;
