//Components
import { MainTemplate, Login, Register, Home, CreateGame } from "../pages/_index";

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

                {/* Admin routes */}
                <Route path="/admin/create-game" element={<MainTemplate><CreateGame /></MainTemplate>} />

                <Route path="*" element={<div>404</div>} />
            </Routes>
        </>
    );
}

export default MainRoutes;
