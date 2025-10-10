
import Nav_Inscricion from "../components/inscricion/Nav_Inscricion";
import Calendario_liturgico from "../components/Calendario_liturgico";
import '../css/Poblacion_Lapso.css'; 

function CalendarioPage() { 
    return (
        
        <div className="admin-layout"> 
            
            <Nav_Inscricion/>  
                      
            <div className="admin-content-main">

                <Calendario_liturgico/>
                
            </div>
            
        </div>
    );
}
export default CalendarioPage;