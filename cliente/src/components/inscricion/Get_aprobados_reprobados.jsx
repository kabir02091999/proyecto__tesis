import React, { useState } from 'react';
import { usePoblacion } from "../../context/PoblacionContext";

// 1. CSS base (Contenedores/Formulario/Tabla principal)
/* import '../../css/Poblacion_Lapso.css';  */
// 2. CSS específico (Botones y Estados)
import '../../css/Get_aprobados_reprobados.css'; 

function Get_aprobados_reprobados() {
    
    const [tablaLoading, setTablaLoading] = useState(false);
    const [evaluandoCI, setEvaluandoCI] = useState(null); 

    const { 
        Lapso, 
        loading, 
        aprobado_reprobado, 
        aprobadoReprobado,
        Post_Aprobacion
    } = usePoblacion(); 

    const [selectedLapsoId, setSelectedLapsoId] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const lapsoId = e.target.lapsoId.value;
        if (!lapsoId) return;
        
        setSelectedLapsoId(lapsoId); 
        setTablaLoading(true);

        try {
            await aprobado_reprobado(lapsoId); 
        } catch (error) {
            console.error("Error al obtener la población:", error);
        } finally {
            setTablaLoading(false);
        }
    }

    const handleEvaluacion = async (cedula, lapsoId, estado) => {
        if (!cedula || !lapsoId) {
            alert("No se pudo obtener la cédula o el lapso.");
            return;
        }

        setEvaluandoCI(cedula);

        try {
            const aprobacionData = {
                CI: cedula,
                ID_lapso: parseInt(lapsoId),
                aprobado_Reprobado: estado
            };
            
            await Post_Aprobacion(aprobacionData); 

            alert(`Estudiante ${cedula} marcado como ${estado === 1 ? 'APROBADO' : 'REPROBADO'}.`);

            await aprobado_reprobado(lapsoId); 

        } catch (error) {
            console.error("Error al registrar la evaluación:", error);
            alert("Error al guardar la evaluación. Verifique la función Post_Aprobacion.");
        } finally {
            setEvaluandoCI(null);
        }
    };

    const dataToShow = aprobadoReprobado || []; 

    // CÓDIGO CORREGIDO: ENFOCARSE EN LAS LÍNEAS 29, 30 y 55
// Nota: La lógica de la función Get_aprobados_reprobados (arriba del return) no necesita cambios.

return (
    <div className="poblacion-lapso-container2">
        <h2>participante Evaluados (Aprobados o no Aprobado)</h2>
        
        <form className="inscripcion-form" onSubmit={handleSubmit}>
            <select 
                name="lapsoId" 
                required 
                onChange={(e) => setSelectedLapsoId(e.target.value)}
            >
                <option value="" disabled>Seleccione un lapso</option>
                {Lapso.map((lapso, index) => (
                    <option key={lapso.ID || index} value={lapso.ID}>
                        {lapso.tipo_inscripcion} ({new Date(lapso.inicio).toLocaleDateString()} - {new Date(lapso.fin).toLocaleDateString()})
                    </option>
                ))}
            </select>
            <button type="submit" disabled={loading || tablaLoading}>
                {loading || tablaLoading ? 'Cargando...' : 'Buscar Evaluados'}
            </button>
        </form>

        <hr/>

        

<div className="table-lapso-container">
    {tablaLoading && <p className="loading-message">Cargando datos de la tabla...</p>}

    {!tablaLoading && dataToShow.length > 0 ? (
        
        /* prettier-ignore */
        <table className="table-lapso"><thead>
            <tr>
                <th>Cédula</th>
                <th>Nombre Completo</th>
                <th>Nivel</th>
                <th>Estado Actual</th>
                <th>Acción</th>
            </tr>
        </thead><tbody>
            {dataToShow.map((estudiante) => (
                <tr key={estudiante.Cedula || estudiante.CI}>
                    <td>{estudiante.Cedula || estudiante.CI}</td>
                    <td>{estudiante.Nombre_Estudiante} {estudiante.Apellido_Estudiante}</td>
                    <td>{estudiante.Nivel_Inscrito}</td>
                    
                    <td>
                        {estudiante.aprobado_Reprobado === 1 
                            ? <span className="estado-aprobado">APROBADO</span> 
                            : estudiante.aprobado_Reprobado === 0 
                                  ? <span className="estado-reprobado">REPROBADO</span> 
                                  : <span className="estado-pendiente">Pendiente</span>}
                    </td>
                    
                    <td className="accion-celda">
                        <button 
                            onClick={() => handleEvaluacion(estudiante.Cedula || estudiante.CI, selectedLapsoId, 1)}
                            disabled={evaluandoCI === (estudiante.Cedula || estudiante.CI)}
                            className="aprobacion-btn"
                        >
                            {evaluandoCI === (estudiante.Cedula || estudiante.CI) ? '...' : 'Aprobar'}
                        </button>
                        
                        <button 
                            onClick={() => handleEvaluacion(estudiante.Cedula || estudiante.CI, selectedLapsoId, 0)}
                            disabled={evaluandoCI === (estudiante.Cedula || estudiante.CI)}
                            className="reprobacion-btn"
                        >
                            {evaluandoCI === (estudiante.Cedula || estudiante.CI) ? '...' : 'Reprobar'}
                        </button>
                    </td>
                </tr>
            ))}
        </tbody></table>
    ) : (
        !tablaLoading && <p>Seleccione un lapso para ver los estudiantes evaluados.</p>
    )}
</div>
        
    </div>
);
}

export default Get_aprobados_reprobados;