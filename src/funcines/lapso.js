export function generarDomingosPorLapso(fechaInicio, fechaFin, eventosDB) {
    
    const inicio = new Date(fechaInicio + 'T00:00:00');
    const fin = new Date(fechaFin + 'T00:00:00');
    const domingosLapso = [];
    let currentDate = new Date(inicio);
    
    // Mapeamos los eventos de la DB para un acceso O(1)
    const eventosMap = new Map();
    eventosDB.forEach(item => {
        // La clave es la fecha, el valor es el evento
        eventosMap.set(item.fecha.toISOString().substring(0, 10), item.evento); 
    });

    // ITERAR Y CONSTRUIR LA LISTA
    while (currentDate <= fin) {
        
        // 1. Identificar Domingo (Día 0)
        if (currentDate.getDay() === 0) {
            
            const formattedDate = currentDate.toISOString().substring(0, 10);
            
            // 2. Obtener Evento (Si no hay evento, devuelve "")
            const evento = eventosMap.get(formattedDate) || ""; 
            
            domingosLapso.push({
                fecha: formattedDate,
                evento: evento, // "" si no hay evento
            });
        }
        
        // 3. Avanzar al día siguiente (maneja bisiestos)
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return domingosLapso;
}