import Archivo from "../../components/contenido/archivo";
import ContenidoConfiguracion from "../../components/contenido/Contenido";
import Nav_contenido from "../../components/contenido/Nav_contenido";



function Subida () {
  return (
    <div className="admin-layout">
        <Nav_contenido/>
        <div className="admin-content-main">
            
            {/* <Archivo/> */}
            <ContenidoConfiguracion/>

        </div>
    </div>
  )
}
export default Subida;