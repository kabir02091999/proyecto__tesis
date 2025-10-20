import Buscar_finansa from "../../components/financiero/Buscar_finansa";
import Nav_Finanzas from "../../components/financiero/Nav_Finanzas";


function Reporte_finaciero() {
    return (
    <div className="admin-layout">
            <Nav_Finanzas/>
            <div className="admin-content-main">
                <Buscar_finansa/>
            </div>
        </div>
  );
}
export default Reporte_finaciero;