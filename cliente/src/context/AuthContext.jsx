import { use } from 'react';
import {createContext, useState , useContext} from 'react';

export const AuthContext = createContext();

export const AseAuth = () => {

    const context =  useContext(AuthContext);
        if(!context) throw new Error('There is no AuthProvider');
        return context;

}

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    
    const userLogin = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    }

    

    return (
        <AuthContext.Provider value={{user, loading, userLogin}}>
            {children}
        </AuthContext.Provider>
    )

}