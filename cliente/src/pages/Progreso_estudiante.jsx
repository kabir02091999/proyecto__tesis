

import Nav_Inscricion from "../components/inscricion/Nav_Inscricion";
import Get_progreso_estudiante from "../components/inscricion/Get_progreso_estudiante";

// css
import '../css/Poblacion_Lapso.css';

function Progreso_estudiante() {
  return (
    <div className="admin-layout">
      <Nav_Inscricion/>
        <div className="admin-content-main">
            <Get_progreso_estudiante/>
        </div>       
    </div>
  );
}

export default Progreso_estudiante;