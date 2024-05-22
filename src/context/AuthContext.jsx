import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function checkLogin() {
            try {
                const storedToken = localStorage.getItem('token');
                if (storedToken) {
                    const res = await verifyTokenRequest(storedToken);
                    setUser(res.data);
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        }
        checkLogin();
    }, []);

    const signup = async (userData) => {
        try {
            const res = await registerRequest(userData);
            setUser(res.data);
            setIsAuthenticated(true);
            localStorage.setItem('token', res.data.token); // Guardar el token en localStorage
        } catch (error) {
            setErrors(error.response.data);
        }
    };

    const signin = async (userData) => {
        try {
            const res = await loginRequest(userData);
            console.log("respues login", res)
            setUser(res.data);
            setIsAuthenticated(true);
            const token = res.data.token;
            localStorage.setItem('token', token);
            if (localStorage.getItem('token') === token) {
                console.log('Token guardado correctamente:', token);
            } else {
                console.error('Error al guardar el token en localStorage');
            }

        } catch (error) {
            setErrors(error.response.data);
        }
    };

    const signout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('token'); // Eliminar el token del localStorage al cerrar sesión
    };

    return (
        <AuthContext.Provider value={{
            signup,
            signin,
            signout,
            user,
            loading,
            isAuthenticated,
            errors
        }}>
            {children}
        </AuthContext.Provider>
    );
};
