import { createContext , useState, useContext , useEffect, useCallback } from "react";

export const FinancieroContext = createContext();

//api
import { registro_Transacciones as  registro_Transacciones1 , obtener_Transacciones} from '../api/auth';

export const useFinancieroContext = () => {
    const context = useContext(FinancieroContext);
    if (!context) throw new Error('There is no FinancieroProvider');
    return context;
}

export const FinancieroProvider = ({children}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [transacciones, setTransacciones] = useState([]);
    
    const registrarTransacciones = async (transaccionesArray) => {
        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        // El backend espera el objeto con la clave 'transacciones'
        const payload = { transacciones: transaccionesArray }; 

        try {
            const response = await registro_Transacciones1(payload);
            
            const message = response.data?.message || 'Transacciones registradas con éxito.';
            setSuccessMessage(message);
            
            return { success: true, message: message };

        } catch (err) {
            const msg = err.response?.data?.message || 'Error de red o del servidor al registrar transacciones.';
            setError(msg);
            
            return { success: false, message: msg };

        } finally {
            setLoading(false);
        }
    };

    const fetchTransacciones = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await obtener_Transacciones();
            setTransacciones(response.data.data || []);
        } catch (err) {
            const msg = err.response?.data?.message || 'Error al obtener transacciones.';
            setError(msg);
        } finally {
            setLoading(false);
        }
    }, [setLoading, setError, setTransacciones]);

    useEffect(() => {
        console.log("Financiero Context Mounted");
    }, []);

    return (
        <FinancieroContext.Provider value={{registrarTransacciones,
            loading,
            error,
            successMessage,
            setError, 
            setSuccessMessage,
            fetchTransacciones
            ,transacciones
            }}>
            {children} 
        </FinancieroContext.Provider>
    )
}
    