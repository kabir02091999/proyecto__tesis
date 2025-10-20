import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom'; 
import '../../css/Nav_inscricion.css'; 

import UnetLogo from '../../image/unet2.png'; 

const Nav_Inscricion = ({ onOptionSelect }) => {
    const navigate = useNavigate();
    const location = useLocation(); 

    // Función que maneja el cierre de sesión
    const handleLogout = () => {
        console.log("Cerrando sesión de Catequesis/Inscripción...");
        
        // 1. Borrar la información de la sesión del almacenamiento local.
        // Esto elimina tokens de sesión, datos de usuario, etc.
        localStorage.clear(); 
        
        // 2. Redirigir al usuario a la ruta de inicio (login).
        // Usaré '/' como ruta de inicio por defecto; ajústala si tu login es diferente (ej: '/login').
        navigate('/'); 
    };

    const navItems = [
        
        { name: 'Inicio', path: '/catequesis', icon: '🏠' },
        { name: 'Crear Nuevo Registro de estudiante', path: '/catequesis/crear-poblacion', icon: '➕' },
        { name: 'Crear Nuevo lapso', path: '/catequesis/crear-lapso', icon: '➕' },
        { name: 'Crear Nueva fecha de calendario liturgico', path: '/catequesis/Post-calendario-liturgico', icon: '➕' },
        { name: 'Inscribir estudiante en lapso', path: '/catequesis/incribir-poblacion-lapso', icon: '📝' },
        { name: 'Aprobación / Reprobación', path: '/catequesis/aprobacion-reprobacion', icon: '✅' }, 
        { name: 'Progreso del estudiante', path: '/catequesis/progreso-estudiante', icon: '📈' }, 
        { name: 'Buscar poblacion', path: '/catequesis/buscar-poblacion', icon: '🔍' },
        { name: 'Generar PDF', path: '/catequesis/pdf', icon: '📄' },
        // Ya no incluimos "Cerrar cuenta" aquí, lo pondremos como un botón separado
    ];
    
    const handleNavigation = (path, name) => {
        console.log(`Navegando a: ${name}`);
        navigate(path);
    };

    return (
        <div className="nav-inscricion-container">
            {/* 2. Usamos la clase 'nav-logos' para aplicar los estilos de apilamiento y tamaño */}
            <div className="nav-logos">
                {/* Logo principal */}
                <img src={UnetLogo} alt="Logo UNET" className="logo unet-logo" /> 
            </div>

            <h4 className="nav-title">Gestión de Población</h4>
            <div className="nav-options-list">
                
                {/* Renderizado de los elementos de navegación normales */}
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path; 

                    return (
                        <button 
                            key={item.path}
                            onClick={() => handleNavigation(item.path, item.name)}
                            className={`nav-item-button ${isActive ? 'active-nav-item' : ''}`}
                        >
                            <span role="img" aria-label={item.name}>{item.icon}</span> {item.name}
                        </button>
                    );
                })}
                
            </div>
            
            {/* 💡 SECCIÓN DEDICADA PARA EL BOTÓN DE CERRAR SESIÓN */}
            <div className="logout-section">
                <button 
                    onClick={handleLogout}
                    className="nav-item-button logout-button" // Usamos la función de Logout
                >
                    <span role="img" aria-label="Cerrar sesión">🔙</span> Cerrar cuenta
                </button>
            </div>

        </div>
    );
};

export default Nav_Inscricion;