import React from 'react';
import imagen from "../../image/logoparroquia.png";

const tdStyle = {
    border: '1px solid #000',
    padding: '4px',
    fontSize: '10pt',
    textAlign: 'center',
};

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        margin: '0 auto',
        padding: '10px',
        maxWidth: '800px',
        border: '1px solid #ccc',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    },
    header: { textAlign: 'center', marginBottom: '20px' },
    logo: { width: 'auto', height: '70px', marginBottom: '5px' },
    h1: { fontSize: '14pt', fontWeight: 'bold', color: '#333', margin: '5px 0' },
    h2: { fontSize: '11pt', fontWeight: 'normal', color: '#555', margin: '5px 0' },
    table: { width: '100%', borderCollapse: 'collapse', marginTop: '10px' },
    th: {
        border: '1px solid #000',
        padding: '6px 4px',
        backgroundColor: '#f2f2f2',
        fontSize: '10pt',
        fontWeight: 'bold',
        textAlign: 'center',
    },
};

function Planilla_InscritosPDF({ PlanillaInscritos, nivel, contentRef }) {
    const tituloSacramento =
        parseInt(nivel) === 3
            ? "SACRAMENTO DE LA CONFIRMACIÓN"
            : "SACRAMENTO DE LA PRIMERA CONFESIÓN / PRIMERA COMUNIÓN";

    return (
        <div style={styles.container} ref={contentRef}>
            {/* CABECERA */}
            <header style={styles.header}>
                <img src={imagen} alt="Logo Parroquia Divino Maestro" style={styles.logo} />
                <div style={styles.h1}>PARROQUIA DIVINO MAESTRO</div>
                <div style={styles.h2}>{tituloSacramento}</div>
                <div style={styles.h2}>PLANILLA DE INSCRITOS - NIVEL {nivel}</div>
            </header>

            {/* TABLA DE INSCRITOS */}
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>#</th>
                        <th style={styles.th}>Nombre</th>
                        <th style={styles.th}>Apellido</th>
                        <th style={styles.th}>Cédula</th>
                        <th style={styles.th}>Nombre Representante</th>
                        <th style={styles.th}>Teléfono Representante</th>
                    </tr>
                </thead>
                <tbody>
                    {PlanillaInscritos && PlanillaInscritos.length > 0 ? (
                        PlanillaInscritos.map((p, index) => (
                            <tr key={index}>
                                <td style={tdStyle}>{index + 1}</td>
                                <td style={tdStyle}>{p.nombre}</td>
                                <td style={tdStyle}>{p.apellidos}</td>
                                <td style={tdStyle}>{p.ci}</td>
                                <td style={tdStyle}>{p.nombre_representante || 'No especificado'}</td>
                                <td style={tdStyle}>{p.telefono_representante || 'No especificado'}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" style={tdStyle}>
                                No hay inscritos disponibles.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Planilla_InscritosPDF;