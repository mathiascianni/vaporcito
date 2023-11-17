import { useState } from "react";
import { BsImageFill } from 'react-icons/bs';

const SkeletonMediaLoader = ({ media, type, hovereable = false, controls=false, selected = false }) => {
    const [loading, setLoading] = useState(true);
    const mediaStyles = `w-full h-full object-cover ${loading ? "hidden" : "block"} ${hovereable ? "cursor-pointer brightness-50 hover:brightness-100 transition" : ""} ${selected ? "brightness-100" : ""}`

    return (
        <>
            {
                loading && (
                    <div className="aspect-[3/2] bg-gray-300 animate-pulse flex items-center justify-center"><BsImageFill className="text-4xl" /></div>
                )
            }
            {
                type === 'image' && (
                    <img
                        src={media}
                        alt="img"
                        className={mediaStyles}
                        onLoad={() => setLoading(false)}
                    />
                )
            }
            {
                type === 'video' && (
                    <video
                        alt="video"
                        className={mediaStyles}
                        onLoad={() => setLoading(false)}
                        controls={controls}
                    >
                        <source src={media} />
                    </video>
                )
            }
        </>
    )
}

export default SkeletonMediaLoader;
