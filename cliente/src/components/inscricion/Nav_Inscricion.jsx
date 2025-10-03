// src/components/Nav_Inscricion.jsx

import React from 'react';

import '../../css/Nav_inscricion.css'; // Asegúrate de tener los estilos necesarios

import { useNavigate } from 'react-router-dom';

const Nav_Inscricion = ({ onOptionSelect }) => {

    const navigate = useNavigate();
    
    const handleInicio = () => {
        console.log("Mensaje de Inicio: Navegando a la página principal.");
        navigate('/catequesis'); // 👈 Navega a la ruta raíz
    };


    const handleOpcionUno = () => {
        console.log("Mensaje de la Opción 1: ¡Navegando a la creación!");
        navigate('/catequesis/crear-poblacion');
    };
    
    
    const handleOpcionDos = () => {
        console.log("Mensaje de la Opción 2: ¡Navegando a la búsqueda!");
        navigate('/catequesis/buscar-poblacion');
    };

    return (
        <div className="nav-inscricion-container">
            <h4 className="nav-title">Gestión de Población</h4>
            <div className="nav-options-list">
                
                {/* Opción 1: Crear */}
                <button 
                    onClick={handleInicio}
                    className="nav-item-button nav-home-button" // Usamos una clase extra para estilos específicos
                >
                    🏠 Inicio
                </button>


                <button 
                    onClick={handleOpcionUno}
                    className="nav-item-button"
                >
                    ➕ Crear Nuevo Registro de estudiante 
                </button>
                
                {/* Opción 2: Buscar */}
                <button 
                    onClick={handleOpcionDos}
                    className="nav-item-button"
                >
                    🔍 Buscar poblacion
                </button>
                
            </div>
        </div>
    );
};

export default Nav_Inscricion;