
import axios from 'axios';

const API = "http://localhost:3000/api";


const api = axios.create({
    baseURL: API,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        localStorage.setItem('token', token);
    } else {
        delete api.defaults.headers.common['Authorization'];
        localStorage.removeItem('token');
    }
};

// Función para el inicio de sesión.
// Ahora solo se enfoca en la petición y llama a setAuthToken.
export const login = async (user) => {
    const response = await api.post(`/login`, user);
    if (response.data.token) {
        setAuthToken(response.data.token);
    }
    return response;
};

export const getUsuarios = async () => {
    return api.get(`/usuarios`);
};

export const deleteUsuario = async (userId) => {
    return api.delete(`/usuarios/${userId}`);
};

export const createUsuario = async (usuarioData) => {
    return api.post(`/usuarios`, usuarioData);
}

export const verifyToken = async () => {
    return api.post(`/verifyToken`);
};

/* aqui general */

export const crearCalendarioLiturgicos = async (calendarioData) => {
    return api.post(`/crear-calendario`, calendarioData);
}

export const getPoblacion = async (CI) => {
    return api.get('/inscripcion/getfind-poblacion/' + CI);
};

export const createPoblacion = async (poblacionData) => {
    return api.post(`/inscripcion/crear-poblacion`, poblacionData);
};

export const PostFechaLapso = async (lapsoData) => {
    return api.post(`/inscripcion/Registro-Lapso`, lapsoData);
};

export const getFechasLapso = async () => {
    return api.get(`/inscripcion/get-lapso`);
};

export const inscribirEstudiante = async (inscripcionData) => {
    return api.post(`/inscripcion/inscripto`, inscripcionData);
}

export const getPoblacionByLapso = async (lapsoId) => {
    return api.get(`/inscripcion/getpoblacion-lapso/${lapsoId}`);
}

export const getAprobadosReprobados = async (ID_lapso) => {
    return api.get(`/inscripcion/estudiantes-pendientes-evaluacion/${ID_lapso}`);
}

export  const PostAprobacion = async (aprobacionData) => {
    return api.post(`/inscripcion/aprobacion`, aprobacionData);
}

export const getProgresoEstudianteByCI = async (ci) => {
    return api.get(`/inscripcion/get-progreso-poblacion/${ci}`);
}

export const getInscritosPorFiltro = async (lapsoId, seccion, nivel) => {
    return api.get(`/inscripcion/inscritos-por-filtro/${lapsoId}/${seccion}/${nivel}`);
}

export const obtenerCalendarioLapso = async (lapsoId) => {
    return api.get(`/inscripcion/calendario-lapso/${lapsoId}`); 
}

export const getCalendario = async () => {
    return api.get(`/calendario`);
}

export const registro_Transacciones = async (transaccionesData) => {
    return api.post(`/finanzas/transacciones`, transaccionesData);
}

export const obtener_Transacciones = async () => {
    return api.get(`/finanzas/transacciones`);
};

export const obtenerTransaccionesPorPeriodo = async (mes, anio) => {
    // Usa la instancia 'api' para que se incluya el token de autenticación
    // y usa el parámetro 'params' de Axios para construir la URL con Query Params
    return api.get(`/finanzas/transacciones/periodo`, { 
        params: { 
            mes: mes, 
            anio: anio 
        } 
    });
};

export const subirHistorias = async (data) => {
    return api.post('/contenido/historias', data, {
        headers: {            
            'Content-Type': "multipart/form-data"
        }
    });
}

export const getHistorias = async (data) => {
    return api.get('/contenido/historias');
}


export const getBanner = async (data) => {
    return api.get('/contenido/main-banner');
}

export const subirBanner = async (data) => {
    return api.post('/contenido/main-banner', data, {
        headers: {            
            'Content-Type': "multipart/form-data"
        }
    });
}



export const subirarArchivo = async (archivoData) => {
    return api.post('/contenido/archivo', archivoData, {
        headers: {            
            'Content-Type': "multipart/form-data"
        }
    });
}

// Al cargar la aplicación, verificamos si hay un token en el localStorage
// y lo configuramos en los encabezados de Axios.
const tokenFromStorage = localStorage.getItem('token');
if (tokenFromStorage) {
    setAuthToken(tokenFromStorage);
}

export default api;