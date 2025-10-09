import React, { useState } from 'react';
import { usePoblacion } from '../../context/PoblacionContext';
//import './GetPoblacionLapso.css'; 


function Get_aprobados_reprobados() {
    
    // Yo extraigo la función de consulta, los resultados y el estado de carga que necesito
    const { 
        loading, 
        error, 
        getProgresoEstudianteByCI,
        progresoEstudiante//progresoEstudiante,getProgresoEstudianteByCI
    } = usePoblacion();

    // Yo guardo la Cédula (CI) que el usuario ingresa
    const [ciInput, setCiInput] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Si el campo está vacío, yo no hago nada
        if (!ciInput) return;
        console.log("Yo estoy buscando el progreso para la CI:", ciInput);
        // Yo llamo a la función del contexto para buscar el progreso
        await getProgresoEstudianteByCI(ciInput); 
    };

    // Yo uso el primer registro para obtener los datos del estudiante para el encabezado
    const estudiante = progresoEstudiante?.[0];

    return (
        <div className="poblacion-lapso-container"> 
            
            <form className="inscripcion-form" onSubmit={handleSubmit} >
                
            </form>
            <h2>Yo Consulto el Progreso del Estudiante</h2>

            <form className="inscripcion-form" onSubmit={handleSubmit} >
                {/* Campo de Cédula (CI) */}
                <input
                    type="text"
                    placeholder="Yo Ingreso Cédula del Estudiante (CI)"
                    value={ciInput}
                    // Yo limpio la CI de espacios o guiones antes de guardarla
                    onChange={(e) => setCiInput(e.target.value.trim().replace(/-/g, ''))} 
                    required
                />
                
                <button type="submit" disabled={loading || !ciInput}>
                    {loading ? 'Yo Estoy Buscando...' : 'Yo Quiero Ver el Progreso'}
                </button>
            </form>


            <hr/>

            {/* Yo Muestro los Resultados */}
            <div className="resultados-consulta">
                
                {/* Yo muestro Errores */}
                {error && <p className="error-message">¡Algo Salió Mal! {error}</p>}
                
                {/* Yo muestro el estado de Carga */}
                {loading && <p className="loading-message">Yo estoy Buscando el progreso, espera un momento...</p>}

                {/* Yo muestro la Tabla de Progreso si tengo resultados */}
                {progresoEstudiante && progresoEstudiante.length > 0 && !loading && estudiante ? (
                    <div className="table-lapso-container">
                        
                        {/* Yo muestro el encabezado del estudiante */}
                        <h3>El Progreso de {estudiante.Nombre_Estudiante} {estudiante.Apellido_Estudiante} (CI: {estudiante.Cedula}) es:</h3>
                        
                        {/* Yo muestro la Tabla con el Historial */}
                        <table className="table-lapso">
                            <thead>
                                <tr>
                                    <th>Lapso</th>
                                    <th>Inicio</th>
                                    <th>Fin</th> 
                                    <th>Sección</th>
                                    <th>Nivel</th>
                                    <th>Resultado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {progresoEstudiante.map((p, index) => (
                                    <tr key={index}>
                                        <td>{p.Nombre_Lapso}</td>
                                        <td>{p.Fecha_Inicio_Lapso}</td>
                                        <td>{p.Fecha_Fin_Lapso}</td>
                                        <td>{p.Seccion_Cursada}</td>
                                        <td>{p.Nivel_Cursado}</td>
                                        
                                        {/* Yo aplico estilo dinámico al resultado */}
                                        <td style={{ fontWeight: 'bold', color: 
                                            p.Resultado === 'Aprobado' ? '#28a745' : 
                                            p.Resultado === 'Reprobado' ? '#dc3545' : '#ffc107' }}>
                                            {p.Resultado}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    // Yo muestro mensaje si no hay resultados después de buscar
                    !loading && ciInput && progresoEstudiante && progresoEstudiante.length === 0 && (
                        <p className="loading-message">Yo no encontré historial de progreso para la CI: {ciInput}.</p>
                    )
                )}
            </div>
        </div>
    );
}

export default Get_aprobados_reprobados;