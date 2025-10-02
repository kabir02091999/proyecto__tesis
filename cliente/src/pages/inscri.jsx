import React, { useState } from 'react';
import '../css/inscri.css'; 

import { usePoblacion } from '../context/PoblacionContext';

// Importa solo los componentes definidos originalmente (CrearPoblacion y GetPoblacion están fuera del flujo de renderContent)
import CrearPoblacion from '../components/CrearPoblacion';
import GetPoblacion from '../components/GetPoblacion';

import Nav_Inscricion from '../components/inscricion/Nav_Inscricion';

// --- Componente Principal ---

function Inscri() {
    
    const [contenidoActivo, setContenidoActivo] = useState('lapso');
    const { getPoblacionByCI } = usePoblacion(); // Mantenemos la desestructuración por si la necesitas más adelante

    
    const handleButtonClick = (opcion) => {
        setContenidoActivo(opcion);
    };

    
    const handleFormSubmit = (e) => {
        e.preventDefault();
        alert(`Formulario de ${contenidoActivo} enviado. Revisa la consola.`);
    };

    
   /*  const renderContent = () => {
        switch (contenidoActivo) {
            case 'lapso':
                // Nota: Usamos LapsoRegistro aquí
                return <LapsoRegistro onSubmit={handleFormSubmit} />;
            case 'reporte':
                // Nota: Usamos ReporteGeneral aquí
                return <ReporteGeneral />;
            case 'usuarios':
                // Nota: Usamos GestionUsuarios aquí
                return <GestionUsuarios />;
            default:
                return <div>Selecciona una opción en el menú lateral.</div>;
        }
    }; */

    return (
        
        <div className="admin-layout"> 
                
                

            <Nav_Inscricion onOptionSelect={handleButtonClick} />
            
            <GetPoblacion/>
            {/* <CrearPoblacion/> */}
            
        </div>
    );
}

export default Inscri;