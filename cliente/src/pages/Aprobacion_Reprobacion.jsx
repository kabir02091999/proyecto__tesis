import Nav_Inscricion from "../components/inscricion/Nav_Inscricion";

import '../css/Poblacion_Lapso.css';

//componectes

import Get_poblacion_Lapso from "../components/inscricion/Get_poblacion_Lapso";

function Aprobacion_Reprobacion() { 
    return (
        <div className="admin-layout"> 	
            <Nav_Inscricion/> 
            <div className="admin-content-main">

                <Get_poblacion_Lapso/>
                

            </div>
        </div>
    )
}

export default Aprobacion_Reprobacion;