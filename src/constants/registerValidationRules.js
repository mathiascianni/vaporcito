const registerValidationRules = {
    password: [
        { condition: (password) => password.trim() === "", message: "La contraseña es requerida" },
        { condition: (password) => password.length < 6, message: "La contraseña debe tener al menos 6 caracteres" },
    ],
    userName: [
        { condition: (userName) => userName.trim() === "", message: "El nombre de usuario es requerido" },
        { condition: (userName) => userName.length < 3, message: "El nombre de usuario debe tener al menos 3 caracteres" },
    ],
    email: [
        { condition: (email) => email.trim() === "", message: "El correo es requerido" },
        { condition: (email) => !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email) && email.trim() !== "", message: "El correo no es válido" },
    ],
}

export default registerValidationRules;