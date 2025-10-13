import React, { useState, useEffect } from 'react';
import { usePoblacion } from "../../context/PoblacionContext";

// Función auxiliar simple para formatear fechas
const formatFecha = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('es-VE'); 
};


function Get_inscrito_pfd() {
    
    const [inscripcionData, setInscripcionData] = useState({
        lapsoId: '',
        seccion: '',
        nivel: ''
    });
    const [loading, setLoading] = useState(false);
    const { Lapso, getInscritosPorFiltro, poblacionPorLapso } = usePoblacion(); 
    
 
    const [inscritos, setInscritos] = useState([]); 

    useEffect(() => {
        // Cada vez que poblacionPorLapso cambie en el Contexto, actualizamos el estado local.
        setInscritos(poblacionPorLapso || []);
    }, [poblacionPorLapso]); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInscripcionData(prevData => ({
            ...prevData,
            [name]: value.trim()
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const { lapsoId, seccion, nivel } = inscripcionData;

        if (!lapsoId || !seccion || !nivel) {
            alert('Por favor, complete todos los campos de filtro.');
            return;
        }

        setLoading(true);
        console.log("Buscando inscritos con filtros:", inscripcionData);
        
        try {
            await getInscritosPorFiltro(lapsoId, seccion, nivel);
            
            if (poblacionPorLapso.length === 0) { 
                 // alert("No se encontraron estudiantes...");
            }
        } catch (error) {
            console.error("Error al buscar inscritos:", error);
            alert("Hubo un error al buscar los inscritos. Verifique la conexión.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (inscritos.length > 0) {
            console.log("Datos listos para el PDF:", inscritos);
            // Aquí llamarías a tu función generatePDF(inscritos);
        }
    }, [inscritos]);


    return (
        <div className="poblacion-pdf-container">
            <form className="inscripcion-form" onSubmit={handleSubmit}>
                <h2>Generar PDF de Inscritos (Filtro)</h2>

                {/* --- Lapso Select --- */}
                <select 
                    name="lapsoId" 
                    value={inscripcionData.lapsoId}
                    onChange={handleChange}
                    required
                    disabled={loading}
                >
                    <option value="" disabled>Seleccione un lapso</option>
                    {Lapso.map((lapso, index) => (
                        <option key={lapso.ID || index} value={lapso.ID}> 
                            {lapso.tipo_inscripcion} ({formatFecha(lapso.inicio)} - {formatFecha(lapso.fin)})
                        </option>
                    ))}
                </select>

                {/* --- Sección Input --- */}
                <input 
                    type="text" 
                    placeholder="Sección (Ej: A, B, Única)"
                    name="seccion"
                    value={inscripcionData.seccion} 
                    onChange={handleChange}
                    required
                    disabled={loading}
                />

                {/* --- Nivel Select --- */}
                <select 
                    name="nivel" 
                    value={inscripcionData.nivel}
                    onChange={handleChange}
                    required
                    disabled={loading}
                >
                    <option value="" disabled>Seleccione un nivel</option>
                    <option value="1">Nivel 1</option>
                    <option value="2">Nivel 2</option>
                    <option value="3">Nivel 3</option>
                </select>
                
                <button type="submit" disabled={loading}>
                    {loading ? 'Buscando...' : 'Buscar Inscritos y Generar PDF'}
                </button>
            </form>
            
            <hr />

            {/* Mostrar resultados de la búsqueda usa el estado 'inscritos' actualizado por useEffect */}
            <h3>Resultados de la Búsqueda ({inscritos.length} estudiantes)</h3>
            
            {inscritos.length > 0 && (
                <table>
                    {/* ... (Tabla de renderizado sin cambios) ... */}
                    <tbody>
                        {inscritos.map((estudiante, index) => (
                            // Usamos estudiante.Cedula como key principal, y si no existe, usamos el index.
                            <tr key={estudiante.Cedula || index}> 
                                <td>{estudiante.Cedula}</td>
                                <td>{estudiante.Nombre_Estudiante} {estudiante.Apellido_Estudiante}</td>
                                <td>{estudiante.Nivel_Inscrito}</td>
                                <td>{estudiante.Seccion_Inscrita}</td>
                                <td>{estudiante.tipoPoblacion}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {loading && <p>Cargando datos...</p>}
            
        </div>
    );
}

export default Get_inscrito_pfd;
