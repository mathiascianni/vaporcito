//React
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

//Firebase
import { auth } from "../config/config.firebase";
import { signOut } from "firebase/auth";

//Icons
import { BiMenu, BiLogOut } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';
import { PiHandbagSimpleFill } from 'react-icons/pi';

const NavBar = () => {
    const user = auth.currentUser;
    const [menu, setMenu] = useState(false);

    const logout = async () => {
        try {
            await signOut(auth);
            setMenu(false);
            // Cambiar a navigate
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <nav className="text-light p-8 flex justify-between relative mb-4">
            <div className="container mx-auto flex items-center justify-between">
                <Link to="/" className="text-2xl" onClick={() => { setMenu(false); }}><span className="text-primary font-bold">Vaporcito</span>.net</Link>
                <ul className="flex gap-4 min-h-full">
                    {user ?
                        ""
                        :
                        <>
                            <li className="flex items-center hover:underline hover:underline-offset-8"><Link to="/login" >Iniciar Sesión</Link></li>
                            <li className="bg-primary p-1 px-4 rounded-full hover:bg-primary-dark transition cursor-pointer"><Link to="/register">Registrarme</Link></li>
                        </>
                    }

                    <li><button className="bg-input h-full aspect-square flex items-center justify-center rounded-md group hover:bg-white transition"><span className="group-hover:text-input transition"><PiHandbagSimpleFill size="1.5rem" /></span></button></li>
                    <li><button className="bg-input h-full aspect-square flex items-center justify-center rounded-md group hover:bg-white transition" onClick={() => { setMenu(true); }} ><span className="group-hover:text-input transition"><BiMenu size="1.5rem" /></span></button></li>
                </ul>
            </div>
            <div className={`fixed bg-darker top-0 right-0 h-screen gap-8 w-[300px] transition duration-500 ${menu ? "translate-x-0" : "translate-x-[120%]"}`}>
                <div className="h-full w-full relative p-8 text-end">
                    <button onClick={() => { setMenu(false); }} className="absolute top-1/2 left-0 -translate-y-1/2 translate-x-[-50%] rounded-full bg-darker p-4">
                        <AiOutlineClose size="2rem" />
                    </button>
                    <ul className="flex flex-col gap-4 justify-between h-full">

                        <li>
                            <ul className="flex flex-col gap-4">
                                <li className="hover:text-primary transition"><NavLink to="/" className="block" onClick={() => { setMenu(false); }}>Inicio</NavLink></li>
                                <li className="hover:text-primary transition"><NavLink to="/catalog" className="block" onClick={() => { setMenu(false); }}>Catálogo de juegos</NavLink></li>
                                <li className="hover:text-primary transition"><NavLink to="/support" className="block" onClick={() => { setMenu(false); }}>Soporte</NavLink></li>
                                <li className="hover:text-primary transition"><NavLink to="/admin" className="block" onClick={() => { setMenu(false); }}>Administrador</NavLink></li>
                                <li className="hover:text-primary transition"><NavLink to="/admin/create-game" className="block" onClick={() => { setMenu(false); }}>Crear juego</NavLink></li>
                            </ul>
                        </li>

                        {user ?
                            <li>
                                <ul className="flex flex-col gap-4">
                                    <li><div className="w-full h-[1px] bg-input"></div></li>
                                    <li>
                                        <p className="font-bold mb-4">{user.email}</p>
                                        <button onClick={logout} className="transition flex items-center justify-end gap-2 w-full hover:text-error "><BiLogOut size="1.5rem" /> Cerrar Sesión</button>
                                    </li>
                                </ul>
                            </li>
                            : ""}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
