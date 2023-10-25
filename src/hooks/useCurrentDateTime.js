import { useState } from 'react';

function useCurrentDateTime() {
    const getCurrentDateTime = () => {
        const now = new Date();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');

        return `${month}_${day}_${hours}_${minutes}_${seconds}`;
    };

    const [currentDateTime, setCurrentDateTime] = useState(getCurrentDateTime());

    return currentDateTime;
}

export default useCurrentDateTime;
