import React, { useMemo } from 'react';
// Asegúrate de importar también el CSS principal de FullCalendar
// Si estás usando Vite, puedes añadir esto al inicio de tu componente o en tu index.css
 //import '@fullcalendar/common/main.css'; 
// import '@fullcalendar/daygrid/main.css'; 
//import '@fullcalendar/timegrid/main.css'; 

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';      
import interactionPlugin from '@fullcalendar/interaction'; 
import timeGridPlugin from '@fullcalendar/timegrid'; 
import esLocale from '@fullcalendar/core/locales/es'; 

import '../css/calendario111.css'

// -----------------------------------------------------------
// 💡 FUNCIÓN DE TRANSFORMACIÓN DE DATOS (SIN CAMBIOS)
// -----------------------------------------------------------
const formatEvents = (lapsoData) => {
    return lapsoData
        .filter(item => item.fecha && item.evento)
        .map(item => {
            const fecha = item.fecha;
            const match = fecha.match(/^(\d{4})-(\d{2})-(\d{2})/);
            
            if (!match) return null;

            const year = match[1];
            const month = match[2]; 
            const day = match[3];

            const dateString = `${year}-${month}-${day}`; 

            return {
                title: item.evento || item.liturgico,
                allDay: true, 
                date: dateString,
                duration: { days: 1 }
            };
        })
        .filter(item => item !== null);
};

// -----------------------------------------------------------
// 3. COMPONENTE PRINCIPAL CON FullCalendar (ESTILOS MEJORADOS)
// -----------------------------------------------------------
const FullEventCalendar = ({ calendario }) => {
    const events = useMemo(() => formatEvents(calendario || []), [calendario]);

    return (
        <div style={{ 
            height: '600px', 
            padding: '20px', 
            // 💡 MEJORA 1: Estilo del contenedor
            backgroundColor: '#f9f9f9', // Fondo más suave
            borderRadius: '12px', // Bordes más redondeados
            boxShadow: '0 8px 16px rgba(0,0,0,0.15)', // Sombra más profunda y moderna
            maxWidth: '1200px', // Ancho máximo
            margin: '20px auto' // Centrar el calendario
        }}>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                
                initialView='dayGridMonth'
                locale={esLocale} 
                
                // 💡 MEJORA 2: Estilo de la cabecera (Header)
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay' 
                }}
                
                // 💡 MEJORA 3: Propiedades visuales
                weekends={true} // Mostrar fines de semana
                // Cambiar el texto de los botones a español claro
                buttonText={{
                    today: 'Hoy',
                    month: 'Mes',
                    week: 'Semana',
                    day: 'Día'
                }}
                // Formato de los días de la semana (L, M, X...)
                dayHeaderFormat={{ weekday: 'short' }} 
                // Quitar los bordes entre las celdas (look más limpio)
                dayCellContent={(arg) => arg.dayNumberText} 
                
                // 💡 MEJORA 4: Estilo de los Eventos y Colores
                events={events}
                eventDisplay='block' 
                // Aplicar un color primario a todos los eventos
                eventColor="#4a90e2" // Azul moderno
                eventTextColor="#ffffff" // Texto blanco para contraste
                eventBorderColor="#4a90e2" // Mismo borde
                
                initialDate={new Date()} 
                
                eventClick={(info) => {
                    alert(`Evento Seleccionado:\n${info.event.title}\nFecha: ${info.event.start.toLocaleDateString('es-ES')}`);
                }}
            />
        </div>
    );
};

export default FullEventCalendar;