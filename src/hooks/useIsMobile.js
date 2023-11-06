import { useState, useEffect } from 'react';

function useIsMobile() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 767);

    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth < 767);
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return isMobile;
}

export default useIsMobile;