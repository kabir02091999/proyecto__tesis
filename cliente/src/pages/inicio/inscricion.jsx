import React from 'react';
import NavbarParroquia from "../../components/inicio/NavbarParroquia"
import '../../css/inicion/inscricion.css';
// 💡 NUEVA IMPORTACIÓN PARA GENERAR EL PDF
import { PDFDownloadLink } from '@react-pdf/renderer'; 
import InscripcionCatequesisPDF from '../../components/pdf/InscripcionCatequesisPDF'; // <<-- AJUSTA ESTA RUTA

function Inscricion() {
    return (
        <React.Fragment>
            <NavbarParroquia/>

            <div className="inscricion-page-wrapper">
                <div className="inscricion-content-wrapper">
                    
                    {/* TÍTULO: Proceso de Inscripción: Sacramento de la Primera Confesión/Primera Comunión [cite: 5]*/}
                    <h2 className="inscricion-header">Proceso de Inscripción: Sacramento de la Primera Confesión/Primera Comunión</h2>
                    
                    {/* Información General (Texto ajustado para coincidir con el documento) */}
                    <h3 className="inscricion-section-title">Sobre la Catequesis</h3>
                    <p className="inscricion-p">
                        Este es el proceso oficial para la inscripción en el programa de Catequesis de Primera Confesión/Comunión (Nivel 1 y 2), impartido en la sede UNET por la Parroquia Divino Maestro.
                    </p>

                    {/* Requisitos y Documentos */}
                    <h3 className="inscricion-section-title">Documentos Obligatorios</h3>
                    <p className="inscricion-p">
                        Para formalizar la inscripción del aspirante a Catequizando, debe presentar los siguientes documentos:
                    </p>
                    <ul className="inscricion-list">
                        <li><strong>Del Catequizando (Niño/a):</strong>
                            <ul>
                                <li>1 fotocopia de la Cédula de Identidad o Partida de Nacimiento.</li>
                                <li>1 fotografía tipo carnet reciente.</li>
                            </ul>
                        </li>
                        <li><strong>Del Representante:</strong>
                            <ul>
                                <li>1 fotocopia de la Cédula de Identidad del Representante.</li>
                            </ul>
                        </li>
                    </ul>

                    {/* Pasos de Inscripción */}
                    <h3 className="inscricion-section-title">Pasos para Inscribirse</h3>
                    <p className="inscricion-p">
                        Siga estos tres pasos para completar el registro y la formalización en la oficina:
                    </p>
                    <ol className="inscricion-list">
                        <li>Descargue la Planilla: Use el botón de abajo para obtener la planilla de pre-inscripción oficial.</li>
                        <li>Complete y Firme: Llene todos los datos solicitados en la planilla.</li>
                        <li>Consigne: Entregue la planilla llena, junto con todos los documentos requeridos, en la oficina parroquial antes de iniciar las actividades.</li>
                    </ol>

                    {/* Descarga */}
                    <h3 className="inscricion-section-title">Descarga la Planilla (PDF)</h3>
                    
                    
                    <PDFDownloadLink
                        document={<InscripcionCatequesisPDF />} 
                        fileName="Planilla_Inscripcion_Catequesis_DM.pdf" 
                        className="inscricion-download-button"
                    >
                        {({ loading }) =>
                            
                            loading ? 'Preparando documento...' : 'Descargar Planilla de Inscripción (PDF)'
                        }
                    </PDFDownloadLink>

                </div>
            </div>
        </React.Fragment>
    );
}

export default Inscricion;