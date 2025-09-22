import { createContext, useState, useContext, useEffect } from 'react';
import { login as loginService, verifyToken as verifyTokenService } from '../api/auth';
import cookie from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { use } from 'react';

export const AuthContext = createContext();

export const AseAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('There is no AuthProvider');
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [token , setToken] = useState(null);

    const login = async (userData) => {
        try {
            setLoading(true);
            setErrors([]);
            const response = await loginService(userData);
            
            // Aquí guardamos el token en una cookie después del login
            if (response.data.token) {
                console.log("token "+ response.data.token)
            }

            setUser(response.data);
            setIsAuthenticated(true);
            setLoading(false);
            // quiero que me mandes a la ruta admin
            

        } catch (error) {
            console.error('Error during login:', error);
            setErrors(error.response?.data?.message || 'Login failed');
            setLoading(false);
            setIsAuthenticated(false);
        }
    };
    
    // Este efecto se encarga de verificar la autenticación cuando la app se carga
    useEffect(() => {
        const checkLogin = async () => {
            const token = cookie.get('token');
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                // Llama a la API del backend para verificar el token
                const response = await verifyTokenService();
                console.log('Token verification response:', response);
                if (response.data) {
                    setUser(response.data);
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error('Token verification failed:', error);
                cookie.remove('token'); // Si falla, borramos el token
                setUser(null);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };
        checkLogin();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, isAuthenticated, errors, login }}>
            {children}
        </AuthContext.Provider>
    );
};