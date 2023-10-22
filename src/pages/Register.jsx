//Firebase Register
import { auth, googleProvider } from "../config/config.firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

//Components
import { Input, Title } from "../components/_index";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//Constants
import firebaseErrors from "../constants/firebaseErrors";

//Icons
import { FcGoogle } from "react-icons/fc";
import { IoAlertCircle } from "react-icons/io5";
import { BsArrowLeftShort } from "react-icons/bs";


const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    //Crear con email
    const signIn = async (e) => {
        e.preventDefault();

        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.log(error.code);
            setErrors(error.code);
        }
    }

    //Crear con Google
    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    }

    //Cerrar sesión
    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }


    return (
        <section className="w-full h-screen lg:py-8 bg-[url('/img/dragon_bg.jpg')] bg-no-repeat bg-cover bg-center md:bg-contain md:bg-right ">
            <div className="md:max-w-[600px] lg:max-w-[600px] max-w-full lg:ml-[15%] mx-auto p-2 h-full">
                <div className="bg-input/60 h-full rounded-md backdrop-blur-md p-8 overflow-y-scroll md:overflow-y-auto">
                    <Link to="/" className="inline-flex items-center gap-1 mb-8 hover:text-accent transition"><BsArrowLeftShort size="1.5rem" /> Volver</Link>
                    <Title type="h1">Registrate</Title>
                    <p className="my-4">¿Ya tenés una cuenta? <Link to="/login" className="text-accent hover:text-white transition">Iniciá sesión</Link></p>
                    <form onSubmit={signIn}>
                        <div className="flex flex-col gap-4">
                            <Input type="text" name="username" placeholder="Matna" >Nombre de usuario</Input>
                            <Input type="email" name="email" placeholder="example@mail.com" change={(e) => handleChangeEmail(e)}>Email</Input>
                            <Input type="password" name="password" placeholder="Ingresá tu contraseña" change={(e) => handleChangePassword(e)}>Contraseña</Input>
                            <Input type="password" name="repassword" placeholder="Reingresá tu contraseña">Confirmar contraseña</Input>
                            {errors.length > 0 ? <span className="text-red-500 flex items-center gap-2"><IoAlertCircle size="1.5rem" /> {firebaseErrors[errors]}</span> : null}
                        </div>
                        <button type="submit" className="bg-primary text-white px-4 py-2 rounded-full w-full mt-8 hover:bg-primary-dark transition">Crear cuenta</button>
                    </form>
                    <div className="flex items-center gap-8">
                        <div className="w-full mx-auto h-[1px] bg-light my-8"></div>
                        <p>o</p>
                        <div className="w-full mx-auto h-[1px] bg-light my-8"></div>
                    </div>
                    <button className="bg-primary text-white px-4 py-1 rounded-full w-full flex items-center hover:bg-primary-dark transition" onClick={signInWithGoogle} ><div className="h-full p-1 aspect-square bg-light flex items-center justify-center rounded-full"><FcGoogle size="1.5rem" /></div> <span className="flex-1">Crear cuenta con Google</span></button>
                </div>
            </div>
        </section>
    );
}

export default Register;
