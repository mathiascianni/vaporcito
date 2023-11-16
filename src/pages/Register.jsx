//Firebase Register
import { auth, googleProvider, db } from "../config/config.firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

//Components
import { Input, Title, InputErrorNotification } from "../components/_index";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//Constants
import firebaseErrors from "../constants/firebaseErrors";

//Icons
import { FcGoogle } from "react-icons/fc";
import { IoAlertCircle } from "react-icons/io5";
import { BsArrowLeftShort } from "react-icons/bs";

//Utils
import registerValidationRules from "../constants/registerValidationRules";
import ErrorHandler from "../utils/ErrorHandler";


const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    //Crear con email
    const signIn = async (e) => {
        e.preventDefault();

        const newErrors = {};

        Object.entries(registerValidationRules).forEach(([field, rules]) => {
            rules.forEach((rule) => {
                if (rule.condition(eval(field))) {
                    if (!newErrors[field]) {
                        newErrors[field] = [];
                    }
                    newErrors[field].push(rule.message);
                }
            });
        });

        if (password !== confirmPassword || confirmPassword === "") {
            newErrors.confirmPassword = ["Las contraseñas no coinciden"];
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            throw new ErrorHandler("Se han producido errores");
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => { return userCredential.user });
            const docRef = doc(db, "users", userCredential.uid);

            //Todo: añadir el resto de campos que no son obligatorios, pero que deben estar mínimamente vacíos
            await setDoc(docRef, {
                email: userCredential.email,
                userName: userName,
                rol: "user",
            });
            setErrors({});
            navigate("/");
        } catch (error) {
            console.error(error.message);
        }
    }

    //Crear con Google
    const signInWithGoogle = async () => {
        try {
            const userCredential = await signInWithPopup(auth, googleProvider).then((userCredential) => { return userCredential.user });
            const docRef = doc(db, "users", userCredential.uid);

            //Todo: añadir el resto de campos que no son obligatorios, pero que deben estar mínimamente vacíos
            await setDoc(docRef, {
                email: userCredential.email,
                userName: "",
                rol: "user",
            });
            navigate("/");
        } catch (error) {
            console.error(error);
        }
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
                            <div>
                                <Input type="text" name="username" placeholder="Matna" value={userName} change={(e) => setUserName(e.target.value)} >Nombre de usuario</Input>
                                <InputErrorNotification errors={errors} field="userName" />
                            </div>
                            <div>
                                <Input type="email" name="email" placeholder="example@mail.com" change={(e) => setEmail(e.target.value)} value={email}>Email</Input>
                                <InputErrorNotification errors={errors} field="email" />
                            </div>
                            <div>
                                <Input type="password" name="password" placeholder="Ingresá tu contraseña" change={(e) => setPassword(e.target.value)} value={password}>Contraseña</Input>
                                <InputErrorNotification errors={errors} field="password" />
                            </div>
                            <div>
                                <Input type="password" name="repassword" placeholder="Reingresá tu contraseña" change={(e) => setConfirmPassword(e.target.value)} value={confirmPassword}>Confirmar contraseña</Input>
                                <InputErrorNotification errors={errors} field="confirmPassword" />
                            </div>
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
