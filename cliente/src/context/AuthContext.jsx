
import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { login as loginService, verifyToken as verifyTokenService, crearCalendarioLiturgicos, getCalendario, PostReportes, obtenerReportes, deleteReporte } from '../api/auth';

export const AuthContext = createContext();

export const AseAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('There is no AuthProvider');
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);

    const [calendario, setCalendario] = useState([]);


    

    const login = async (userData) => {
        try {
            setLoading(true);
            setErrors([]);
            const response = await loginService(userData);
            setAdmin(response.data.tipoUsuario === 'administrador');
            setUser(response.data.tipoUsuario);
            if (response.data.token) {
                localStorage.setItem('token', response.data.tipoUsuario);
            }
            setUser(response.data);
            setIsAuthenticated(true);
            setLoading(false);
            return response.data;
        } catch (error) {
            console.error('Error during login:', error);
            setErrors(error.response?.data?.message || 'Login failed');
            setLoading(false);
            setIsAuthenticated(false);
            return error;
        }
    };

    const Post_Calendario_liturgico = async (calendarioData) => {
        try {
            setLoading(true);
            setErrors([]);
            const response = await crearCalendarioLiturgicos(calendarioData);
            return response.data;
        } catch (error) {
            console.error('Error during creating calendario liturgico:', error);
            setErrors(error.response?.data?.message || 'Creating calendario liturgico failed');
            setLoading(false);
            return error;
        }
        finally {
            setLoading(false);
        }

    };

    const Getcalendario = async () => {
        try {
            setLoading(true);
            setErrors([]);
            const response = await getCalendario();
            setCalendario(response.data);

        }
        catch (error) {
            console.error('Error during getting calendario liturgico:', error);
            setErrors(error.response?.data?.message || 'Getting calendario liturgico failed');
            setLoading(false);
            return error;
        }
        finally {
            setLoading(false);
        }
    };


    
    useEffect(() => {

        const token = localStorage.getItem('token');

        if (token) {
            setLoading(true);
            verifyTokenService(token).then(response => {
                setUser(response.data.user);
                setIsAuthenticated(true);
                setLoading(false);
            }).catch(error => {
                console.error('Error verifying token:', error);
                setUser(null);
                setIsAuthenticated(false);
                setLoading(false);
            });
        } else {
            setLoading(false);
            setIsAuthenticated(false);

        }


    }, []);
   

    return (
        <AuthContext.Provider value={{
            admin,
            setAdmin,
            calendario,
            Getcalendario,
            Post_Calendario_liturgico,
            user,
            loading,
            isAuthenticated,
            errors,
            login
        }}>
            {children}
        </AuthContext.Provider>
    );
};