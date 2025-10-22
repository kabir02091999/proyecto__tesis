import { createContext , useState, useContext , useEffect, useCallback } from "react";

export const FinancieroContext = createContext();


//api
import { 
    registro_Transacciones as registro_Transacciones1, 
    obtener_Transacciones, 
    obtenerTransaccionesPorPeriodo
} from '../api/auth'; 

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
    // Aseguramos que se inicialice como un array vacío
    const [transaccionesPeriodo, setTransaccionesPeriodo] = useState([]); 
    
    // --- 1. REGISTRO ---
    const registrarTransacciones = async (transaccionesArray) => {
        setLoading(true);
        setError(null);
        setSuccessMessage(null);

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

    // --- 2. OBTENER TODAS (MANTIENE useCallback) ---
    const fetchTransacciones = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await obtener_Transacciones();
            setTransacciones(response.data.data || response.data || []); 
        } catch (err) {
            const msg = err.response?.data?.message || 'Error al obtener transacciones.';
            setError(msg);
        } finally {
            setLoading(false);
        }
    }, [setLoading, setError, setTransacciones]); 

    // --- 3. OBTENER POR PERÍODO (NO USA useCallback) ---
    const cargarTransaccionesPorPeriodo = async (mes, anio) => {
        setLoading(true);
        setError(null);
        setTransaccionesPeriodo([]); 
        
        try {
            const response = await obtenerTransaccionesPorPeriodo(mes, anio);
            
            // 🚨 CORRECCIÓN DE LA ASIGNACIÓN:
            // Priorizamos response.data.data (si viene en un objeto { data: [...] }),
            // si no, usamos response.data, y como fallback, un array vacío.
            const dataArray = response.data?.data || response.data || [];
            setTransaccionesPeriodo(dataArray); 

        } catch (err) {
            const msg = err.response?.data?.message || 'Error al obtener transacciones del período. Revise la consola.';
            setError(msg);
            setTransaccionesPeriodo([]);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        console.log("Financiero Context Mounted");
    }, []);

    return (
        <FinancieroContext.Provider value={{
            registrarTransacciones,
            loading,
            error,
            successMessage,
            setError, 
            setSuccessMessage,
            fetchTransacciones,
            transacciones, 
            transaccionesPeriodo, 
            cargarTransaccionesPorPeriodo 
            }}>
            {children} 
        </FinancieroContext.Provider>
    )
}
    