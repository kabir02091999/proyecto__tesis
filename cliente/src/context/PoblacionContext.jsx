import { createContext, useState, useContext, useEffect } from 'react';

//api 
import { getPoblacion } from '../api/auth';

// Crear el contexto
export const PoblacionContext = createContext();

// Hook personalizado para usar el contexto
export const usePoblacion = () => {
    const context = useContext(PoblacionContext);
    if (!context) throw new Error('There is no PoblacionProvider');
    return context;
};

// Proveedor del contexto
export const PoblacionProvider = ({ children }) => {
    const [poblacion, setPoblacion] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getPoblacionByCI = async (ci) => {
        setLoading(true);
        setError(null);
        console.log("ci en context " + ci)
        /* try {
            const response = await fetch(`/api/inscripto/${ci}`);
            if (!response.ok) throw new Error('Error fetching population data');
            const data = await response.json();
            setPoblacion(data);
        } catch (err) {
            setError(err.message);
        } */
        setLoading(false);
    };

    return (
        <PoblacionContext.Provider value={{ poblacion, loading, error, getPoblacionByCI }}>
            {children}
        </PoblacionContext.Provider>
    );
}