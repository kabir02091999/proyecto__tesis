import { createContext, useState, useContext } from 'react';
import { login as loginService } from '../api/auth';

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
    
    const userLogin = (userData) => {
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const login = async (user) => {
        try {
            setLoading(true);
            setErrors([]);
            // Aquí se realiza la llamada real al servicio de login del backend
            const response = await loginService(user);
            
            console.log("Respuesta del backend:", response.data);
            
            userLogin(response.data);
            setIsAuthenticated(true);
            setLoading(false);
        } catch (error) {
            console.error('Error during login:', error);
            setErrors(error.response?.data?.message || 'Login failed');
            setLoading(false);
            setIsAuthenticated(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, isAuthenticated, errors, login }}>
            {children}
        </AuthContext.Provider>
    );
};