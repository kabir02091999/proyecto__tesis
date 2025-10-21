import Archivo from "../../components/contenido/archivo";
import Nav_contenido from "../../components/contenido/Nav_contenido";


function Subida () {
  return (
    <div className="admin-layout">
        <Nav_contenido/>
        <div className="admin-content-main">
            
            <Archivo/>

        </div>
    </div>
  )
}
export default Subida;