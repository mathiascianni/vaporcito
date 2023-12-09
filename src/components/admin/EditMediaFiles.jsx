import { useState, useEffect } from "react";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { CheckMediaType, SkeletonMediaLoader } from "../_index";
import { IoTrashBin } from "react-icons/io5";
import usePaginationSwipe from "../../hooks/usePaginationSwipe";

const EditMediaFiles = ({ media, setMedia, title, setDbMedia, setActualMedia, dbMedia, actualMedia }) => {
    const { handleNext, handlePrev, first, end } = usePaginationSwipe(media);
    const handleRemove = (index) => {
        const findMediaByID = media.find(obj => obj.id === index);
        const findDbMediaByID = dbMedia.find(obj => obj.id === index);
        const findActualMediaByID = actualMedia.find(obj => obj.id === index);

        if (findMediaByID) {
            const newMedia = media.filter(obj => obj.id !== index);
            setMedia(newMedia);
        }

        if (findDbMediaByID) {
            const newDbMedia = dbMedia.filter(obj => obj.id !== index);
            setDbMedia(newDbMedia);
        }

        if (findActualMediaByID) {
            const newActualMedia = actualMedia.filter(obj => obj.id !== index);
            setActualMedia(newActualMedia);
        }

        if (media.slice(first, end).length === 1 && media.length > 1) {
            handlePrev();
        }
    }

    return (
        <div className="grid grid-cols-3 grid-flow-row-dense gap-4 overflow-x-hidden relative w-full mb-4">
            <button
                type="button"
                onClick={handlePrev}
                className="absolute top-1/2 left-2 -translate-y-1/2 z-10 bg-primary aspect-square rounded-full flex items-center justify-center p-2.5 hover:bg-primary-dark transition">
                <span className="sr-only">Anterior</span>
                <AiFillCaretLeft /></button>
            {
                media.slice(first, end).map((file, i) => (
                    <div className="aspect-[3/2] cursor-pointer relative group" key={i} onClick={() => handleRemove(file.id)}>
                        {
                            file.type === "image" ?
                                <img src={file.url} alt={`Imagen promocional de ${title}`} className="object-cover object-center w-full h-full" />
                                :
                                <video src={file.url} alt={`Video promocional de ${title}`} className="object-cover object-center w-full h-full" />
                        }
                        <div className="absolute top-0 left-0 transition duration-300 group-hover:bg-dark/70 w-full h-full group-hover:backdrop-blur-sm flex items-center justify-center flex-col text-error/0 group-hover:text-error "><IoTrashBin className="text-xl" /> Eliminar</div>
                    </div>
                ))
            }
            <button
                type="button"
                onClick={handleNext}
                className="absolute top-1/2 right-2 -translate-y-1/2 z-10 bg-primary aspect-square rounded-full flex items-center justify-center p-2.5 hover:bg-primary-dark transition">
                <span className="sr-only">Siguiente</span>
                <AiFillCaretRight /></button>
        </div>
    )
}

export default EditMediaFiles;