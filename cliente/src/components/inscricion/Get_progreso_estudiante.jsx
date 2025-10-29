import React, { useState } from 'react';
import { usePoblacion } from '../../context/PoblacionContext';
import '../../css/catequesis/Get_progresoEstudiante.css';


function Get_aprobados_reprobados() {

    // Yo extraigo la función de consulta, los resultados y el estado de carga que necesito
    const {
        loading,
        error,
        getProgresoEstudianteByCI,
        progresoEstudiante
    } = usePoblacion();

    // Yo guardo la Cédula (CI) que el usuario ingresa
    const [ciInput, setCiInput] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Si el campo está vacío, yo no hago nada
        if (!ciInput) return;
        // Yo llamo a la función del contexto para buscar el progreso
        await getProgresoEstudianteByCI(ciInput);
    };

    // Yo uso el primer registro para obtener los datos del estudiante para el encabezado
    const estudiante = progresoEstudiante?.[0];

    return (
        // Contenedor principal de la página (para fondo y centrado)
        <div className="poblacion-lapso-page">

            {/* Contenedor del Formulario (Tarjeta Superior) */}
            <div className="poblacion-lapso-container">

                <h2> Progreso del participante </h2>
                <hr className="title-divider" />

                <form className="inscripcion-form" onSubmit={handleSubmit} >
                    {/* Campo de Cédula (CI) */}
                    <input
                        type="text"
                        placeholder="Ingreso Cédula del Participante (CI)"
                        value={ciInput}
                        // Yo limpio la CI de espacios o guiones antes de guardarla
                        onChange={(e) => setCiInput(e.target.value.trim().replace(/-/g, ''))}
                        required
                    />

                    <button type="submit" disabled={loading || !ciInput}>
                        {loading ? 'Yo Estoy Buscando...' : 'Yo Quiero Ver el Progreso'}
                    </button>
                </form>

            </div>


            {/* Contenedor de Resultados (Tarjeta Inferior) */}
            {/* Usamos 'resultados-card' para la tarjeta contenedora */}
            <div className="resultados-card">

                {/* Yo muestro Errores */}
                {error && <p className="error-message">¡Algo Salió Mal! {error}</p>}

                {/* Yo muestro el estado de Carga */}
                {loading && <p className="loading-message">Yo estoy Buscando el progreso, espera un momento...</p>}

                {/* Yo muestro la Tabla de Progreso si tengo resultados */}
                {progresoEstudiante && progresoEstudiante.length > 0 && !loading && estudiante ? (

                    /* CLAVE: Usamos 'table-wrapper' para forzar el scroll horizontal */
                    (
                        <div className="table-wrapper">

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

                                            {/* Yo aplico estilo dinámico al resultado usando CLASES CSS externas */}
                                            <td className={
                                                p.Resultado === 'Aprobado' ? 'resultado-aprobado' :
                                                    p.Resultado === 'Reprobado' ? 'resultado-reprobado' : ''
                                            }>
                                                {p.Resultado}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )
                ) : (
                    // Yo muestro mensaje si no hay resultados después de buscar
                    !loading && ciInput && progresoEstudiante && progresoEstudiante.length === 0 && (
                        <p className="loading-message">No se encontro historial de progreso para la CI: {ciInput}.</p>
                    )
                )}
            </div>
        </div>
    );
}

export default Get_aprobados_reprobados;