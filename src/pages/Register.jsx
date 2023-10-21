//Firebase Register
import { auth, googleProvider } from "../config/config.firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

//Components
import { Input, Title, Button } from "../components/_index";
import { useState } from "react";

//Constants
import firebaseErrors from "../constants/firebaseErrors";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    //Crear con email
    const signIn = async (e) => {
        e.preventDefault();

        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            setErrors(error.code);
        }
    }

    //Crear con Google
    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error(error);
        }
    }

    //Cerrar sesión
    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error(error);
        }
    }

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }

    return (
        <section className="flex flex-col w-full h-screen justify-center items-center py-8">
            <form className="flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                    <span className="text-center">
                        <Title type="h1">Registrarme</Title>
                    </span>
                    <p>¿Ya tenés una cuenta? <a href="#">Iniciá sesión</a></p>
                    <img src={auth?.currentUser?.photoURL} alt="" className="rounded-full" />
                    <p>usuario: <span className="font-bold">{auth?.currentUser?.email}</span></p>
                    <Input type="email" name="email" placeholder="Ingresá tu correo" change={(e) => handleChangeEmail(e)}>Email</Input>
                    <Input type="password" name="password" placeholder="Ingresá tu contraseña" change={(e) => handleChangePassword(e)}>Password</Input>
                    {errors ? <span className="text-red-500">{firebaseErrors[errors]}</span> : null}
                </div>

                <Button action={signIn} type="submit">Crear cuenta</Button>
            </form>
            <div className="flex flex-col gap-4 mt-4">
                <Button action={signInWithGoogle}>Crear con Google</Button>
                <Button action={logout}>Cerrar sesión</Button>
            </div>

            
        </section>
    );
}

export default Register;
