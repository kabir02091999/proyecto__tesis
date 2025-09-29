import React, { useState } from 'react';
import '../css/inscri.css'; 

import { usePoblacion } from '../context/PoblacionContext';



const LapsoRegistro = ({ onSubmit }) => (
    <form onSubmit={onSubmit} className="content-form">
        <h3>📅 Registrar Lapso Académico</h3>
        <label htmlFor="fecha_inicial">Fecha Inicial:</label>
        <input type="date" id="fecha_inicial" name="fecha_inicial" required />
        
        <label htmlFor="fecha_final">Fecha Final:</label>
        <input type="date" id="fecha_final" name="fecha_final" required />
        
        <button type="submit">Guardar Lapso</button>
    </form>
);


const ReporteGeneral = () => (
    <div className="content-view">
        <h3>📊 Vista de Reporte General</h3>
        <p>Aquí se cargará un gráfico o una tabla resumen de todos los estudiantes.</p>
        <button>Generar PDF</button>
    </div>
);


const GestionUsuarios = () => (
    <div className="content-view">
        <h3>🧑‍💻 Gestión de estudiantes o profesor</h3>
        <p>Formulario para crear, editar o eliminar usuarios del sistema (Administrador, Financiero, etc.).</p>
        <button>Crear Nuevo Usuario</button>
    </div>
);



function Inscri() {
    
    const [contenidoActivo, setContenidoActivo] = useState('lapso');
    const { getPoblacionByCI } = usePoblacion();

   
    const handleButtonClick = (opcion) => {
        setContenidoActivo(opcion);
    };

    
    const handleFormSubmit = (e) => {
        e.preventDefault();
        alert(`Formulario de ${contenidoActivo} enviado. Revisa la consola.`);
        
    };

    
    const renderContent = () => {
        switch (contenidoActivo) {
            case 'lapso':
                
                return <LapsoRegistro onSubmit={handleFormSubmit} />;
            case 'reporte':
                return <ReporteGeneral />;
            case 'usuarios':
                return <GestionUsuarios />;
            default:
                return <div>Selecciona una opción en el menú superior.</div>;
        }
    };

    return (
        <div className="page-container">
            <h1>Panel de Opciones Administrativas</h1>
            
            {/* --- Menú de Botones --- */}
            <div className="menu-buttons">
                <button 
                    onClick={() => handleButtonClick('lapso')}
                    // Clase condicional para resaltar el botón activo
                    className={contenidoActivo === 'lapso' ? 'active' : ''}
                >
                    Registro de Lapso
                </button>
                
                <button 
                    onClick={() => handleButtonClick('reporte')}
                    className={contenidoActivo === 'reporte' ? 'active' : ''}
                >
                    Ver Reportes
                </button>

                <button 
                    onClick={() => handleButtonClick('usuarios')}
                    className={contenidoActivo === 'usuarios' ? 'active' : ''}
                >
                    Administrar Usuarios
                </button>
            </div>
            
            {/* --- Contenido Dinámico --- */}
            <div className="dynamic-content">
                {renderContent()}
            </div>
        </div>
    );
}

export default Inscri;