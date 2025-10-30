import Buscar_finansa from "../../components/financiero/Buscar_finansa";
import Generar_finasas_mes from "../../components/financiero/Generar_finasas_mes";
import Nav_Finanzas from "../../components/financiero/Nav_Finanzas";
import '../../css/Poblacion_Lapso.css'; 

function Reporte_finaciero() {
    return (
    <div className="admin-layout">
            <Nav_Finanzas/>
            <div className="admin-content-main">
                <Generar_finasas_mes/>
            </div>
        </div>
  );
}
export default Reporte_finaciero;