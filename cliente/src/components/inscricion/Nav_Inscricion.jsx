import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom'; 
import '../../css/Nav_inscricion.css'; 

// 1. Importar ambos logos con nombres claros
import UnetLogo from '../../image/unet2.png';     // ⚠️ Ajusta la ruta si es necesario
/* import CatedraLogo from '../../image/cadedra.png'; */ // ⚠️ Asegúrate de que esta ruta sea correcta

const Nav_Inscricion = ({ onOptionSelect }) => {
    const navigate = useNavigate();
    const location = useLocation(); 

    const navItems = [
        // ... (Tu array de navItems se mantiene igual)
        { name: 'Inicio', path: '/catequesis', icon: '🏠' },
        { name: 'Crear Nuevo Registro de estudiante', path: '/catequesis/crear-poblacion', icon: '➕' },
        { name: 'Crear Nuevo lapso', path: '/catequesis/crear-lapso', icon: '➕' },
        { name: 'Crear Nueva fecha de calendario liturgico', path: '/catequesis/Post-calendario-liturgico', icon: '➕' },
        { name: 'Inscribir estudiante en lapso', path: '/catequesis/incribir-poblacion-lapso', icon: '📝' },
        { name: 'Aprobación / Reprobación', path: '/catequesis/aprobacion-reprobacion', icon: '✅' }, 
        { name: 'Progreso del estudiante', path: '/catequesis/progreso-estudiante', icon: '📈' }, 
        { name: 'Buscar poblacion', path: '/catequesis/buscar-poblacion', icon: '🔍' },
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
                {/* Segundo logo: 20% del tamaño del UNET */}
                {/* <img src={CatedraLogo} alt="Logo Cátedra" className="logo catedra-logo" /> */}
            </div>

            <h4 className="nav-title">Gestión de Población</h4>
            <div className="nav-options-list">
                
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
        </div>
    );
};

export default Nav_Inscricion;