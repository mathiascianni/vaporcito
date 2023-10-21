import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="bg-neutral-800 text-light p-4">
            <ul className="flex gap-4">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/games">Games</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/admin/create-game">Create Game</Link></li>
            </ul>
        </nav>
    );
}

export default NavBar;
