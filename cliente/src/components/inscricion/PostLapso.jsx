import React, { useState } from 'react';

import '../../css/PostLapso.css'; 

function PostLapso() {
    
    // 1. Variables de estado para almacenar los valores de los inputs
    const [nombre, setNombre] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');

    // 2. Función para manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault(); // Detiene la recarga de la página

        const datosLapso = {
            nombre,
            fechaInicio,
            fechaFin,
        };

        // Muestra los datos capturados en la consola
        console.log('✅ Datos del Lapso a enviar:', datosLapso);

        // 🚨 Aquí iría la llamada a tu API o backend (ej: axios.post('/api/lapso', datosLapso))
        
        // Opcional: Limpiar el formulario después de un envío exitoso
        setNombre('');
        setFechaInicio('');
        setFechaFin('');
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
                    value={nombre} // Vincula el valor al estado 'nombre'
                    onChange={(e) => setNombre(e.target.value)} // Actualiza el estado al escribir
                    required
                />
                
                {/* Campo Fecha de inicio */}
                <input 
                    type="date" 
                    placeholder="Fecha de inicio"
                    value={fechaInicio}
                    onChange={(e) => setFechaInicio(e.target.value)}
                    required
                />
                
                {/* Campo Fecha de fin */}
                <input 
                    type="date" 
                    placeholder="Fecha de fin"
                    value={fechaFin}
                    onChange={(e) => setFechaFin(e.target.value)}
                    required
                />
                
                {/* Botón de envío */}
                <button type="submit">Crear Lapso</button>
            </form>
        </div>
    );
}

export default PostLapso;