import { useEffect, useState } from "react";


const MediaCarousel = ({ media }) => {
    const [mediaPreview, setMediaPreview] = useState("");
    const [mediaType, setMediaType] = useState("");

    const handleMediaPreview = (url, type) => {
        setMediaPreview(url);
        setMediaType(type);
    }

    useEffect(() => {
        if (media?.length > 0) {
            handleMediaPreview(media[0], 'image')
        }
    }, [media])

    return (
        <div>
            {mediaPreview && (
                <div className="min-w-full mb-4">
                    {mediaType === 'video' ? (
                        <video controls className="object-cover object-center w-full h-full">
                            <source src={mediaPreview} type="video/mp4" className="object-cover object-center w-full h-full" />
                        </video>
                    ) : (
                        <img src={mediaPreview} alt="Preview" className="object-cover object-center w-full h-full" />
                    )}
                    
                </div>
            )}
            <div className="grid grid-cols-3 gap-4 mb-4">

                {media?.map((url, index) => {
                    const extensionMatch = url.match(/\.(mp4|webm|jpg|jpeg|png)/i)

                    if (extensionMatch) {
                        const extension = extensionMatch[0].toLowerCase();

                        if (extension === '.mp4' || extension === '.webm') {
                            return (
                                <div key={index} className="h-full cursor-pointer group overflow-hidden" onClick={() => handleMediaPreview(url, 'video')}>
                                    <video className="group-hover:scale-105 transition">
                                        <source src={url} type={`video/${extension.substring(1)}`} className="object-cover object-center w-full h-full " />
                                    </video>
                                </div>
                            );
                        } else {
                            return (
                                <div key={index} className="h-full cursor-pointer group overflow-hidden" onClick={() => handleMediaPreview(url, 'image')}>
                                    <img src={url} alt={`Image ${index}`} className="object-cover object-center w-full h-full group-hover:scale-105 transition" />
                                </div>
                            );
                        }
                    } else {
                        // Maneja otros tipos de contenido (opcional)
                        return (
                            <div key={index}>
                                <p>Enlace no compatible: {url}</p>
                            </div>
                        );
                    }
                })}
            </div>
        </div>
    )
}

export default MediaCarousel;