import React, { useMemo } from 'react';
import logo from "../../image/logoparroquia.png"; 

// --- CONSTANTES ---
const MAX_COLS_PER_PAGE = 10; 
const MAX_ROWS_PER_PAGE = 25; 

// --- ESTILOS COMPACTOS ---
const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        margin: '0 auto',
        maxWidth: '1200px', 
        padding: '5px', 
        boxSizing: 'border-box'
    },
    header: { textAlign: 'center', marginBottom: '5px' }, 
    logo: { width: 'auto', height: '80px', marginBottom: '2px' }, 
    title: { fontSize: '11pt', fontWeight: 'bold', margin: '3px 0' }, 
    subtitle: { fontSize: '10pt', margin: '2px 0', fontWeight: 'normal' }, 
    tableContainer: { width: '100%', overflow: 'hidden' },
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
        minWidth: '45px', 
        maxWidth: '45px', 
        height: '40px',
        lineHeight: '1.0'
    },
    thStudent: { minWidth: '180px', textAlign: 'left', paddingLeft: '6px' },
    td: {
        border: '1px solid #000',
        paddingTop: '0px', 
        paddingBottom: '0px', 
        paddingRight: '1px', 
        paddingLeft: '1px', 
        fontSize: '7pt', 
        textAlign: 'center',
        height: '15px', 
        minWidth: '45px',
        maxWidth: '45px'
    },
    tdStudent: { textAlign: 'left', paddingLeft: '6px', fontSize: '8pt', whiteSpace: 'nowrap' },
    footerInfo: { fontSize: '10pt', marginTop: '20px', lineHeight: '1.6' }
};

// ----------------------------------------------------------------------
// COMPONENTE PRINCIPAL
// ----------------------------------------------------------------------

function PlanillaControlAsistencia({ inscritos = [], filtros = {}, calendario = [] , contentRef }) {

    const attendanceDates = useMemo(() => {
        if (calendario.length === 0) {
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

    const seccionNivel = `SECCIÓN N°: ${filtros.seccion || '____'}`;

    // 1. Lógica de CHUNKING (DIVISIÓN) DE COLUMNAS (en grupos de 10)
    const dateChunks = [];
    for (let i = 0; i < attendanceDates.length; i += MAX_COLS_PER_PAGE) {
        dateChunks.push(attendanceDates.slice(i, i + MAX_COLS_PER_PAGE));
    }
    if (dateChunks.length === 0) {
        dateChunks.push(Array.from({ length: MAX_COLS_PER_PAGE }).map((_, i) => ({
            id: i,
            date: `Semana ${i + 1}`,
            title: `Evento ${i + 1}`
        })));
    }

    // 2. Lógica de CHUNKING (DIVISIÓN) DE FILAS (en grupos de 25)
    const studentsToChunk = inscritos.length > 0 ? inscritos : Array.from({ length: MAX_ROWS_PER_PAGE }).fill({});
    const studentChunks = [];
    for (let i = 0; i < studentsToChunk.length; i += MAX_ROWS_PER_PAGE) {
        let chunk = studentsToChunk.slice(i, i + MAX_ROWS_PER_PAGE);
        if (inscritos.length > 0 && chunk.length < MAX_ROWS_PER_PAGE) {
            while (chunk.length < MAX_ROWS_PER_PAGE) {
                chunk.push({});
            }
        }
        studentChunks.push(chunk);
    }
    if (studentChunks.length === 0) {
        studentChunks.push(Array.from({ length: MAX_ROWS_PER_PAGE }).fill({}));
    }
    
    // Contadores
    const totalChunks = studentChunks.length * dateChunks.length;
    let currentChunkIndex = 0;

    // Estilos de impresión (CSS puro)
    const printStyles = `
        @media print {
            .asistencia-table thead { display: table-header-group; }
            .asistencia-table tr { page-break-inside: avoid !important; }
        }
    `;

    return (
        <div style={styles.container} ref={contentRef}> 
            <style>{printStyles}</style>
            
            {/* CABECERA PRINCIPAL */}
            <header style={styles.header}>
                <img src={logo} alt="Logo Parroquia Divino Maestro" style={styles.logo}/>
                <div style={styles.title}>PARROQUIA DIVINO MAESTRO</div>
                <div style={styles.subtitle}>SEDE UNET</div>
                <div style={styles.subtitle}>SACRAMENTO DE LA PRIMERA CONFESIÓN / PRIMERA COMUNIÓN</div>
                <div style={styles.title}>PLANILLA DE CONTROL DE ASISTENCIA</div>
            </header>

            {/* BUCLE ANIDADO: Filas x Columnas */}
            {studentChunks.map((studentChunk, studentChunkIndex) => (
                dateChunks.map((dateChunk, dateChunkIndex) => {
                    currentChunkIndex++;
                    const isFirstChunk = studentChunkIndex === 0 && dateChunkIndex === 0;

                    return (
                        <div 
                            key={`${studentChunkIndex}-${dateChunkIndex}`} 
                            style={{ 
                                pageBreakBefore: isFirstChunk ? 'auto' : 'always', 
                                marginBottom: '20px' 
                            }}
                        >
                            
                            <div style={{ 
                                ...styles.subtitle, 
                                fontSize: '9pt', 
                                textAlign: 'left', 
                                fontWeight: 'bold' 
                            }}>
                                Nivel: {filtros.nivel || 'I / II'} | {seccionNivel} - (Parte {currentChunkIndex} de {totalChunks})
                            </div>
                            
                            <div style={styles.tableContainer}>
                                <table style={styles.table} className="asistencia-table"> 
                                    <thead>
                                        <tr>
                                            {/* Columnas Fijas (N° y Nombre) */}
                                            <th style={{...styles.th, ...styles.thStudent, minWidth: '30px'}}>N°</th>
                                            <th style={{...styles.th, ...styles.thStudent}}>NOMBRES Y APELLIDOS</th>
                                            
                                            {/* Columnas Dinámicas (Fechas) */}
                                            {dateChunk.map((dateItem, index) => (
                                                <th key={index} style={styles.th} title={dateItem.title || dateItem.date}>
                                                    {dateItem.date}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Filas Dinámicas (Estudiantes) */}
                                        {studentChunk.map((estudiante, index) => {
                                             const globalIndex = studentChunkIndex * MAX_ROWS_PER_PAGE + index + 1;

                                             return (
                                                <tr key={index}> 
                                                    {/* Columnas Fijas (N° y Nombre) */}
                                                    <td style={{...styles.td, minWidth: '30px'}}>{globalIndex}</td>
                                                    <td style={{...styles.td, ...styles.tdStudent}}>
                                                        {estudiante.Nombre_Estudiante ? `${estudiante.Nombre_Estudiante} ${estudiante.Apellido_Estudiante}` : ''}
                                                    </td>
                                                    
                                                    {/* Celdas de Asistencia */}
                                                    {dateChunk.map((_, colIndex) => (
                                                        <td key={colIndex} style={styles.td}></td>
                                                    ))}
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    );
                })
            ))}
            
            {/* INFORMACIÓN DEL CATEQUISTA (Footer) */}
            {totalChunks > 0 && (
                <div style={styles.footerInfo}>
                    <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Catequista responsable</div>
                    <div>Nombres y apellidos: ___________________________________________________ C.I. N° _______________________ N° de teléfono: _________________________</div>
                </div>
            )}
        </div>
    );
}

export default PlanillaControlAsistencia;