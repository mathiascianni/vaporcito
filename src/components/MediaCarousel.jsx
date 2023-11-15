import { useEffect, useState } from "react";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { SkeletonMediaLoader } from "./_index";

const MediaCarousel = ({ media }) => {
    const [mediaPreview, setMediaPreview] = useState("");
    const [mediaType, setMediaType] = useState("");
    const [mediaArr, setMediaArr] = useState([]);
    const [mediaIndex, setMediaIndex] = useState(0);

    const [currentPage, setCurrentPage] = useState(1);
    const filesPerPage = 3;

    const startIdx = (currentPage - 1) * filesPerPage;
    const endIdx = startIdx + filesPerPage;

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

    const handleMediaPreview = (url, type, index=0) => {
        setMediaPreview(url);
        setMediaType(type);
        setMediaIndex(index);
    }

    const newMediaArr = [];
    useEffect(() => {
        if (media.length > 0) {
            media.map((url, i) => {
                const extensionMatch = url.match(/\.(mp4|webm|jpg|jpeg|png|gif|webp)/i);
                const extension = extensionMatch ? extensionMatch[0].toLowerCase().substring(1) : "";


                if (extension === "jpg" || extension === "jpeg" || extension === "png" || extension === "gif" || extension === "webp") {
                    newMediaArr.push({ url: url, type: "image", index: i });
                } else {
                    newMediaArr.push({ url: url, type: "video", index: i });
                }
            })
            setMediaArr(newMediaArr);
        }
    }, [media])

    useEffect(() => {
        if (mediaArr.length > 0) handleMediaPreview(mediaArr[0].url, mediaArr[0].type);
        console.log(mediaArr)
    }, [mediaArr])

    return (
        <div>
            {mediaPreview && (
                <div className="min-w-full mb-4">
                    <SkeletonMediaLoader media={mediaPreview} type={mediaType} controls/>
                </div>
            )}
            <div className="grid grid-cols-3 grid-flow-row-dense gap-4 overflow-x-hidden relative w-full mb-4">
                <button type="button" onClick={handlePrev} className="absolute top-1/2 left-2 -translate-y-1/2 z-10 bg-primary aspect-square rounded-full flex items-center justify-center p-2.5 hover:bg-primary-dark transition"><span className="sr-only">Anterior</span><AiFillCaretLeft /></button>
                {mediaArr.slice(startIdx, endIdx).map((file, i) => (
                    <div className={`aspect-[3/2] ${file.index === mediaIndex ? "border border-2 border-primary" : ""}`} key={i} >
                        <div className="h-full cursor-pointer group overflow-hidden " onClick={() => handleMediaPreview(file.url, file.type, file.index)}>
                            <SkeletonMediaLoader media={file.url} type={file.type} hovereable />
                        </div>
                    </div>
                ))}
                <button type="button" onClick={handleNext} className="absolute top-1/2 right-2 -translate-y-1/2 z-10 bg-primary aspect-square rounded-full flex items-center justify-center p-2.5 hover:bg-primary-dark transition"><span className="sr-only">Siguiente</span><AiFillCaretRight /></button>
            </div>
        </div>
    )
}

export default MediaCarousel;