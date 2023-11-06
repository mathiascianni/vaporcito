//Components
import { useState } from "react";
import { Input, Title } from "../components/_index";
import { useNavigate, Link } from "react-router-dom";

//Firebase
import { auth, googleProvider } from "../config/config.firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

//Icons
import { FcGoogle } from "react-icons/fc";
import { IoAlertCircle } from "react-icons/io5";
import { BsArrowLeftShort } from "react-icons/bs";

//Constants
import firebaseErrors from "../constants/firebaseErrors";

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    }

    const login = async (e) => {
        e.preventDefault();
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("user logged", userCredential)
                navigate("/");
            })
            .catch((error) => {
                console.error(error.code);
                setErrors(error.code);
            });
    }

    return (
        <section className="w-full h-screen lg:py-8 bg-[url('/img/dragon_bg.jpg')] bg-no-repeat bg-cover bg-center md:bg-contain md:bg-right ">
            <div className="md:max-w-[600px] lg:max-w-[600px] max-w-full lg:ml-[15%] mx-auto p-2 h-full">
                <div className="bg-input/60 h-full rounded-md backdrop-blur-md p-8 overflow-y-scroll md:overflow-y-auto">
                    <Link to="/" className="inline-flex items-center gap-1 mb-8 hover:text-accent transition"><BsArrowLeftShort size="1.5rem" /> Volver</Link>
                    <Title type="h1">Iniciar sesión</Title>
                    <p className="my-4">¿No tenés una cuenta? <Link to="/register" className="text-accent hover:text-white transition">Creá una acá</Link></p>
                    <form onSubmit={login}>
                        <div className="flex flex-col gap-4">
                            <Input type="email" name="email" placeholder="example@mail.com" change={(e) => handleChangeEmail(e)}>Email</Input>
                            <Input type="password" name="password" placeholder="Ingresá tu contraseña" change={(e) => handleChangePassword(e)}>Contraseña</Input>
                            {errors.length > 0 ? <span className="text-red-500 flex items-center gap-2"><IoAlertCircle size="1.5rem" /> {firebaseErrors[errors]}</span> : null}
                        </div>
                        <button type="submit" className="bg-primary text-white px-4 py-2 rounded-full w-full mt-8 hover:bg-primary-dark transition">Iniciar sesión</button>
                    </form>
                    <div className="flex items-center gap-8">
                        <div className="w-full mx-auto h-[1px] bg-light my-8"></div>
                        <p>o</p>
                        <div className="w-full mx-auto h-[1px] bg-light my-8"></div>
                    </div>
                    <button className="bg-primary text-white px-4 py-1 rounded-full w-full flex items-center hover:bg-primary-dark transition" onClick={signInWithGoogle} ><div className="h-full p-1 aspect-square bg-light flex items-center justify-center rounded-full"><FcGoogle size="1.5rem" /></div> <span className="flex-1">Iniciar sesión con Google</span></button>
                </div>
            </div>
        </section>
    );
}

export default Login;
