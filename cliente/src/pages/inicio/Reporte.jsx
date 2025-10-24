import React from 'react';

import NavbarParroquia from "../../components/inicio/NavbarParroquia"

import FormularioReporte from '../../components/inicio/FormularioReporte'; // 🚨 Ajusta esta ruta
import { ReportesProvider } from '../../context/ReportesContext';


const PAGE_BACKGROUND = '#f0f2f5'; 

function ReportesPage() {
    return (
        <React.Fragment>
            
            <NavbarParroquia />
            <div style={{ backgroundColor: PAGE_BACKGROUND, minHeight: 'calc(100vh - 120px)' }}> 
                <ReportesProvider>

                    <FormularioReporte />
                </ReportesProvider>
            </div>
        </React.Fragment>
    );
}

export default ReportesPage;