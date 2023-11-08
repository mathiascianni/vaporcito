import { useState } from "react";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

const MediaPreview = ({ media }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const filesPerPage = 3;

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        } else {
            setCurrentPage(Math.ceil(media.length / filesPerPage));
        }
    };

    const handleNext = () => {
        if (currentPage < Math.ceil(media.length / filesPerPage)) {
            setCurrentPage(currentPage + 1);
        } else {
            setCurrentPage(1);
        }
    };

    const startIdx = (currentPage - 1) * filesPerPage;
    const endIdx = startIdx + filesPerPage;
    return (
        <div className="bg-input-light p-4 relative">
            <button type="button" onClick={handlePrev} className="absolute top-1/2 left-2 -translate-y-1/2 z-10 bg-primary aspect-square rounded-full flex items-center justify-center p-2.5 hover:bg-primary-dark transition"><span className="sr-only">Anterior</span><AiFillCaretLeft /></button>
            <div className="grid grid-cols-3 gap-4 overflow-x-hidden relative">
                {media.slice(startIdx, endIdx).map((file, i) => (
                    <div className="aspect-[3/2]" key={i}>
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
                    </div>
                ))}
            </div>
            <button type="button" onClick={handleNext} className="absolute top-1/2 right-2 -translate-y-1/2 z-10 bg-primary aspect-square rounded-full flex items-center justify-center p-2.5 hover:bg-primary-dark transition"><span className="sr-only">Siguiente</span><AiFillCaretRight /></button>
        </div>
    );
}

export default MediaPreview;
