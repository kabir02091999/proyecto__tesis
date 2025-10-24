
import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { login as loginService, verifyToken as verifyTokenService, crearCalendarioLiturgicos, getCalendario, PostReportes, obtenerReportes, deleteReporte } from '../api/auth';
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
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [token, setToken] = useState(null);
    const [calendario, setCalendario] = useState([]);
    const [reportes, setReportes] = useState([]);
    //const navigate = useNavigate();

    const login = async (userData) => {
        try {
            setLoading(true);
            setErrors([]);
            const response = await loginService(userData);
            setAdmin(response.data.tipoUsuario === 'administrador');
            console.log("tipo usuario " + response.data.tipoUsuario)
            setUser(response.data.tipoUsuario);
            console.log("tipo usuario 111111111111111" + user);
            // Aquí guardamos el token en una cookie después del login
            if (response.data.token) {
                console.log("token " + response.data.token)
                // Guardar el token en una local storage
                localStorage.setItem('token', response.data.tipoUsuario);
            }

            setUser(response.data);
            console.log("usuario en context " + user)
            setIsAuthenticated(true);
            setLoading(false);
            // quiero que me mandes a la ruta admin
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

    const enviarReporte = async (reporteData) => {
        try {
            setLoading(true); // Se agrega
            setErrors([]);
            const response = await PostReportes(reporteData);
            return response.data;
        } catch (error) {
            console.error('Error al enviar el reporte:', error);
            const errorMessage = error.response?.data?.message || 'Error desconocido al enviar el reporte.';
            setErrors([errorMessage]);
            throw new Error(errorMessage);
        } finally {
            setLoading(false); // Se agrega
        }
    };

    const getReportes = useCallback(async () => {
        try {
            setLoading(true);
            setErrors([]);
            const response = await obtenerReportes();
            setReportes(response.data);
        } catch (error) {
            console.error('Error al obtener los reportes:', error);
            setErrors([error.response?.data?.message || 'Error al cargar la lista de reportes.']);
        } finally {
            setLoading(false);
        }
    }, []);

    const eliminarReporte = useCallback(async (id) => {
        try {
            setLoading(true);
            setErrors([]);
            await deleteReporte(id);
            setReportes(prevReportes => prevReportes.filter(r => r.ID_Reporte !== id));
        } catch (error) {
            console.error(`Error al eliminar el reporte ID ${id}:`, error);
            const errorMessage = error.response?.data?.message || 'Error al intentar eliminar el reporte.';
            setErrors([errorMessage]);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    // Este efecto se encarga de verificar la autenticación cuando la app se carga
    useEffect(() => {
        // Verificar si hay un token en local storage
        const token = localStorage.getItem('token');

        if (token) {
            setLoading(true);
            verifyTokenService(token).then(response => {
                console.log("response verify token " + JSON.stringify(response.data))
                setUser(response.data.user);
                //console.log("usuario " + JSON.stringify(response.data.user.tipoUsuario))
                //alert("Bienvenido " + response.data.user.tipoUsuario)
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
        <AuthContext.Provider value={{ reportes, setReportes, eliminarReporte, getReportes, enviarReporte, admin, setAdmin, calendario, Getcalendario, Post_Calendario_liturgico, user, loading, isAuthenticated, errors, login }}>
            {children}
        </AuthContext.Provider>
    );
};