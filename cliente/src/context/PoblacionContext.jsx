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
    const [poblacion, setPoblacion] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getPoblacionByCI = async (CI) => {
        setLoading(true);
        setError(null);
        //console.log("ci en context " + CI)
        try {
            const response = await getPoblacion(CI);
            //console.log("response en context " + JSON.stringify(response))
            console.log(response)
            const data = response.data;
            console.log("arrrorrrrrrrrrrr " + JSON.stringify(data))
            setPoblacion(data);
            
        } catch (err) {
            console.error('Error fetching population data:', err);
            setError(err.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        console.log("poblacion en context " + JSON.stringify(poblacion))
    }, [poblacion]);

    return (
        <PoblacionContext.Provider value={{ poblacion, loading, error, getPoblacionByCI }}>
            {children}
        </PoblacionContext.Provider>
    );
}