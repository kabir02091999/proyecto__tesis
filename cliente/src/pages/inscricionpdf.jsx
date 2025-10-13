import Get_inscrito_pfd from "../components/inscricion/Get_inscrito_pdf";
import Nav_Inscricion from "../components/inscricion/Nav_Inscricion";

// css
import '../css/Poblacion_Lapso.css';

function InscripcionPDF() {
    return (
        <div className="admin-layout">
            <Nav_Inscricion/>

            <div className="admin-content-main">
                
                <Get_inscrito_pfd/>
                
            </div>

        </div>
    );
}

export default InscripcionPDF;