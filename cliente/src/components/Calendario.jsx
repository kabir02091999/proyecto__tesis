import React, { useMemo } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { parse, format, startOfWeek, getDay } from 'date-fns'; 
import es from 'date-fns/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css'; // Estilos

// -----------------------------------------------------------
// 💡 SOLUCIÓN TRUNCAMIENTO: Componente Envoltorio Personalizado
// -----------------------------------------------------------
const CustomEventWrapper = ({ event }) => (
    <div 
        title={event.title} 
        style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: 'block', 
            width: '100%',
            height: '100%',
            color: 'inherit', 
            fontSize: 'inherit'
        }}
    >
        {event.title}
    </div>
);


// -----------------------------------------------------------
// 1. CONFIGURACIÓN DEL LOCALIZADOR (Sin cambios)
// -----------------------------------------------------------
const locales = { 'es': es };

const localizer = dateFnsLocalizer({
  format: (date, formatStr, options) => format(date, formatStr, options),
  parse: (date, formatStr, options) => parse(date, formatStr, new Date(), options),
  startOfWeek: (date) => startOfWeek(date, { locale: es, weekStartsOn: 1 }), 
  getDay,
  locales,
});

// -----------------------------------------------------------
// 2. FUNCIÓN DE TRANSFORMACIÓN DE DATOS (Arreglo de fecha)
// -----------------------------------------------------------
const formatEvents = (lapsoData) => {
    return lapsoData
        .filter(item => item.fecha && item.evento) 
        .map(item => {
            const datePart = item.fecha.substring(0, 10); 
            const dateObjectLocal = new Date(datePart); 
            
            if (!isNaN(dateObjectLocal)) {
                dateObjectLocal.setHours(12, 0, 0, 0); 
            }

            return {
                title: item.evento,
                allDay: true,
                start: dateObjectLocal, 
                end: dateObjectLocal,   
                originalEvent: item 
            };
        });
};

// -----------------------------------------------------------
// 3. COMPONENTE PRINCIPAL (Integrando la solución de truncamiento)
// -----------------------------------------------------------
const EventCalendar = ({ calendario }) => {
    const events = useMemo(() => formatEvents(calendario || []), [calendario]);

    return (
        <div style={{ 
                height: '600px', 
                margin: '10px',
                width: '100%',         // Asegura que ocupe el 100% del .calendar-view
                maxWidth: '100%',      // Evita que crezca más allá
                overflow: 'hidden' }}>
            <Calendar
                localizer={localizer}
                events={events}
                defaultView='month'
                messages={{ next: "Sig", previous: "Ant", today: "Hoy", month: "Mes", week: "Semana", day: "Día", agenda: "Agenda", date: "Fecha", time: "Hora", event: "Evento", allDay: "Todo el día", }}
                culture='es' 
                startAccessor="start"
                endAccessor="end"
                titleAccessor="title"
                
                // 💡 SOLUCIÓN CRÍTICA: Sobrescribir el renderizado del evento
                components={{
                    event: CustomEventWrapper, 
                }}
                
                onSelectEvent={(event) => alert(`Evento: ${event.title}\nFecha: ${event.start.toLocaleDateString('es-ES')}`)}
            />
        </div>
    );
};

export default EventCalendar;