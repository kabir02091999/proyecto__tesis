import React, { useState, useEffect } from 'react';
import { usePoblacion  } from '../../context/PoblacionContext';
// Asegúrate de importar tu CSS de diseño si lo tienes separado
import '../../css/Inscribir_poblacion.css';


const formatFecha = (dateString) => {
    if (!dateString) return ''; 
    const date = new Date(dateString); 
    return date.toLocaleDateString('es-VE'); 
};

const inscribirEstudiante = (datos) => {
    console.log("--- Datos Listos para API ---");
    console.log("Lapso ID:", datos.lapsoId);
    console.log("Cédula Estudiante:", datos.cedula);
    alert(`Simulación: Datos enviados. Cédula ${datos.cedula} inscrita en Lapso ID ${datos.lapsoId}.`);
};


function Inscribir_poblacion() {
    const { Lapso , Existe_poblacion , poblacion , ErrorGetPoblacion ,getPoblacionByCI_Sync} = usePoblacion();

    const [inscripcionData, setInscripcionData] = useState({
        // Inicializa con el ID del primer lapso si existe, o vacío
        lapsoId: Lapso.length > 0 ? Lapso[0].ID : '', 
        cedula: '',
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
        
        if (!inscripcionData.lapsoId || !inscripcionData.cedula) {
            alert("Por favor, selecciona un lapso e ingresa la cédula.");
            return;
        }

        // 🚨 CLAVE: Esperamos el resultado de la función, que es el objeto o 'false'
        const poblacionEncontrada = await getPoblacionByCI_Sync(inscripcionData.cedula);

        if (poblacionEncontrada) {
            console.log("La población existe, procediendo a la inscripción...", poblacionEncontrada);
            // Lógica de inscripción final
            inscribirEstudiante(inscripcionData); 
        } else {
            // El resultado es 'false' (404)
            alert("La población con la cédula ingresada no existe. Por favor, créala primero.");
            return;
        }

        // Limpiar formulario
        setInscripcionData(prevData => ({
            ...prevData,
            cedula: ''
        }));


    };

    useEffect(() => {
        //estado de la poblacion
        console.log("Estado actual de la población asdadasdas:", ErrorGetPoblacion);
    }, [ErrorGetPoblacion]);


    return (
        <div>
            
            <form className="inscripcion-form" onSubmit={handleSubmit}>
                <h2>Inscribir Población en Lapso conectar a la api</h2>
                <select 
                    name="lapsoId" 
                    value={inscripcionData.lapsoId} 
                    onChange={handleChange}
                >
                    <option value="" disabled>Seleccione un lapso</option>
                    {Lapso.map((lapso, index) => (
                        <option key={lapso.ID || index} value={lapso.ID}>
                            {lapso.tipo_inscripcion} (
                            {formatFecha(lapso.inicio)} - {formatFecha(lapso.fin)}
                            )
                        </option>
                        ))}
                </select>
                
                
                <input 
                    type="text" 
                    placeholder="Cédula de Identidad del Estudiante" 
                    name="cedula" 
                    value={inscripcionData.cedula} 
                    onChange={handleChange}
                />
                
                <button type="submit">Inscribir</button>
            </form>
        </div>
    )
}

export default Inscribir_poblacion;
