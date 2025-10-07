import React from 'react';
import Nav_Inscricion from "../components/inscricion/Nav_Inscricion";
import PostLapso from "../components/inscricion/PostLapso";
import GetFechas from "../components/inscricion/GetFechas";

// Importamos el CSS del layout general
import '../css/inscri.css'; 

function Crear_lapso() {
    return (
        <div className="admin-layout">
            
            {/* Columna 1: Navegación Lateral */}
            <Nav_Inscricion/> 
            
            {/* Columna 2: Contenido Principal (Lo agrupamos en un div) */}
            <div className="admin-content">
                <PostLapso/>
                {/* Ahora GetFechas está correctamente debajo de PostLapso */}
                <GetFechas/> 
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