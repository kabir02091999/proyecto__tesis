import React from 'react';

import NavbarParroquia from "../../components/inicio/NavbarParroquia"

import FormularioReporte from '../../components/inicio/FormularioReporte'; // 🚨 Ajusta esta ruta

// Estilos básicos para el fondo de la página, complementando el Navbar
const PAGE_BACKGROUND = '#f0f2f5'; 

function ReportesPage() {
    return (
        <React.Fragment>
            
            <NavbarParroquia />

            
            <div style={{ backgroundColor: PAGE_BACKGROUND, minHeight: 'calc(100vh - 120px)' }}> 
                
                
                <FormularioReporte />
            
            </div>
        </React.Fragment>
    );
}

export default ReportesPage;