import React, { useMemo } from 'react';


import imagen from "../../image/logoparroquia.png"; // Asegúrate de que la ruta sea correcta



// Datos del documento (hardcodeados)
const DOC_TITLES = {
    parroquia: "PARROQUIA Divino Maestro",
    sede: "SEDE UNET",
    sacramento: "SACRAMENTO DE LA PRIMERA CONFESIÓN / PRIMERA COMUNIÓN",
    planilla: "PLANILLA DE ASISTENCIA",
};

const tdStyle = {
    verticalAlign: 'top',
    border: '1px solid #ccc',
    padding: '4px',
    border: '1px solid #000',
    padding: '2px 4px',
    fontSize: '9pt',
    textAlign: 'center',
    minWidth: 30,
};

const semanaStyle = {
    wordBreak: 'break-word',
    fontSize: 10
}

const flexContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    alignItems: 'center'
};

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        margin: '0 auto',
        padding: '10px',
        maxWidth: '800px',
        border: '1px solid #ccc',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)'
    },
    header: {
        textAlign: 'center',
        marginBottom: '20px'
    },
    logo: {
        width: 'auto',
        height: '70px',
        marginBottom: '5px'
    },
    h1: {
        fontSize: '14pt',
        fontWeight: 'bold',
        color: '#333',
        margin: '5px 0'
    },
    h2: {
        fontSize: '11pt',
        fontWeight: 'normal',
        color: '#555',
        margin: '5px 0'
    },
    table: {
        width: '100%',
        tableLayout: 'fixed',
        borderCollapse: 'collapse',
        marginTop: '20px'
    },
    th: {
        border: '1px solid #000',
        padding: '8px 4px',
        backgroundColor: '#f2f2f2',
        fontSize: '10pt',
        fontWeight: 'bold',
        textAlign: 'center',
        verticalAlign: 'top'
    },
    td: {
        border: '1px solid #000',
        padding: '2px 4px',
        fontSize: '9pt',
        textAlign: 'center'
    },
    infoRow: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '10pt',
        marginBottom: '10px',
        borderBottom: '1px dashed #ccc',
        paddingBottom: '5px'
    },
    signatureSpace: {
        borderBottom: '1px solid #000',
        padding: '0 10px',
        minWidth: '50px',
        display: 'inline-block'
    },
    infoHeader: {
        fontWeight: 'bold'
    },
    invisibleTextStyle : {
        opacity: 0,
        userSelect: 'none',
        pointerEvents: 'none'
    }
};



const AsistenciaTableRow = ({ col1Data, col2Data, tdStyle, semanaStyle, styles }) => {
    return (
        <tr>
            <td style={tdStyle}>
                <div style={flexContainerStyle}>
                    <div style={semanaStyle}>{col1Data.week}</div>
                    <span>{col1Data.date}</span>
                </div>
            </td>
            <td style={styles.td}>{col1Data.week && 'SÍ__ NO__'}</td>
            <td style={styles.td}>{col1Data.week && 'SÍ__ NO__'}</td>
            <td style={{...styles.td,...styles.invisibleTextStyle}}>FIRMA QUE NO SE RENDERIZA</td>

            <td style={tdStyle}>
                <div style={flexContainerStyle}>
                    <div style={semanaStyle}>{col2Data.week}</div>
                    <span>{col2Data.date}</span>
                </div>
            </td>
            <td style={styles.td}>{col2Data.week && 'SÍ__ NO__'}</td>
            <td style={styles.td}>{col2Data.week && 'SÍ__ NO__'}</td>
            <td style={styles.td}></td>
        </tr>
    );
};


function PlanillaAsistencia({ data, contentRef }) {

    const parsedData = data.map((item, index) => {
        return {
            week: `Semana ${index}`,
            date: item.fecha
        }
    })

    return (
        <div style={styles.container} id='print' ref={contentRef} className="planilla-asistencia">

            {/* CABECERA */}
            <header style={styles.header}>
                
                <img
                    src={imagen}
                    alt="Logo Parroquia Divino Maestro"

                    style={styles.logo}
                />
                <div style={styles.infoHeader}>{DOC_TITLES.parroquia.toUpperCase()}</div>
                <div style={styles.infoHeader}>{DOC_TITLES.sede.toUpperCase()} </div>
                <div style={styles.infoHeader}>{DOC_TITLES.sacramento.toUpperCase()} </div>
                <div style={styles.infoHeader}>
                    {DOC_TITLES.planilla.toUpperCase()}
                </div>
            </header>

            {/* TABLA DE ASISTENCIA (Estructura de 2 columnas) */}
            <table style={styles.table}>
                <thead>
                    <tr>
                        {/* Headers de la columna izquierda */}
                        <th style={styles.th}>FECHA (Domingos de cada mes)</th>
                        <th style={{ ...styles.th, fontSize: 10 }}>CATEQUIZANDO</th>
                        <th style={{ ...styles.th, fontSize: 10 }}>REPRESENTANTE</th>
                        <th style={{ ...styles.th, fontSize: 11, width: "120px" }}>FIRMA CATEQUISTA</th>

                        {/* Headers de la columna derecha */}
                        <th style={styles.th} >FECHA (Domingos de cada mes)</th>
                        <th style={{ ...styles.th, fontSize: 10 }}>CATEQUIZANDO</th>
                        <th style={{ ...styles.th, fontSize: 10 }}>REPRESENTANTE</th>
                        <th style={{ ...styles.th, fontSize: 11, width: "120px" }}>FIRMA CATEQUISTA</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Iteramos hasta el número máximo de filas (24) */}
                    {Array.from({ length: 24 }).map((_, index) => {

                        const colIzq = parsedData.slice(0, 24)[index] || {}
                        const colDer = parsedData.slice(24)[index] || {}


                        return (
                            <AsistenciaTableRow
                                key={index}
                                col1Data={colIzq}
                                col2Data={colDer}
                                tdStyle={tdStyle}
                                semanaStyle={semanaStyle}
                                styles={styles}
                            />
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}



export default PlanillaAsistencia;