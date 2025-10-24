import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../css/Nav_inscricion.css'; 

import {  AseAuth } from '../../context/AuthContext';

import UnetLogo from '../../image/unet2.png'; 

const Nav_contenido = () => {
    const navigate = useNavigate();
    const location = useLocation(); 
    const handleLogout = () => {
        console.log("Cerrando sesión...");
        localStorage.clear(); 
        navigate('/'); 
    };

    const { admin } =  AseAuth();

    const navItems = [
        { name: 'Inicio', path: '/contenido', icon: '🏠'  },
        { name: 'subidad', path: '/contenido/subida', icon: '📝' },/* crear usuario */
        { name: 'calendario', path: '/contenido/Post-calendario-liturgico', icon: '📈' },
        ...(admin ? [{ 
            name: 'inicio administrador', path: '/admin', icon: '⚙'
        }] : [])
    ];
    
    const handleNavigation = (path, name) => {
        console.log(`Navegando a: ${name}`);
        navigate(path);
    };

    return (
      <div className="nav-inscricion-container"> 

      <div className="nav-logos">
        <img src={UnetLogo} alt="Logo UNET" className="logo unet-logo" /> 
      </div>
      <h4 className="nav-title">Gestión de Contenido</h4>
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
      
      {/* 💡 BOTÓN DE CERRAR SESIÓN (SEPARADO Y CON LÓGICA PROPIA) */}
      <div className="logout-section">
          <button 
             onClick={handleLogout}
             className="nav-item-button logout-button" // Puedes agregar un CSS específico: .logout-button
          >
              <span role="img" aria-label="Cerrar cuenta">🔙</span> Cerrar cuenta
          </button>
      </div>

    </div>
    );
};

export default Nav_contenido;