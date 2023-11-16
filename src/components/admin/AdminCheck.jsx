import { Navigate } from "react-router-dom";
import { useUser } from "../../context/User/UserContext";

const AdminCheck = ({ children }) => {
    const { userRole, loading } = useUser();

    if (!userRole && userRole !== "admin" && !loading) return <Navigate to="/" />;
    return <>{children}</>;
};

export default AdminCheck;