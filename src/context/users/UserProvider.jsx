import { useState, useEffect } from "react";
import { auth, db } from "../../config/config.firebase";
import { UserContext } from "./UserContext";
import { getDoc, doc } from "firebase/firestore";

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
            setUser(authUser);
        })

        // Limpia el evento cuando el componente se desmonta
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const getUserRole = async () => {
            if (user) {
                try {
                    const docSnap = await getDoc(doc(db, "users", user.uid));
                    setUserRole(docSnap.data().rol);
                } catch (error) {
                    console.error('Error al obtener datos de usuario:', error);
                }
            }
            setLoading(false);
        }
        getUserRole();

    }, [user]);

    const value = {
        user,
        userRole,
        loading,
        setUser,
        setUserRole
    };

    return (
        <UserContext.Provider
            value={value}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;