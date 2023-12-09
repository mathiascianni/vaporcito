const CheckMediaType = ({ file }) => {
    return (
        <>
            {file.type.startsWith('image/') ? (
                <img src={URL.createObjectURL(file)} alt={file.name} className="object-cover object-center w-full h-full" />
            ) : file.type.startsWith('video/') ? (
                <video controls className="object-cover object-center w-full h-full">
                    <source src={URL.createObjectURL(file)} type={file.type} />
                    Tu navegador no admite la reproducción de video.
                </video>
            ) : (
                <p>Vista previa no disponible</p>
            )}
        </>
    )
}

export default CheckMediaType;