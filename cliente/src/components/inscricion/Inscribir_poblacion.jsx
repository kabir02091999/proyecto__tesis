import React, { useState, useEffect } from 'react';
import { usePoblacion } from '../../context/PoblacionContext';
import '../../css/Inscribir_poblacion.css';


const formatFecha = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-VE');
};

const inscribirEstudiante = (datos) => {
    console.log("--- Datos Listos para API ---");
    console.log("Datos de Inscripción:", datos);
    alert(`Simulación: Datos enviados. Cédula ${datos.cedula} inscrita en Lapso ID ${datos.lapsoId}, Nivel ${datos.nivel}, Sección ${datos.seccion}.`);
};


function Inscribir_poblacion() {
    // 🚨 Extraemos la función de verificación y el listado de lapsos
    const { Lapso, getPoblacionByCI_Sync ,Inscribir_poblacion} = usePoblacion();

    const [inscripcionData, setInscripcionData] = useState({
        // Inicializa lapsoId (usando el primer ID disponible o cadena vacía)
        lapsoId: Lapso.length > 0 ? Lapso[0].ID : '', 
        cedula: '',
        // 🚨 1. AÑADIMOS ESTADOS INICIALES PARA LOS NUEVOS CAMPOS
        seccion: '', 
        nivel: '',
    });

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInscripcionData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        
        const { lapsoId, cedula, seccion, nivel } = inscripcionData;

        // Validación inicial
        if (!lapsoId || !cedula || !seccion || !nivel) {
            alert("Por favor, completa todos los campos (Lapso, Cédula, Sección y Nivel).");
            return;
        }
        
        // 1. Verificación de existencia de población
        const poblacionEncontrada = await getPoblacionByCI_Sync(cedula);

        if (poblacionEncontrada) {
            // 2. Población existe: Procede a la inscripción
            console.log("La población existe, procediendo a la inscripción...", poblacionEncontrada);
            
            
        //creame un json con esta espesificaciones y me lo igualas con las variable que octengo { lapsoId, cedula, seccion, nivel } = {ID_lapso, CI , seccion, nivel}
        const datosInscripcion = {
            ID_lapso: lapsoId,
            CI: cedula,
            seccion: seccion,
            nivel: nivel
        };
        console.log("Datos de Inscripción Formateados para API:", datosInscripcion);
        Inscribir_poblacion(datosInscripcion);
        
        // Aquí llamarías a la función que envía los datos a la API
        // inscribirEstudiante(datosInscripcion); // Descomenta cuando tengas la función real        
      

        } else {
            // 3. Población NO existe (404)
            alert("La población con la cédula ingresada no existe. Por favor, créala primero.");
            return;
        }

        // Limpiar formulario (solo cédula, sección y nivel después del éxito)
        setInscripcionData(prevData => ({
            ...prevData,
            cedula: '',
            seccion: '',
            nivel: '',
        }));
    };

    return (
        <div>
            <form className="inscripcion-form" onSubmit={handleSubmit}>
                <h2>Inscribir Población en Lapso</h2>
                
                
                <select 
                    name="lapsoId" 
                    value={inscripcionData.lapsoId} 
                    onChange={handleChange}
                    required
                >
                    <option value="" disabled>Seleccione un lapso</option>
                    {Lapso.map((lapso, index) => (
                        // 🚨 Asegúrate de que la key sea única
                        <option key={lapso.ID || index} value={lapso.ID}> 
                            {lapso.tipo_inscripcion} ({formatFecha(lapso.inicio)} - {formatFecha(lapso.fin)})
                        </option>
                    ))}
                </select>
                
                
                <input 
                    type="text" 
                    placeholder="Cédula de Identidad del Estudiante" 
                    name="cedula" 
                    value={inscripcionData.cedula} 
                    onChange={handleChange}
                    required
                />
                
                
                <input 
                    type="text" 
                    placeholder="Sección (Ej: A, B, Única)"
                    name="seccion" 
                    value={inscripcionData.seccion} // 👈 Vinculación de valor
                    onChange={handleChange}
                    required
                />

                <select 
                    name="nivel" 
                    value={inscripcionData.nivel} 
                    onChange={handleChange}
                    required
                >
                    <option value="" disabled>Seleccione un nivel</option>
                    <option value="1">Nivel 1</option>
                    <option value="2">Nivel 2</option>
                    <option value="3">Nivel 3</option>
                </select>

                <button type="submit">Inscribir</button>
            </form>
        </div>
    )
}

export default Inscribir_poblacion;