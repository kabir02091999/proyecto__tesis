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
        <div
  style={{
    width: "100%",
    height: "100%",
    maxWidth: "1200px",
    margin: "20px auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "12px",
    boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
    boxSizing: "border-box",
  }}
>
  <div style={{ width: "100%", height: "100%" }}>
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
      initialView="dayGridMonth"
      locale={esLocale}
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
      }}
      weekends={true}
      buttonText={{
        today: "Hoy",
        month: "Mes",
        week: "Semana",
        day: "Día",
      }}
      dayHeaderFormat={{ weekday: "short" }}
      dayCellContent={(arg) => arg.dayNumberText}
      events={events}
      eventDisplay="block"
      eventColor="#4a90e2"
      eventTextColor="#ffffff"
      eventBorderColor="#4a90e2"
      height="auto"
      contentHeight="auto"
      expandRows={true}
      aspectRatio={1.35}
      eventClick={(info) => {
        alert(
          `Evento Seleccionado:\n${info.event.title}\nFecha: ${info.event.start.toLocaleDateString(
            "es-ES"
          )}`
        );
      }}
    />
  </div>
</div>
    );
};

export default FullEventCalendar;