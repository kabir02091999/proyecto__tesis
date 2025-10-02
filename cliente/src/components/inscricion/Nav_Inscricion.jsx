// src/components/Nav_Inscricion.jsx

import React from 'react';

import '../../css/Nav_inscricion.css'; // Asegúrate de tener los estilos necesarios

import { useNavigate } from 'react-router-dom';

const Nav_Inscricion = ({ onOptionSelect }) => {

    const navigate = useNavigate();
    
    // Función que se ejecuta al hacer clic en la Opción 1
    const handleOpcionUno = () => {
        console.log("Mensaje de la Opción 1: ¡Navegando a la creación!");
        // Aquí podrías llamar a onOptionSelect('crear') si usaras props
    };
    
    // Función que se ejecuta al hacer clic en la Opción 2
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
                    onClick={handleOpcionUno}
                    className="nav-item-button"
                >
                    ➕ Crear Nuevo Registro
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