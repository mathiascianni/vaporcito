import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./main.css";
import UserProvider from "./context/users/UserProvider.jsx";
import GamesProvider from "./context/games/GamesProvider.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserProvider>
    <GamesProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GamesProvider>
  </UserProvider>,
);