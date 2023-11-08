const validationRules = {
    title: [
        { condition: (title) => title.trim() === "", message: "El nombre del juego no puede estar vacío" },
        { condition: (title) => title.trim().length > 50, message: "El nombre del juego no puede superar los 50 caracteres" },
        { condition: (title) => title.trim().length < 3, message: "El nombre del juego debe tener al menos 3 caracteres" }
    ],
    desc: [
        { condition: (desc) => desc.trim() === "", message: "La descripción no puede estar vacía" },
        { condition: (desc) => desc.length > 500, message: "La descripción no puede superar los 500 caracteres" },
        { condition: (desc) => desc.trim() < 3, message: "La descripción debe tener al menos 3 caracteres" }
    ],
    price: [
        { condition: (price) => price === "", message: "El precio no puede estar vacío" },
        { condition: (price) => price < 0, message: "El precio no puede ser negativo" }
    ],
    languages: [
        { condition: (languages) => languages.length === 0, message: "Debe seleccionar al menos un lenguaje" },
    ],
    platforms: [
        { condition: (platforms) => platforms.length === 0, message: "Debe seleccionar al menos una plataforma" },
    ],
    developer: [
        { condition: (developer) => developer.trim() === "", message: "El desarrollador no puede estar vacío" },
    ],
    esrb: [
        { condition: (esrb) => esrb.trim() === "", message: "El rating no puede estar vacío" },
    ],
    genres: [
        { condition: (genres) => genres.length === 0, message: "Debe seleccionar al menos un genero" },
    ],
    imageUpload: [
        { condition: (imageUpload) => imageUpload === null, message: "Debe seleccionar una imagen" },
    ],
    selectedMedia: [
        { condition: (selectedMedia) => selectedMedia.length === 0, message: "Debe seleccionar al menos un archivo" },
    ],
    multiplayer: [
        { condition: (multiplayer) => multiplayer.length === 0, message: "Debe seleccionar al menos una característica" },
    ],
    coverImage: [
        { condition: (coverImage) => coverImage === null, message: "Debe seleccionar una imagen" },
    ]
}

export default validationRules;