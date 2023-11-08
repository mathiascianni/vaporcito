//Components
import { MainTemplate, Login, Register, Home, CreateGame, GamesDashboard, EditGame, GameDetails } from "../pages/_index";

//Router
import { Route, Routes } from "react-router-dom";

const MainRoutes = () => {
    return (
        <>
            <Routes>
                {/* Public routes */}
                <Route path="/" element={<MainTemplate><Home /></MainTemplate>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/game/:id" element={<MainTemplate><GameDetails /></MainTemplate>} />

                {/* Admin routes */}
                <Route path="/admin" element={<MainTemplate><GamesDashboard /></MainTemplate>} />
                <Route path="/admin/create-game" element={<MainTemplate><CreateGame /></MainTemplate>} />
                <Route path="/admin/edit-game/:id" element={<MainTemplate><EditGame /></MainTemplate>} />

                <Route path="*" element={<div>404</div>} />
            </Routes>
        </>
    );
}

export default MainRoutes;
