import { Link } from "react-router-dom";
import { auth } from "../config/config.firebase";
import { useState } from "react";
import { Button } from "../components/_index";
import { signOut } from "firebase/auth";

const NavBar = () => {
    const [profileMenu, setProfileMenu] = useState(false);

    const handleProfileMenu = () => {
        setProfileMenu(!profileMenu);
    }

    const logout = async () => {
        try {
            await signOut(auth);
            setProfileMenu(false);
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <nav className="bg-neutral-800 text-light p-4 flex justify-between relative">
            <ul className="flex gap-4">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/games">Games</Link></li>

                <li><Link to="/register">Register</Link></li>
                <li><Link to="/admin/create-game">Create Game</Link></li>
                <li><Link to="/admin">Dashboard</Link></li>
            </ul>
            <ul>
                {auth.currentUser ?
                    <li>
                        <button onClick={handleProfileMenu} className="flex gap-2">
                            {auth.currentUser.email}
                            <img src={auth.currentUser.photoURL} alt="User profile picture" className="w-6 h-6 rounded-full" />
                        </button>
                    </li> :
                    <li><Link to="/login">Iniciar sesión</Link></li>}
            </ul>
            <div className={`absolute top-[100%] w-[300px] flex flex-col gap-4 bg-neutral-800 right-0 text-light p-4 transition ${profileMenu ? "translate-x-0 " : "translate-x-full"}`}>
                <Button action={logout}>Cerrar sesión</Button>
            </div>
        </nav>
    );
}

export default NavBar;
