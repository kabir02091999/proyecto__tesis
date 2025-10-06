import React, { useState } from 'react';

import { PostFechaLapso } from '../../api/auth';

import { usePoblacion } from '../../context/PoblacionContext';

import '../../css/PostLapso.css'; 

function PostLapso() {
    
    const {actuLapso ,setActuLapso} = usePoblacion();
    // 1. Variables de estado para almacenar los valores de los inputs
    const [tipo_inscripcion, settipo_inscripcion] = useState('');
    const [inicio, setinicio] = useState('');
    const [fin, setfin] = useState('');

    // 2. Función para manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault(); // Detiene la recarga de la página

        const datosLapso = {
            tipo_inscripcion,
            inicio,
            fin,
        };

        // Muestra los datos capturados en la consola
        console.log('✅ Datos del Lapso a enviar:', actuLapso);
        PostFechaLapso(datosLapso);
        // como hacer dependiendo de la respuesta setActuLapso true o false
        setActuLapso((prev) => !prev); // Cambia el estado para indicar que se ha actualizado el lapso
    
        settipo_inscripcion('');
        setinicio('');
        setfin('');
    };

    return (
        // Aplicamos la clase principal para el diseño que te proporcioné
        <div className="lapso-form-container">
            {/* El evento onSubmit llama a nuestra función handleSubmit */}
            <form onSubmit={handleSubmit}>
                <h2>Crear Lapso</h2>
                
                {/* Campo Nombre */}
                <input 
                    type="text" 
                    placeholder="Nombre del lapso (Ej: 2024-II)" 
                    value={tipo_inscripcion} // Vincula el valor al estado 'tipo_inscripcion'
                    onChange={(e) => settipo_inscripcion(e.target.value)} // Actualiza el estado al escribir
                    required
                />
                
                {/* Campo Fecha de inicio */}
                <input 
                    type="date" 
                    placeholder="Fecha de inicio"
                    value={inicio}
                    onChange={(e) => setinicio(e.target.value)}
                    required
                />
                
                {/* Campo Fecha de fin */}
                <input 
                    type="date" 
                    placeholder="Fecha de fin"
                    value={fin}
                    onChange={(e) => setfin(e.target.value)}
                    required
                />
                
                {/* Botón de envío */}
                <button type="submit">Crear Lapso</button>
            </form>
        </div>
    );
}

export default PostLapso;