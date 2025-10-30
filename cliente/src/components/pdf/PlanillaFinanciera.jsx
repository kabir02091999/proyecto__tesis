import React, { useMemo } from 'react';
import { useFinancieroContext } from '../../context/finacieroContext';
import imagen from "../../image/logoparroquia.png"; // Logo de la parroquia
import '../../css/financiero/finanzas_mes.css';

const tdStyle = {
    border: '1px solid #000',
    padding: '2px 4px',
    fontSize: '9pt',
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
    table: { width: '100%', borderCollapse: 'collapse', marginTop: '20px' },
    th: {
        border: '1px solid #000',
        padding: '8px 4px',
        backgroundColor: '#f2f2f2',
        fontSize: '10pt',
        fontWeight: 'bold',
        textAlign: 'center',
    },
};

function PlanillaFinanciera({ data, mes, anio, contentRef }) {

    const parsedData = useMemo(() => {
        const dias = {};
        data.forEach(t => {
            const fecha = new Date(t.fecha_registro);
            const dia = fecha.getDate();
            if (!dias[dia]) dias[dia] = { dia, ingresos: 0, egresos: 0 };
            if (t.es_ingreso) dias[dia].ingresos += parseFloat(t.monto);
            else dias[dia].egresos += parseFloat(t.monto);
        });
        return Object.values(dias).sort((a, b) => a.dia - b.dia);
    }, [data]);

    const totalIngresos = parsedData.reduce((sum, d) => sum + d.ingresos, 0);
    const totalEgresos = parsedData.reduce((sum, d) => sum + d.egresos, 0);
    const saldoTotal = totalIngresos - totalEgresos;

    const formatCurrency = (amount) =>
        parseFloat(amount).toLocaleString('es-VE', { style: 'currency', currency: 'VES' });

    return (
        <div className='planilla-financiera-container' style={styles.container} ref={contentRef}>
            {/* CABECERA */}
            <header style={styles.header}>
                <img src={imagen} alt="Logo Parroquia Divino Maestro" style={styles.logo} />
                <div style={styles.h1}>PARROQUIA DIVINO MAESTRO</div>
                <div style={styles.h2}>FLUJO DE CAJA - {mes}/{anio}</div>
            </header>

            {/* TABLA RESUMEN DIARIO */}
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>Día</th>
                        <th style={styles.th}>Ingresos</th>
                        <th style={styles.th}>Egresos</th>
                        <th style={styles.th}>Saldo Diario</th>
                    </tr>
                </thead>
                <tbody>
                    {parsedData.map(d => (
                        <tr key={d.dia}>
                            <td style={tdStyle}>{d.dia}</td>
                            <td style={tdStyle}>{formatCurrency(d.ingresos)}</td>
                            <td style={tdStyle}>{formatCurrency(d.egresos)}</td>
                            <td style={tdStyle}>{formatCurrency(d.ingresos - d.egresos)}</td>
                        </tr>
                    ))}
                    <tr>
                        <td style={{ ...tdStyle, fontWeight: 'bold' }}>TOTAL</td>
                        <td style={{ ...tdStyle, fontWeight: 'bold' }}>{formatCurrency(totalIngresos)}</td>
                        <td style={{ ...tdStyle, fontWeight: 'bold' }}>{formatCurrency(totalEgresos)}</td>
                        <td style={{ ...tdStyle, fontWeight: 'bold' }}>{formatCurrency(saldoTotal)}</td>
                    </tr>
                </tbody>
            </table>

            {/* TABLA DETALLADA DE DESCRIPCIONES */}
            <table style={{ ...styles.table, marginTop: '40px' }}>
                <thead>
                    <tr>
                        <th style={styles.th}>Fecha</th>
                        <th style={styles.th}>Tipo</th>
                        <th style={styles.th}>Monto</th>
                        <th style={styles.th}>Descripción</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(t => (
                        <tr key={t.id}>
                            <td style={tdStyle}>{new Date(t.fecha_registro).toLocaleDateString('es-VE')}</td>
                            <td style={tdStyle}>{t.es_ingreso ? 'INGRESO' : 'EGRESO'}</td>
                            <td style={tdStyle}>{formatCurrency(t.monto)}</td>
                            <td style={tdStyle}>{t.descripcion}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PlanillaFinanciera;