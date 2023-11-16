//Components
import { MainTemplate, Login, Register, Home, CreateGame, GamesDashboard, EditGame, GameDetails } from "../pages/_index";
import { AdminCheck } from "../components/_index";

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
                <Route path="/admin" element={<AdminCheck><MainTemplate><GamesDashboard /></MainTemplate></AdminCheck>} />
                <Route path="/admin/create-game" element={<AdminCheck><MainTemplate><CreateGame /></MainTemplate></AdminCheck>} />
                <Route path="/admin/edit-game/:id" element={<AdminCheck><MainTemplate><EditGame /></MainTemplate></AdminCheck>} />

                <Route path="*" element={<div>404</div>} />
            </Routes>
        </>
    );
}

export default MainRoutes;
