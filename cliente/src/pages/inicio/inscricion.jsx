import React from 'react';
import NavbarParroquia from "../../components/inicio/NavbarParroquia"
import '../../css/inicion/inscricion.css';

function Inscricion() {
    return (
        <React.Fragment>
            <NavbarParroquia/>

            <div className="inscricion-page-wrapper">
                <div className="inscricion-content-wrapper">
                    
                    <h2 className="inscricion-header">Proceso de Inscripción - Sacramento de la Confirmación</h2>
                    
                    <h3 className="inscricion-section-title">Información General de la Catequesis</h3>
                    <p className="inscricion-p">
                        [cite_start]Este proceso de inscripción corresponde al programa del Sacramento de la Confirmación [cite: 2] impartido en la sede UNET por la Parroquia Divino Maestro.
                    </p>
                    <ul className="inscricion-list">
                        [cite_start]<li>Período de Catequesis: La programación abarca desde el **2 de febrero de 2025 hasta el 30 de noviembre de 2025**[cite: 3, 5].</li>
                        [cite_start]<li>Sede: **UNET**[cite: 1].</li>
                        [cite_start]<li>Inicio: Las actividades inician el 2/2/2025[cite: 5].</li>
                        [cite_start]<li>Requisito: Se aplicará una prueba diagnóstica al inicio[cite: 5].</li>
                    </ul>

                    <h3 className="inscricion-section-title">Pasos y Requisitos para la Inscripción</h3>
                    <p className="inscricion-p">
                        Para formalizar la inscripción en el programa de Catequesis de Confirmación, siga estos pasos:
                    </p>
                    <ol className="inscricion-list">
                        <li>Descargar la Planilla: Utilice el botón de descarga a continuación para obtener la Planilla de Programación y Pre-Inscripción.</li>
                        [cite_start]<li>Completar la Información: Rellene la planilla con los datos solicitados (incluyendo la sección y los datos del Catequista responsable [cite: 6, 7]).</li>
                        <li>Entrega: Consigne la planilla en la oficina parroquial para la formalización antes del inicio de las actividades.</li>
                    </ol>

                    <h3 className="inscricion-section-title">Descarga de Planilla de Programación (PDF)</h3>
                    <p className="inscricion-p">
                        Este documento es la planilla oficial que debe llenar y entregar para la inscripción.
                    </p>
                    
                    <a 
                        href="/path/to/tu_planilla_confirmacion_2025.pdf" 
                        download="Planilla_Confirmacion_2025"
                        className="inscricion-download-button"
                    >
                        Descargar Planilla de Inscripción (PDF)
                    </a>

                </div>
            </div>
        </React.Fragment>
    );
}

export default Inscricion;