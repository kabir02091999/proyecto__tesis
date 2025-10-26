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
// 2. FUNCIÓN DE TRANSFORMACIÓN DE DATOS (Arreglo de fecha - CORREGIDO)
// -----------------------------------------------------------
const formatEvents = (lapsoData) => {
    return lapsoData
        .filter(item => item.fecha && item.evento)
        .map(item => {
            const datePart = item.fecha.substring(0, 10);
            
            // 💡 SOLUCIÓN: Usar parse(dateString) y forzar la fecha como UTC para evitar 
            // problemas de huso horario en eventos allDay.
            const parts = datePart.split('-');
            const year = parseInt(parts[0], 10);
            const monthIndex = parseInt(parts[1], 10) - 1; // Meses en JavaScript son 0-indexados
            const day = parseInt(parts[2], 10);
            
            // Crea la fecha forzando la interpretación como UTC (ej: 2025-10-26 12:00:00 UTC)
            // Esto asegura que al convertir a la hora local, no retroceda al día anterior.
            const dateObjectUTC = new Date(Date.UTC(year, monthIndex, day, 12)); 
            
            return {
                title: item.evento,
                allDay: true,
                start: dateObjectUTC, // Usamos la fecha corregida en UTC
                end: dateObjectUTC,   
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