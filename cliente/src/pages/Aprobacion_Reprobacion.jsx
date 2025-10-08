import Nav_Inscricion from "../components/inscricion/Nav_Inscricion";

import '../css/Poblacion_Lapso.css';

function Aprobacion_Reprobacion() { 
    return (
        <div className="admin-layout"> 	
            <Nav_Inscricion/> 
            <div className="admin-content-main">
                <h2>Gestión de Aprobación y Reprobación</h2>
            </div>
        </div>
    )
}

export default Aprobacion_Reprobacion;