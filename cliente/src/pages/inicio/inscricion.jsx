import React, { useState } from 'react';
import NavbarParroquia from "../../components/inicio/NavbarParroquia"
import '../../css/inicion/inscricion.css';
// 💡 NUEVA IMPORTACIÓN PARA GENERAR EL PDF
import { PDFDownloadLink } from '@react-pdf/renderer'; 
import InscripcionCatequesisPDF from '../../components/pdf/InscripcionCatequesisPDF'; // <<-- AJUSTA ESTA RUTA
import Sacramento_Confimacion from '../../components/pdf/Sacramento_Confimacion';

function Inscricion() {
    // Estado para controlar la pestaña activa: 'nivel1-2' o 'nivel3'
    const [activeTab, setActiveTab] = useState('nivel1-2');

    // Estilos temporales para las pestañas
    const tabStyles = `
        .tab-container {
            display: flex;
            margin-bottom: 20px;
            border-bottom: 2px solid #e0e0e0;
        }
        .tab-button {
            padding: 10px 15px;
            cursor: pointer;
            background: none;
            border: none;
            font-size: 1.1em;
            font-weight: 500;
            color: #666;
            border-bottom: 2px solid transparent;
            transition: all 0.3s ease;
            outline: none;
        }
        .tab-button:hover {
            color: #007bff;
        }
        .tab-button.active {
            color: #007bff;
            border-bottom: 2px solid #007bff;
            font-weight: 600;
        }
        .tab-content {
            padding-top: 20px;
        }
    `;

    // Contenido para el Nivel 1/2 (Contenido original)
    const Nivel12Content = (
        <>
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
        </>
    );

    // Contenido para el Nivel 3 (Vacío)
    const Nivel3Content = (
        
        <>
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
                        <li>1 fotocopia del certificado de la Primera Comunión </li>
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
                document={<Sacramento_Confimacion />} 
                fileName="Sacramento_confirmacion.pdf" 
                className="inscricion-download-button"
            >
                {({ loading }) =>
                    loading ? 'Preparando documento...' : 'Descargar Planilla de Inscripción (PDF)'
                }
            </PDFDownloadLink>

        </>
    );

    return (
        <React.Fragment>
            <NavbarParroquia/>
            {/* Incluir los estilos de las pestañas */}
            <style>{tabStyles}</style>

            <div className="inscricion-page-wrapper">
                <div className="inscricion-content-wrapper">
                    
                    {/* TÍTULO PRINCIPAL */}
                    <h2 className="inscricion-header">Proceso de Inscripción de Catequesis</h2>
                    
                    {/* Contenedor de Pestañas */}
                    <div className="tab-container">
                        <button 
                            className={`tab-button ${activeTab === 'nivel1-2' ? 'active' : ''}`} 
                            onClick={() => setActiveTab('nivel1-2')}
                        >
                            Nivel 1/2 (Comunión)
                        </button>
                        <button 
                            className={`tab-button ${activeTab === 'nivel3' ? 'active' : ''}`} 
                            onClick={() => setActiveTab('nivel3')}
                        >
                            Nivel 3 (Confirmación)
                        </button>
                    </div>

                    {/* Contenido Condicional */}
                    {activeTab === 'nivel1-2' ? Nivel12Content : Nivel3Content}

                </div>
            </div>
        </React.Fragment>
    );
}

export default Inscricion;