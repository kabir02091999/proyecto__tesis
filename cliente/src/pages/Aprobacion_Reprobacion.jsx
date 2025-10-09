import Nav_Inscricion from "../components/inscricion/Nav_Inscricion";

import '../css/Poblacion_Lapso.css';

//componectes

import Get_poblacion_Lapso from "../components/inscricion/Get_poblacion_Lapso";
import Get_aprobados_reprobados from "../components/inscricion/Get_aprobados_reprobados";

function Aprobacion_Reprobacion() { 
    return (
        <div className="admin-layout"> 	
            <Nav_Inscricion/> 
            <div className="admin-content-main">

                <Get_poblacion_Lapso/>
                <Get_aprobados_reprobados/>

            </div>
        </div>
    )
}

export default Aprobacion_Reprobacion;