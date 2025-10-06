import React from 'react';
import Nav_Inscricion from "../components/inscricion/Nav_Inscricion";
import PostLapso from "../components/inscricion/PostLapso";
import GetFechas from "../components/inscricion/GetFechas";

// Importamos el CSS del layout general
import '../css/inscri.css'; 
// Importamos el CSS específico de este componente si es necesario (Crear_lapso.css)

function Crear_lapso() {
    return (
        // 🚨 1. Usamos la clase base 'admin-layout' que define la estructura de 2 COLUMNAS
        <div className="admin-layout">
            
            {/* 🚨 2. Colocamos Nav_Inscricion en la barra lateral, usando la clase 'sidebar' */}
            {/* Esto hace que Nav_Inscricion ocupe la columna izquierda de 250px */}
            <div className="sidebar">
                {/* Nota: Envuelve Nav_Inscricion en un div si necesitas un padding/contenedor adicional */}
                <Nav_Inscricion/> 
            </div>

            {/* 🚨 3. Colocamos el contenido en el área principal, usando la clase 'main-content' */}
            {/* Esto hace que ocupe el resto del espacio a la derecha */}
            <div className="main-content">
                
                {/* Contenedor interno para el formulario y la tabla, apilados verticalmente */}
                <div className="lapso-content-area">
                    {/* El Formulario de Lapso ya tiene su clase de estilo interno (lapso-form-container) */}
                    <PostLapso/>
                    
                    {/* La Tabla de Fechas ya tiene su clase de estilo interno (table-lapso-container) */}
                    <GetFechas/>
                </div>
            </div>
        </div>
    );
}
export default Crear_lapso;


/* .admin-layout {
    display: flex; 
    min-height: 100vh; 
    width: 100%;
} */