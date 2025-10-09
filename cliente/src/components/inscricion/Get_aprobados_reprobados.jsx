import React, { useState } from 'react';
import { usePoblacion } from "../../context/PoblacionContext"; 

function Get_aprobados_reprobados() {
    
    const [tablaLoading, setTablaLoading] = useState(false);
    // Estado para gestionar si un estudiante específico está siendo evaluado (bloquea el botón)
    const [evaluandoCI, setEvaluandoCI] = useState(null); 

    // Desestructuramos las variables del contexto, incluyendo Post_Aprobacion
    const { 
        Lapso, 
        loading, 
        aprobado_reprobado, 
        aprobadoReprobado,
        Post_Aprobacion // ⬅️ Tu función de contexto real
    } = usePoblacion(); 

    // Guarda el ID del lapso seleccionado para usarlo en la evaluación
    const [selectedLapsoId, setSelectedLapsoId] = useState(null);

    // ... (handleSubmit se mantiene igual para cargar la lista del contexto)

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

    // --- FUNCIÓN PARA ENVIAR LA EVALUACIÓN ---
    // Esta función se llama cuando se hace clic en 'Aprobar' o 'Reprobar'
    const handleEvaluacion = async (cedula, lapsoId, estado) => {
        // estado: 1 para Aprobado, 0 para Reprobado
        if (!cedula || !lapsoId) {
            alert("No se pudo obtener la cédula o el lapso.");
            return;
        }

        setEvaluandoCI(cedula); // Bloquea la fila

        try {
            // 1. Construir el JSON que coincide con la tabla 'aprobacion'
            const aprobacionData = {
                CI: cedula,
                ID_lapso: parseInt(lapsoId), // Aseguramos que sea un número entero
                aprobado_Reprobado: estado
            };
            console.log("Datos de aprobación a enviar:", aprobacionData);
            // 2. Llamar a TU función de contexto (Post_Aprobacion) y mandar el JSON
            await Post_Aprobacion(aprobacionData); 

            alert(`Estudiante ${cedula} marcado como ${estado === 1 ? 'APROBADO' : 'REPROBADO'}.`);

            // 3. Opcional: Recargar la lista de evaluados para ver el cambio reflejado.
            // Esto llama a la función de contexto que a su vez actualiza 'aprobadoReprobado'.
            await aprobado_reprobado(lapsoId); 

        } catch (error) {
            console.error("Error al registrar la evaluación:", error);
            alert("Error al guardar la evaluación. Verifique la función Post_Aprobacion.");
        } finally {
            setEvaluandoCI(null); // Desbloquea la fila
        }
    };
    // ------------------------------------------

    const dataToShow = aprobadoReprobado || []; 

    return (
        <div className="poblacion-lapso-container">
            <h2>Estudiantes Evaluados (Aprobados y Reprobados)</h2>
            
            {/* --- FORMULARIO DE SELECCIÓN --- */}
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

            {/* --- TABLA DE RESULTADOS (CON BOTONES) --- */}
            <div className="tabla-resultados">
                {tablaLoading && <p>Cargando datos de la tabla...</p>}

                {!tablaLoading && dataToShow.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Cédula</th>
                                <th>Nombre Completo</th>
                                <th>Nivel</th>
                                <th>Estado Actual</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataToShow.map((estudiante) => (
                                <tr key={estudiante.Cedula || estudiante.CI}> 
                                    <td>{estudiante.Cedula || estudiante.CI}</td>
                                    <td>{estudiante.Nombre_Estudiante} {estudiante.Apellido_Estudiante}</td>
                                    <td>{estudiante.Nivel_Inscrito}</td>
                                    
                                    {/* Muestra el estado actual */}
                                    <td>
                                        {estudiante.aprobado_Reprobado === 1 
                                            ? <span style={{ color: 'green', fontWeight: 'bold' }}>APROBADO</span> 
                                            : estudiante.aprobado_Reprobado === 0 
                                                ? <span style={{ color: 'red', fontWeight: 'bold' }}>REPROBADO</span>
                                                : 'Pendiente'}
                                    </td>
                                    
                                    {/* Celda de Acción con botones */}
                                    <td style={{ display: 'flex', gap: '5px' }}>
                                        {/* Botón APROBAR (estado = 1) */}
                                        <button 
                                            onClick={() => handleEvaluacion(estudiante.Cedula || estudiante.CI, selectedLapsoId, 1)}
                                            disabled={evaluandoCI === (estudiante.Cedula || estudiante.CI)}
                                            style={{ backgroundColor: 'green', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
                                        >
                                            {evaluandoCI === (estudiante.Cedula || estudiante.CI) ? '...' : 'Aprobar'}
                                        </button>
                                        
                                        {/* Botón REPROBAR (estado = 0) */}
                                        <button 
                                            onClick={() => handleEvaluacion(estudiante.Cedula || estudiante.CI, selectedLapsoId, 0)}
                                            disabled={evaluandoCI === (estudiante.Cedula || estudiante.CI)}
                                            style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
                                        >
                                            {evaluandoCI === (estudiante.Cedula || estudiante.CI) ? '...' : 'Reprobar'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    !tablaLoading && <p>Seleccione un lapso para ver los estudiantes evaluados.</p>
                )}
            </div>
            
        </div>
    );
}

export default Get_aprobados_reprobados;