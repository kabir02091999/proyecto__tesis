

import Nav_contenido from "../../components/financiero/Nav_Finanzas";
import Calendario_liturgico from "../../components/Calendario_liturgico";
import CalendarUploader from "../../components/CalendarUploader";
import '../../css/Poblacion_Lapso.css'; 

function CalendarioPageFin() { 
    return (
        
        <div className="admin-layout"> 
            
            <Nav_contenido/>
            <div className="admin-content-main">

                <Calendario_liturgico/>
                <CalendarUploader/>

            </div>
            
        </div>
    );
}
export default CalendarioPageFin;