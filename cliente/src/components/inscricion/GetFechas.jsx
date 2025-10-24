import React, {useState, useEffect} from 'react'
import { getFechasLapso } from '../../api/auth';
import {usePoblacion} from '../../context/PoblacionContext';

// css
import '../../css/GetFechas.css';

function GetFechas() {

    const {actuLapso} = usePoblacion();

    const [fechas, setFechas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchFechas = async () => {
            try {
                const response = await getFechasLapso();
                // 🚨 Nota: Asegúrate de que 'lapso.ID' sea la clave única correcta.
                setFechas(response.data);
            } catch (err) {
                setError('Error al obtener las fechas del lapso.');
                console.error(err);
            }
            setLoading(false);
        };

        fetchFechas();
    }, [actuLapso]);

    return (
        
        <div className="table-lapso-container">
            
            <h2>Fechas de los lapsos registrados</h2>
            
            {loading && <p className="loading-message">Cargando fechas...</p>}
            {error && <p className="error-message">{error}</p>}
            
            {!loading && !error && fechas.length === 0 && <p>No hay lapsos registrados.</p>}
            
            {!loading && !error && fechas.length > 0 && (
                // 🚨 Aplicamos la clase de la tabla
                <table className="table-lapso"> 
                    <thead>
                        <tr>
                            <th>Tipo de Inscripción</th>
                            <th>Fecha de Inicio</th>
                            <th>Fecha de Fin</th> 
                        </tr>
                    </thead>
                    <tbody>
                        {fechas.map((lapso) => (
                            // La clave 'key' es esencial para React
                            <tr key={lapso.ID}> 
                                <td>{lapso.tipo_inscripcion}</td>
                                {/* Formato de fecha limpio */}
                                <td>{new Date(lapso.inicio).toLocaleDateString()}</td> 
                                <td>{new Date(lapso.fin).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
export default GetFechas;