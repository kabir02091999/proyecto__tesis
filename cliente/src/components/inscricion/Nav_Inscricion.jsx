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

    const handleOpciontres = () => {
        console.log("Mensaje de la Opción 3: ¡Navegando a la búsqueda!");
        navigate('/catequesis/crear-lapso');
    }

    const handleOpcionCuatro = () => {
        console.log("Mensaje de la Opción 4: ¡Navegando a la inscripción de lapso!");
        navigate('/catequesis/incribir-poblacion-lapso');
    }
    const handleOpcioncinco = () => {
        console.log("Mensaje de la Opción 5: ¡Navegando a la aprobacion!");
        
        navigate('/catequesis/aprobacion-reprobacion');///ojo con el diseño 
    }

    const handleOpcionseis = () => {
        console.log("Mensaje de la Opción 6: ¡Navegando a la aprobacion!");
        navigate('/catequesis/progreso-estudiante');///ojo con el diseño 
    }

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

                <button 
                    onClick={handleOpciontres}
                    className="nav-item-button"
                >
                    ➕ Crear Nuevo lapso 
                </button>

                <button 
                    onClick={handleOpcionCuatro}
                    className="nav-item-button"
                >
                    📝 Inscribir estudiante en lapso 
                </button>

                <button 
                    onClick={handleOpcioncinco}
                    className="nav-item-button"
                >
                    📝 aprobacion 
                </button>

                <button 
                    onClick={handleOpcionseis}
                    className="nav-item-button"
                >
                    📝 Progreso del estudiante
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