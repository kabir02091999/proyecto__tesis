import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../css/Nav_inscricion.css'; 

import UnetLogo from '../../image/unet2.png'; 

const Nav_Finanzas = () => {
    const navigate = useNavigate();
    const location = useLocation(); 

    const navItems = [
        { name: 'Inicio', path: '/financiero', icon: '🏠'  },
        { name: 'Registrar Transacciones', path: '/financiero/registrar-transacciones', icon: '📝' },
        { name: 'Reporte de Ingresos/Egresos', path: '/financiero/reportes', icon: '📈' },
        /* { name: 'Balance General', path: '/financiero/balance', icon: '⚖️' }, */ 
        { name: 'Buscar Transacción', path: '/financiero/buscar', icon: '🔍' },
        { name: 'Volver a Catequesis', path: '/catequesis', icon: '🔙' },
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
      <h4 className="nav-title">Gestión de Finanzas</h4>
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

export default Nav_Finanzas;