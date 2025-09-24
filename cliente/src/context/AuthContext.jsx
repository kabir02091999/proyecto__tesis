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
    //const navigate = useNavigate();

    const login = async (userData) => {
        try {
            setLoading(true);
            setErrors([]);
            const response = await loginService(userData);
            
            console.log("tipo usuario " + response.data.tipoUsuario)
            // Aquí guardamos el token en una cookie después del login
            if (response.data.token) {
                console.log("token "+ response.data.token)
                // Guardar el token en una local storage
                localStorage.setItem('token', response.data.token);
            }

            setUser(response.data);
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
        <AuthContext.Provider value={{ user, loading, isAuthenticated, errors, login}}>
            {children}
        </AuthContext.Provider>
    );
};