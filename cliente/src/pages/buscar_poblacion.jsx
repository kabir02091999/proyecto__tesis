import Nav_Inscricion from "../components/inscricion/Nav_Inscricion"
import GetPoblacion from "../components/GetPoblacion"

import '../css/Poblacion_Lapso.css'; 

function buscar_poblacion() {
  return (
    <div className="admin-layout">

      <Nav_Inscricion/>

      <div className="admin-content-main">
        <GetPoblacion/>
      </div>
    </div>
  )
}
export default buscar_poblacion