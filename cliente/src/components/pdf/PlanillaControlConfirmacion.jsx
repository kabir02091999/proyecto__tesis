import React, { forwardRef } from 'react';
import logo from '../../image/logoParroquia.png';

const styles = {
  container: {
    fontFamily: '"Times New Roman", serif',
    maxWidth: '100%',
    margin: '0 auto',
    padding: '10px 20px',
  },
  headerInfo: {
    textAlign: 'center',
    marginBottom: '5px',
  },
  parroquiaLogo: {
    maxWidth: '80px',
    height: 'auto',
    marginBottom: '5px',
  },
  title: {
    fontSize: '1.2em',
    fontWeight: 'bold',
    margin: '0 0 2px 0',
  },
  subtitle: {
    fontSize: '0.9em',
    margin: '1px 0',
  },
  details: {
    fontSize: '0.85em',
    margin: '1px 0',
  },
  section: {
    fontSize: '0.85em',
    margin: '2px 0 10px 0',
    textAlign: 'left',
  },
  divider: {
    border: '0',
    height: '1px',
    background: '#333',
    margin: '15px 0',
  },
  programacionTable: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '0.75em',
  },
  tableHeader: {
    backgroundColor: '#f2f2f2',
    fontWeight: 'bold',
    textAlign: 'center',
    border: '1px solid #000',
    padding: '4px',
    verticalAlign: 'top',
  },
  tableCell: {
    border: '1px solid #000',
    padding: '4px',
    textAlign: 'left',
    verticalAlign: 'top',
  },
  footerInfo: {
    marginTop: '20px',
    fontSize: '0.85em',
    borderTop: '1px solid #333',
    paddingTop: '10px',
  },
  footerText: {
    lineHeight: '1.4',
  }
};

const PROGRAMACION_BASE = [
  // ...tu arreglo PROGRAMACION_BASE igual que antes
];

const ProgramacionConfirmacion = forwardRef(({ calendario, filtros ,lapsoSeleccionado}, ref) => {
  const nivel = filtros?.nivel;
  const seccion = filtros?.seccion || '________________';
  const { inicio, fin, tipo_inscripcion } = lapsoSeleccionado || {};
  // 🟩 Lógica del título y subtítulo según el nivel
  const tituloPrincipal =
    nivel === 3 || nivel === "3"
      ? "PROGRAMACIÓN III NIVEL CONFIRMACIÓN 2025"
      : "PROGRAMACIÓN I / II NIVEL PRIMERA CONFESIÓN Y COMUNIÓN 2025";

  const subtituloSacramento =
    nivel === 3 || nivel === "3"
      ? "SACRAMENTO DE LA CONFIRMACIÓN"
      : "SACRAMENTO DE LA PRIMERA CONFESIÓN / PRIMERA COMUNIÓN";

  const lapsoData =
    calendario && calendario.length > 0
      ? calendario.map((item, index) => ({
          semana_fecha: item.fecha || PROGRAMACION_BASE[index]?.semana_fecha,
          liturgico: item.evento || PROGRAMACION_BASE[index]?.liturgico,
          tema: PROGRAMACION_BASE[index]?.tema || '',
          contenido: PROGRAMACION_BASE[index]?.contenido || '',
          recursos: PROGRAMACION_BASE[index]?.recursos || '',
          evaluacion: PROGRAMACION_BASE[index]?.evaluacion || '',
          compromiso: PROGRAMACION_BASE[index]?.compromiso || '',
          observaciones: PROGRAMACION_BASE[index]?.observaciones || '',
        }))
      : PROGRAMACION_BASE;

  const headers = [
    { title: 'FECHA (Domingos de cada mes)', width: '15%' },
    { title: 'CALENDARIO LITÚRGICO, 2025', width: '25%' },
    {
      title:
        nivel === 3 || nivel === "3"
          ? 'TEMA DEL SACRAMENTO DE CONFIRMACIÓN'
          : 'TEMA DEL SACRAMENTO DE PRIMERA COMUNIÓN',
      width: '15%',
    },
    { title: 'CONTENIDO', width: '15%' },
    { title: 'RECURSOS', width: '8%' },
    { title: 'EVALUACIÓN SEGÚN EL TIEMPO', width: '10%' },
    { title: 'COMPROMISO DEL CATEQUIZANDO', width: '7%' },
    { title: 'OBSERVACIONES', width: '5%' },
  ];

  

  return (
    <div style={styles.container} ref={ref}>
      <div style={styles.headerInfo}>
        <img src={logo} alt="Parroquia Divino Maestro" style={styles.parroquiaLogo} />
        <h1 style={styles.title}>SEDE UNET</h1>
        <h1 style={styles.title}>{tituloPrincipal}</h1>
        <p style={styles.subtitle}>{subtituloSacramento}</p>
        <div><strong>Inicio:</strong> {inicio ? new Date(inicio).toLocaleDateString('es-VE') : 'N/A'}</div>
        <div><strong>Fin:</strong> {fin ? new Date(fin).toLocaleDateString('es-VE') : 'N/A'}</div>
      
        <p style={styles.section}>SECCIÓN N°: {seccion}</p>
      </div>

      <hr style={styles.divider} />

      <div style={styles.tableResponsive}>
        <table style={styles.programacionTable}>
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  style={{ ...styles.tableHeader, width: header.width }}
                >
                  {header.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {lapsoData.map((item, index) => (
              <tr key={index}>
                <td style={styles.tableCell}>{item.semana_fecha || item.fecha}</td>
                <td style={styles.tableCell}>{item.liturgico || item.evento}</td>
                <td style={styles.tableCell}>{item.tema}</td>
                <td style={styles.tableCell}>{item.contenido}</td>
                <td style={styles.tableCell}>{item.recursos}</td>
                <td style={styles.tableCell}>{item.evaluacion}</td>
                <td style={styles.tableCell}>{item.compromiso}</td>
                <td style={styles.tableCell}>{item.observaciones}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <hr style={styles.divider} />

      <div style={styles.footerInfo}>
        <p style={styles.footerText}>
          <strong>Catequista responsable:</strong>
        </p>
        <p style={styles.footerText}>
          Nombres y apellidos: ___________________________________________________ C.I. N° _______________________ N° de teléfono: __________________________________
        </p>
      </div>
    </div>
  );
});

export default ProgramacionConfirmacion;
