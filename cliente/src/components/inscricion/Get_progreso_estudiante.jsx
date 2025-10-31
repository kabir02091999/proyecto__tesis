import React, { useState } from 'react';
import { usePoblacion } from '../../context/PoblacionContext';
import '../../css/catequesis/Get_progresoEstudiante.css';

function Get_aprobados_reprobados() {
    // Obtiene la función de consulta, los resultados y el estado de carga desde el contexto
    const {
        loading,
        error,
        getProgresoEstudianteByCI,
        progresoEstudiante
    } = usePoblacion();

    // Estado para almacenar la cédula ingresada
    const [ciInput, setCiInput] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Evita consultas vacías
        if (!ciInput) return;

        // Llama a la función del contexto para buscar el progreso
        await getProgresoEstudianteByCI(ciInput);
    };

    
    const estudiante = progresoEstudiante?.[0];

    return (
        <div className="poblacion-lapso-page">
            {/* Tarjeta superior con el formulario de búsqueda */}
            <div className="poblacion-lapso-container">
                <h2>Progreso del participante</h2>
                <hr className="title-divider" />

                <form className="inscripcion-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Ingrese la Cédula del Participante (CI)"
                        value={ciInput}
                        onChange={(e) => setCiInput(e.target.value.trim().replace(/-/g, ''))}
                        required
                    />
                    <button type="submit" disabled={loading || !ciInput}>
                        {loading ? 'Buscando...' : 'Consultar Progreso'}
                    </button>
                </form>
            </div>

            {/* Tarjeta inferior con los resultados */}
            <div className="resultados-card">
                {error && <p className="error-message">¡Algo salió mal! {error}</p>}

                {loading && <p className="loading-message">Buscando progreso, espere un momento...</p>}

                {progresoEstudiante && progresoEstudiante.length > 0 && !loading && estudiante ? (
                    <div className="table-wrapper">
                        
                        <h3>
                            Progreso de {estudiante.Nombre_Estudiante} {estudiante.Apellido_Estudiante} (CI: {estudiante.Cedula})
                        </h3>

                        {/* Tabla con el historial de progreso */}
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
                                        <td
                                            className={
                                                p.Resultado === 'Aprobado'
                                                    ? 'resultado-aprobado'
                                                    : p.Resultado === 'Reprobado'
                                                    ? 'resultado-reprobado'
                                                    : ''
                                            }
                                        >
                                            {p.Resultado}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    !loading &&
                    ciInput &&
                    progresoEstudiante &&
                    progresoEstudiante.length === 0 && (
                        <p className="loading-message">
                            No se encontró historial de progreso para la CI: {ciInput}.
                        </p>
                    )
                )}
            </div>
        </div>
    );
}

export default Get_aprobados_reprobados;
