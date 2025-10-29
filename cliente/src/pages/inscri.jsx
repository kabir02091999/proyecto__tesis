import React, { useEffect } from 'react';

import { AseAuth } from '../context/AuthContext';

// Componentes propios
import EventCalendar from '../components/calendario';
import Nav_Inscricion from '../components/inscricion/Nav_Inscricion';
import GetPoblacion from '../components/GetPoblacion';

import { usePoblacion } from '../context/PoblacionContext';
import '../css/Poblacion_Lapso.css';
import '../css/imprimir.css';
import '../css/Calendario_Estilos.css'; // Estilos específicos para el calendario
import { ReportesProvider } from '../context/ReportesContext';
import Reportes from '../components/Reportes';


function Inscri() {
    
  
    const { calendario, Getcalendario } = AseAuth();
    useEffect(() => {

        Getcalendario();
        

    }, []);

    console.log(calendario)

    return (
        <div className="admin-layout">
            <Nav_Inscricion />
            <div className="admin-content-main">
                {/* <GetPoblacion/> */}
                <ReportesProvider>
                    <Reportes />
                </ReportesProvider>

                <div className="calendar-view">
                    <h1>Calendario de Programación Confirmación</h1>
                    <EventCalendar calendario={calendario} />
                </div>
            </div>
        </div>
    );
}

export default Inscri;