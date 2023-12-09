import { useState } from "react";

const usePaginationSwipe = (media) => {
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

    const first = (currentPage - 1) * filesPerPage;
    const end = first + filesPerPage;

    return {
        handleNext,
        handlePrev,
        first,
        end,
    }
}

export default usePaginationSwipe;