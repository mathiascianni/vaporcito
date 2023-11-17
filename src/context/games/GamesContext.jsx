import { createContext, useContext } from "react";

const GamesContext = createContext();

const useGames = () => {
    const context = useContext(GamesContext);
    if (!context) {
        throw new Error("useGames debe ser utilizado dentro de un GamesProvider");
    }
    return context;
};

export { GamesContext, useGames };