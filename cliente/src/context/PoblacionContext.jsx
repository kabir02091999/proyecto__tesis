import { createContext, useState, useContext, useEffect } from 'react';

//api 
import { getPoblacion, getFechasLapso , createPoblacion as createPoblacion1 , inscribirEstudiante ,getPoblacionByLapso as getPoblacionByLapso1} from '../api/auth';

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
    const [actuLapso, setActuLapso] = useState(false);
    const [Lapso, setLapso] = useState([]);
    const [ErrorGetPoblacion, setErrorGetPoblacion] = useState(null);
    const [poblacionPorLapso, setPoblacionPorLapso] = useState([]); // Nuevo estado para población por lapso

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


    const Inscribir_poblacion = async (datos) => {  
        console.log("--- Datos Listos para API ---");
        console.log("Datos de Inscripción:", datos);
        alert(`Simulación: Datos enviados. Cédula ${datos.cedula} inscrita en Lapso ID ${datos.lapsoId}, Nivel ${datos.nivel}, Sección ${datos.seccion}.`);
        return await inscribirEstudiante(datos);
    }

    const getPoblacionByCI_Sync = async (CI) => { // Renombramos para diferenciar
    setLoading(true);
    setError(null);
    setPoblacion(null);
    setErrorGetPoblacion(null);
    
    try {
        const response = await getPoblacion(CI);
        const data = response.data;
        
        // Actualiza el estado del contexto
        setPoblacion(data);
        return data; // 👈 Retorna el objeto de población
        
    } catch (err) {
        if (err.response && err.response.status === 404) {
            console.log(`CI no encontrada (${CI}).`);
            setPoblacion(null);
            setErrorGetPoblacion(true); // Indica que NO se encontró
            return false; // 👈 Retorna false al componente que llama
        }
        
        // Manejo de otros errores...
        // ... (Tu lógica de error 500/red)
        
        throw err; // Relanza el error grave
    } finally {
        setLoading(false);
    }
};



    const createPoblacion = async (poblacionData) => {
        console.log(poblacionData);
        return await createPoblacion1(poblacionData);
    }

    const fetchLapso = async () => {
        try {
            const response = await getFechasLapso();
            setLapso(response.data);
            console.log("Datos de lapso obtenidos:", response.data);
        } catch (err) {
            console.error('Error al obtener los datos de lapso:', err);
        }
    };

    const getPoblacionByLapso = async (lapsoId) => {
        setLoading(true);
        setError(null);
        setPoblacionPorLapso([]); // Limpiar datos anteriores antes de la búsqueda

        try {
            const response = await getPoblacionByLapso1(lapsoId); // Asegúrate de tener esta función en tu API
            const data = response.data;
            console.log("Datos de población por lapso obtenidos:", data);
            setPoblacionPorLapso(data); // Actualiza el estado con los datos obtenidos
        } catch (err) {
            setError("Error al obtener la población por lapso.");
            console.error('Error al obtener la población por lapso:', err);
        }
        setLoading(false);
    };

    // Llamar a fetchLapso cuando el componente se monte o cuando actuLapso cambie
    useEffect(() => {
        fetchLapso();
        console.log("actulapso en context " + actuLapso)
    }, [actuLapso]);


    return (
        <PoblacionContext.Provider value={{getPoblacionByLapso,poblacionPorLapso , Inscribir_poblacion, getPoblacionByCI_Sync ,ErrorGetPoblacion, poblacion, loading, error, actuLapso, setActuLapso, getPoblacionByCI, createPoblacion , Lapso , setLapso}}> 
            {children}
        </PoblacionContext.Provider>
    );
}