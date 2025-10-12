import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom'; 
import '../../css/Nav_inscricion.css'; 

import Unet from '../../image/Unet.png'; // Asegúrate de que la ruta sea correcta

const Nav_Inscricion = ({ onOptionSelect }) => {
    const navigate = useNavigate();
    const location = useLocation(); 

    // Yo defino las rutas y los nombres en un array para mayor limpieza
    const navItems = [
        { name: 'Inicio', path: '/catequesis', icon: '🏠' },
        { name: 'Crear Nuevo Registro de estudiante', path: '/catequesis/crear-poblacion', icon: '➕' },
        { name: 'Crear Nuevo lapso', path: '/catequesis/crear-lapso', icon: '➕' },
        { name: 'Crear Nueva fecha de calendario liturgico', path: '/catequesis/Post-calendario-liturgico', icon: '➕' },
        { name: 'Inscribir estudiante en lapso', path: '/catequesis/incribir-poblacion-lapso', icon: '📝' },
        { name: 'Aprobación / Reprobación', path: '/catequesis/aprobacion-reprobacion', icon: '✅' }, 
        { name: 'Progreso del estudiante', path: '/catequesis/progreso-estudiante', icon: '📈' }, 
        { name: 'Buscar poblacion', path: '/catequesis/buscar-poblacion', icon: '🔍' },
    ];
    
    // Función genérica para manejar toda la navegación
    const handleNavigation = (path, name) => {
        console.log(`Navegando a: ${name}`);
        navigate(path);
    };

    return (
        <div className="nav-inscricion-container">
            <div className="nav-logo">
                <img src={Unet} alt="Logo UNET" className="logo unet-logo" />

            </div>

            <h4 className="nav-title">Gestión de Población</h4>
            <div className="nav-options-list">
                
                {navItems.map((item) => {
                    // 🚨 Determinamos si la ruta actual coincide con el elemento del menú
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