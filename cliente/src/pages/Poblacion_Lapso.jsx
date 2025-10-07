// componete navegacion para inscribir poblacion en lapso

import Nav_Inscricion from "../components/inscricion/Nav_Inscricion";
import {usePoblacion} from '../context/PoblacionContext';
//import '../css/inscri.css';

import '../css/Poblacion_Lapso.css';

//componente para inscribir poblacion en lapso
import Inscribir_poblacion from "../components/inscricion/Inscribir_poblacion";

function Poblacion_Lapso() {
    const {Lapso} = usePoblacion();
    
    // 


    return (
        // Contenedor principal que define las dos columnas
        <div className="admin-layout"> 	
            <Nav_Inscricion/> 
            <div className="admin-content-main">
                <Inscribir_poblacion/>
            </div>
        </div>
    )
} 	
export default Poblacion_Lapso;
