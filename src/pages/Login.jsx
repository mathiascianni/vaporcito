import { useState } from "react";
import { Input, Title, Button } from "../components/_index";
import { auth } from "../config/config.firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const login = async (e) => {
        e.preventDefault();
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("user logged", userCredential)
                navigate("/");
            })
            .catch((error) => {
                console.error(error)
            });
    }

    return (
        <section className="flex w-full h-screen justify-center items-center pattern py-8">
            <form className="flex flex-col justify-between bg-zinc-900/70 rounded-md p-8 gap-2 aspect-[3/5] max-h-full  w-[680px] backdrop-blur-sm" onSubmit={login}>
                <div className="flex flex-col gap-4">
                    <span className="text-center">
                        <Title type="h1">Iniciar Sesión</Title>
                    </span>
                    <p>¿No tenés una cuenta? <a href="#">Creá una acá</a></p>

                    <Input type="email" name="email" placeholder="Ingresá tu correo" change={handleChangeEmail} value={email}>Email</Input>
                    <Input type="password" name="password" placeholder="Ingresá tu contraseña" change={handleChangePassword} value={password}>Password</Input>

                    <a href="#">¿Olvidó su contraseña?</a>
                </div>
                <Button>Iniciar Sesión</Button>
            </form>
        </section>
    );
}

export default Login;
