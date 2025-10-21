import React, {useEffect} from 'react';

import { AseAuth } from '../context/AuthContext';

// Componentes propios
import EventCalendar from '../components/calendario'; 
import Nav_Inscricion from '../components/inscricion/Nav_Inscricion';
import GetPoblacion from '../components/GetPoblacion';

import { usePoblacion } from '../context/PoblacionContext'; 
import '../css/Poblacion_Lapso.css'; 
import '../css/imprimir.css';
import '../css/Calendario_Estilos.css'; // Estilos específicos para el calendario

const PROGRAMACION_DATA_EJEMPLO = [
    { fecha: '2/2/2025', liturgico: 'La Presentación del Señor (Fiesta)' },
    { fecha: '9/3/2025', liturgico: 'I Domingo de Cuaresma' },
    { fecha: '20/4/2025', liturgico: 'Domingo de Pascua de la Resurrección del Señor' },
    { fecha: '2025/12/10', liturgico: 'XXVIII Domingo del Tiempo Ordinario' },
    { fecha: '30/10/2025', liturgico: 'Cierre de actividades / I Domingo de Adviento' },
];


function Inscri() {
    const calendarioData = PROGRAMACION_DATA_EJEMPLO;
    const { calendario, Getcalendario } = AseAuth();
    useEffect(() => {
        
        Getcalendario();
        console.log("calendario desde inscri", calendario)


    }, []);

    return (
        <div className="admin-layout">
            <Nav_Inscricion /> 
            <div className="admin-content-main">
                <GetPoblacion/>
                <div className="calendar-view">
                    <h1>Calendario de Programación Confirmación</h1> 
                    <EventCalendar calendario={calendario} /> 
                </div>
            </div>
        </div>
    );
}

export default Inscri;