import React, { useMemo } from 'react';


import imagen from "../../image/logoParroquia.png"; // Asegúrate de que la ruta sea correcta

// --- ARRAYS DUMMY DEL BACKEND ---
const SECCIONES_DATA = [
    { num: 1, catequizado: "María Pérez", representante: "Ana Pérez", catequista: "Laura Gómez" },
    { num: 2, catequizado: "Juan López", representante: "Roberto López", catequista: "Laura Gómez" },
];

const ASISTENCIA_DATA = [
    {
        semana: "Semana 1", fecha: "2/2/2025",
        asistencia: "SÍ", representanteFirma: "SÍ"
    },
    {
        semana: "Semana 2", fecha: "9/2/2025",
        asistencia: "NO", representanteFirma: "SÍ"
    },
    // ... más datos de asistencia
];

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
    minWidth:30,
};

const semanaStyle = {
    wordBreak: 'break-word',
    fontSize:10
}

const flexContainerStyle = {
    display: 'flex', 
    flexDirection: 'column', 
    height: '100%', 
    width: '100%',
    alignItems: 'center' 
};

// ----------------------------------------------------------------------
// ESTILOS VANILLA (Engorrosos por estar en línea)
// ----------------------------------------------------------------------
const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        margin: '0 auto',
        maxWidth: '850px',
        padding: '20px',
        border: '1px solid #ccc',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)'
    },
    header: {
        textAlign: 'center',
        marginBottom: '20px'
    },
    logo: {
        width: 'auto',
        height: '100px',
        marginBottom: '10px'
    },
    h1: {
        fontSize: '18pt',
        fontWeight: 'bold',
        color: '#333',
        margin: '5px 0'
    },
    h2: {
        fontSize: '14pt',
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
    infoHeader:{
        fontWeight: 'bold'
    }
};


// ----------------------------------------------------------------------
// COMPONENTE PRINCIPAL
// ----------------------------------------------------------------------

function PlanillaAsistencia({contentRef}) {
    
    // Usamos useMemo para generar la lista completa de semanas
    const allWeeks = useMemo(() => {
        // Combinamos las semanas de las dos columnas de la tabla del documento
        const weekData = [
            // Columna 1 (Semanas 1 a 24)
            { week: 'Semana 1', date: '2/2/2025' }, { week: 'Semana 2', date: '9/2/2025' }, 
            { week: 'Semana 3', date: '16/2/2025' }, { week: 'Semana 4', date: '23/2/2025' },
            { week: 'Semana 5', date: '2/3/2025' }, { week: 'Semana 6', date: '9/3/2025' },
            { week: 'Semana 7', date: '16/3/2025' }, { week: 'Semana 8', date: '23/3/2025' },
            { week: 'Semana 9', date: '30/3/2025' }, { week: 'Semana 10', date: '6/4/2025' },
            { week: 'Semana 11', date: '13/4/2025' }, { week: 'Semana 12', date: '20/4/2025' },
            { week: 'Semana 13', date: '27/4/2025' }, { week: 'Semana 14', date: '4/5/2025' },
            { week: 'Semana 15', date: '11/5/2025' }, { week: 'Semana 16', date: '18/5/2025' },
            { week: 'Semana 17', date: '25/5/2025' }, { week: 'Semana 18', date: '1/6/2025' },
            { week: 'Semana 19', date: '8/6/2025' }, { week: 'Semana 20', date: '15/6/2025' },
            { week: 'Semana 21', date: '22/6/2025' }, { week: 'Semana 22', date: '29/6/2025' },
            { week: 'Semana 23', date: '06/7/2025' }, { week: 'Semana 24', date: '13/7/2025' },
            // Columna 2 (Semanas 25 a 40)
            { week: 'Semana 25', date: '20/7/2025' }, { week: 'Semana 26', date: '27/7/2025' },
            { week: 'Semana 27', date: '03/8/2025' }, { week: 'Semana 28', date: '7/9/2025' },
            { week: 'Semana 29', date: '14/9/2025' }, { week: 'Semana 30', date: '21/9/2025' },
            { week: 'Semana 31', date: '28/9/2025' }, { week: 'Semana 32', date: '5/10/2025' },
            { week: 'Semana 33', date: '12/10/2025' }, { week: 'Semana 34', date: '19/10/2025' },
            { week: 'Semana 35', date: '26/10/2025' }, { week: 'Semana 36', date: '2/11/2025' },
            { week: 'Semana 37', date: '9/11/2025' }, { week: 'Semana 38', date: '16/11/2025' },
            { week: 'Semana 39', date: '23/11/2025' }, { week: 'Semana 40', date: '30/11/2025' },
            
        ];
        return weekData;
    }, []);

    // Dividimos las semanas en dos columnas para replicar el layout
    const col1Weeks = allWeeks.slice(0, 24);
    const col2Weeks = allWeeks.slice(24);


    // Se usará el primer elemento dummy para los datos de ejemplo de la cabecera
    const dataEjemplo = SECCIONES_DATA[0];

    return (
        <div style={styles.container} id='print'  ref={contentRef}>
            
            {/* CABECERA */}
            <header style={styles.header}>
                {/* Asumiendo que el logo se cargaría de forma dinámica en un entorno real */}
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
                        <th style={{...styles.th,fontSize:10}}>CATEQUIZANDO</th>
                        <th style={{...styles.th,fontSize:10}}>REPRESENTANTE</th>
                        <th style={{...styles.th,fontSize:11,width:"120px"}}>FIRMA CATEQUISTA</th>
                        
                        {/* Headers de la columna derecha */}
                        <th style={styles.th} >FECHA (Domingos de cada mes)</th>
                        <th style={{...styles.th,fontSize:10}}>CATEQUIZANDO</th>
                        <th style={{...styles.th,fontSize:10}}>REPRESENTANTE</th>
                        <th style={{...styles.th,fontSize:11,width:"120px"}}>FIRMA CATEQUISTA</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Iteramos hasta el número máximo de filas (24) */}
                    {Array.from({ length: 24 }).map((_, index) => {
                        const col1 = col1Weeks[index] || {};
                        const col2 = col2Weeks[index] || {};

                        // En una aplicación real, buscarías los datos de ASISTENCIA_DATA aquí
                        const dummyAttendance = ASISTENCIA_DATA[index] || {};
                        
                        return (
                            <tr key={index}>
                                {/* Columna Izquierda */}
                                <td style={tdStyle}>
                                    <div style={flexContainerStyle}>
                                        <div style={semanaStyle}>{col1.week}</div>
                                        <span>{col1.date}</span>
                                    </div>
                                </td>
                                <td style={styles.td}>SÍ___ NO_</td> 
                                <td style={styles.td}>SÍ___ NO_</td>
                                <td style={styles.td}></td> 

                                {/* Columna Derecha */}
                                <td style={tdStyle}>
                                    <div style={flexContainerStyle}>
                                        <div style={semanaStyle}>{col2.week}</div>
                                        <span>{col2.date}</span>
                                    </div>
                                </td>
                                <td style={styles.td}>{col2.week ? 'SÍ___ NO_' : ''}</td> 
                                <td style={styles.td}>{col2.week ? 'SÍ___ NO_' : ''}</td>
                                <td style={styles.td}></td> {/* Espacio para la firma */}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default PlanillaAsistencia;