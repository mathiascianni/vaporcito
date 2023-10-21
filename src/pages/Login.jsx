import { Input, Title, Button } from "../components/_index";


const Login = () => {
    return (
        <section className="flex w-full h-screen justify-center items-center pattern py-8">
            <div className="flex flex-col justify-between bg-zinc-900/70 rounded-md p-8 gap-2 aspect-[3/5] max-h-full  w-[680px] backdrop-blur-sm">
                <div className="flex flex-col gap-4">
                    <span className="text-center">
                        <Title type="h1">Iniciar Sesión</Title>
                    </span>
                    <p>¿No tenés una cuenta? <a href="#">Creá una acá</a></p>

                    <Input type="email" name="email" placeholder="Ingresá tu correo">Email</Input>
                    <Input type="password" name="password" placeholder="Ingresá tu contraseña">Password</Input>

                    <a href="#">¿Olvidó su contraseña?</a>
                </div>
                <Button>Iniciar Sesión</Button>
            </div>
        </section>
    );
}

export default Login;
