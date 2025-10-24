import React, { useState } from 'react';
import { usePoblacion } from '../../context/PoblacionContext';

import '../../css/Get_poblacion_Lapso.css';

function Get_poblacion_Lapso() {

    // Extraigo todo lo que necesito de mi contexto: lapsos, estados de carga y mi función de búsqueda
    const { 
        Lapso, 
        loading, 
        error, 
        getPoblacionByLapso, 
        poblacionPorLapso 
    } = usePoblacion();

    // Este estado lo uso para guardar el ID del lapso que seleccioné
    const [selectedLapso, setSelectedLapso] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Si no seleccioné un lapso, no sigo
        if (!selectedLapso) return;

        
        // Llamo a mi función asíncrona y espero que termine.
        await getPoblacionByLapso(selectedLapso); 
    };

    return (
        <div className="poblacion-lapso-container">
            
            {/* FORMULARIO DE BÚSQUEDA */}
            <form className="inscripcion-form" onSubmit={handleSubmit} >
                <h2>Consultar Población por Lapso</h2>
                
                {/* Selector de Lapso */}
                <select 
                    name="lapsoId" 
                    value={selectedLapso} 
                    onChange={(e) => setSelectedLapso(e.target.value)}
                    required
                >
                    <option value="" disabled>Seleccione un lapso</option>
                    {Lapso.map((lapso, index) => (
                        <option key={lapso.ID || index} value={lapso.ID}>
                            {lapso.tipo_inscripcion} ({new Date(lapso.inicio).toLocaleDateString()} - {new Date(lapso.fin).toLocaleDateString()})
                        </option>
                    ))}
                </select>
                
                <button type="submit" disabled={loading}>
                    {loading ? 'Cargando...' : 'Ver Población'}
                </button>
            </form>

            <hr/>

            {/* ZONA DE RESULTADOS */}
            <div className="resultados-consulta">
                
                {/* 1. Muestro Errores Generales con la nueva clase */}
                {error && <p className="error-message">¡Algo salió mal! {error}</p>}
                
                {/* 2. Muestro el estado de Carga con la nueva clase */}
                {loading && <p className="loading-message">Buscando estudiantes, espera un momento...</p>}

                {/* 3. Muestro la lista si tengo resultados */}
                {poblacionPorLapso && poblacionPorLapso.length > 0 && !loading ? (
                    <div className="table-lapso-container"> 
                        <h3>Encontré {poblacionPorLapso.length} estudiantes inscritos:</h3>
                        
                        {/* 🚨 INICIO DE LA TABLA 🚨 */}
                        <table className="table-lapso">
                            <thead>
                                <tr>
                                    <th>Cédula</th>
                                    <th>Nombre Completo</th>
                                    <th>Tipo</th>
                                    <th>Sección</th>
                                    <th>Nivel</th>
                                </tr>
                            </thead>
                            <tbody>
                                {poblacionPorLapso.map((estudiante, index) => (
                                    <tr key={index}>
                                        <td>{estudiante.Cedula}</td>
                                        <td>{estudiante.Nombre_Estudiante} {estudiante.Apellido_Estudiante}</td>
                                        <td>{estudiante.tipoPoblacion}</td>
                                        <td>{estudiante.Seccion_Inscrita}</td>
                                        <td>{estudiante.Nivel_Inscrito}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {/* 🚨 FIN DE LA TABLA 🚨 */}
                    </div>
                ) : (
                    // 4. Muestro mensaje si no hay resultados después de buscar
                    !loading && selectedLapso && poblacionPorLapso && poblacionPorLapso.length === 0 && (
                        <p>No encontré estudiantes inscritos para el lapso seleccionado.</p>
                    )
                )}
            </div>
        </div>
    )
}

export default Get_poblacion_Lapso;