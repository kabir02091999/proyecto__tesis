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
    const [poblacion, setPoblacion] = useState(null); // Iniciar en null para manejar "no encontrado"
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getPoblacionByCI = async (CI) => {
        setLoading(true);
        setError(null); // Limpiar errores anteriores
        setPoblacion(null); // Limpiar datos anteriores antes de la búsqueda

        try {
            const response = await getPoblacion(CI);
            
            // Si la respuesta es exitosa (código 2xx), procedemos
            const data = response.data;
            console.log("Datos de población obtenidos:", data);
            setPoblacion(data);

        } catch (err) {
            
            // 1. Verificar si el error es una respuesta HTTP (Axios)
            if (err.response) {
                // 2. Manejar el caso específico 404 (Not Found)
                if (err.response.status === 404) {
                    console.log(`CI no encontrada (${CI}). Estableciendo población a null.`);
                    setPoblacion(null); // Esto dispara el mensaje "No se encontraron resultados" en el frontend
                    // No establecemos setError(err.message) porque 404 es una respuesta "controlada"
                } else {
                    // Manejar otros errores HTTP (400, 500, etc.)
                    const errorMessage = err.response.data.message || `Error del servidor: ${err.response.status}`;
                    setError(errorMessage);
                    console.error('Error de respuesta HTTP:', err.response.data);
                }
            } else {
                // 3. Manejar errores de red (p. ej., servidor apagado)
                setError("Error de red o el servidor no está disponible.");
                console.error('Error de red:', err.message);
            }
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