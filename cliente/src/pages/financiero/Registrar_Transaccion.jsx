import Nav_Finanzas from "../../components/financiero/Nav_Finanzas";
import NuevaTransaccionBase from "../../components/financiero/nuevaTransaccionBase";

function Reginstrar_Transacciones() {
    return (
        <div className="admin-layout">
            <Nav_Finanzas/>
            <div className="admin-content-main">
             <NuevaTransaccionBase/>   
            </div>
        </div>
    );
}
export default Reginstrar_Transacciones;