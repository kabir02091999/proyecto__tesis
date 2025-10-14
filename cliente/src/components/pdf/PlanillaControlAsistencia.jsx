import React, { useMemo } from 'react';
import logo from "../../image/logoparroquia.png"; 

// 🚨 TAMAÑO MÁXIMO DE COLUMNAS DE FECHA POR PÁGINA: 10
const MAX_COLS_PER_PAGE = 10; 

// --- Estilos para Impresión ---
const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        margin: '0 auto',
        maxWidth: '1200px', 
        padding: '20px',
        boxSizing: 'border-box'
    },
    header: { textAlign: 'center', marginBottom: '15px' },
    logo: { width: 'auto', height: '80px', marginBottom: '5px' },
    title: { fontSize: '14pt', fontWeight: 'bold', margin: '3px 0' },
    subtitle: { fontSize: '12pt', margin: '2px 0', fontWeight: 'normal' },
    tableContainer: {
        width: '100%',
        overflow: 'hidden'
    },
    table: {
        borderCollapse: 'collapse',
        marginTop: '10px',
        minWidth: '100%' 
    },
    th: {
        border: '1px solid #000',
        padding: '2px 1px',
        backgroundColor: '#f2f2f2',
        fontSize: '7pt', 
        fontWeight: 'bold',
        textAlign: 'center',
        verticalAlign: 'middle',
        // Ajustamos el ancho para 10 columnas más las 2 fijas
        minWidth: '45px', 
        maxWidth: '45px', 
        height: '40px',
        lineHeight: '1.0'
    },
    thStudent: {
        minWidth: '180px',
        textAlign: 'left',
        paddingLeft: '6px'
    },
    td: {
        border: '1px solid #000',
        padding: '1px',
        fontSize: '8pt', 
        textAlign: 'center',
        height: '18px',
        minWidth: '45px',
        maxWidth: '45px'
    },
    tdStudent: {
        textAlign: 'left',
        paddingLeft: '6px',
        fontSize: '9pt',
        whiteSpace: 'nowrap'
    },
    footerInfo: { fontSize: '10pt', marginTop: '20px', lineHeight: '1.6' }
};

// ----------------------------------------------------------------------
// COMPONENTE PRINCIPAL
// ----------------------------------------------------------------------

function PlanillaControlAsistencia({ inscritos = [], filtros = {}, calendario = [] , contentRef }) {

    const attendanceDates = useMemo(() => {
        if (calendario.length === 0) {
            // Genera 40 fechas dummy si no hay datos
            return Array.from({ length: 40 }).map((_, i) => ({
                id: i,
                date: `Semana ${i + 1}`,
                title: `Evento ${i + 1}`
            }));
        }

        return calendario.map(item => ({
            id: item.id || item.fecha,
            date: new Date(item.fecha).toLocaleDateString('es-VE'), 
            title: item.evento 
        }));
    }, [calendario]);

    const displayInscritos = inscritos.length > 0 ? inscritos : Array.from({ length: 25 }).fill({});
    const seccionNivel = `SECCIÓN N°: ${filtros.seccion || '____'}`


    // 🚨 1. Lógica de CHUNKING (DIVISIÓN) DE COLUMNAS (en grupos de 10)
    const dateChunks = [];
    for (let i = 0; i < attendanceDates.length; i += MAX_COLS_PER_PAGE) {
        dateChunks.push(attendanceDates.slice(i, i + MAX_COLS_PER_PAGE));
    }
    
    // 🚨 2. Estilos de impresión para encabezados repetidos (vertical)
    const printStyles = `
        @media print {
            .asistencia-table thead {
                display: table-header-group;
            }
            .asistencia-table tr {
                page-break-inside: avoid !important;
            }
            /* Recordar al usuario imprimir en modo Paisaje (Landscape) */
        }
    `;

    return (
        <div style={styles.container} ref={contentRef}> 
            <style>{printStyles}</style>
            
            {/* CABECERA (Solo se renderiza al inicio del primer chunk) */}
            <header style={styles.header}>
                <img src={logo} alt="Logo Parroquia Divino Maestro" style={styles.logo}/>
                <div style={styles.title}>PARROQUIA DIVINO MAESTRO</div>
                <div style={styles.subtitle}>SEDE UNET</div>
                <div style={styles.subtitle}>SACRAMENTO DE LA PRIMERA CONFESIÓN / PRIMERA COMUNIÓN</div>
                <div style={styles.title}>PLANILLA DE CONTROL DE ASISTENCIA</div>
            </header>

            {/* 🚨 3. Bucle para renderizar una tabla por cada CHUNK de fechas */}
            {dateChunks.map((chunk, chunkIndex) => (
                <div key={chunkIndex} style={{ 
                    // Fuerza un salto de página ANTES de la siguiente tabla si no es la primera
                    pageBreakBefore: chunkIndex > 0 ? 'always' : 'auto', 
                    marginBottom: '20px' 
                }}>
                    
                    <div style={{ ...styles.subtitle, textAlign: 'left', fontWeight: 'bold' }}>
                        Nivel: {filtros.nivel || 'I / II'} | {seccionNivel} - (Parte {chunkIndex + 1} de {dateChunks.length})
                    </div>
                    
                    <div style={styles.tableContainer}>
                        <table style={styles.table} className="asistencia-table"> 
                            <thead>
                                <tr>
                                    {/* 🚨 Columnas Fijas (N° y Nombre) que se repiten */}
                                    <th style={{...styles.th, ...styles.thStudent, minWidth: '30px'}}>N°</th>
                                    <th style={{...styles.th, ...styles.thStudent}}>NOMBRES Y APELLIDOS</th>
                                    
                                    {/* Columnas Dinámicas (el Chunk actual) */}
                                    {chunk.map((dateItem, index) => (
                                        <th key={index} style={styles.th} title={dateItem.title || dateItem.date}>
                                            {dateItem.date}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {/* Filas Dinámicas para los Estudiantes */}
                                {displayInscritos.map((estudiante, index) => (
                                    <tr key={index}> 
                                        {/* 🚨 Columnas Fijas (N° y Nombre) que se repiten */}
                                        <td style={{...styles.td, minWidth: '30px'}}>{index + 1}</td>
                                        <td style={{...styles.td, ...styles.tdStudent}}>
                                            {estudiante.Nombre_Estudiante ? `${estudiante.Nombre_Estudiante} ${estudiante.Apellido_Estudiante}` : ''}
                                        </td>
                                        
                                        {/* Celdas de Asistencia para el Chunk actual */}
                                        {chunk.map((_, colIndex) => (
                                            <td key={colIndex} style={styles.td}></td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}
            
            {/* INFORMACIÓN DEL CATEQUISTA (Footer) - Solo al final */}
            {dateChunks.length > 0 && (
                <div style={styles.footerInfo}>
                    <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Catequista responsable</div>
                    <div>Nombres y apellidos: ___________________________________________________ C.I. N° _______________________ N° de teléfono: _________________________</div>
                </div>
            )}
        </div>
    );
}

export default PlanillaControlAsistencia;