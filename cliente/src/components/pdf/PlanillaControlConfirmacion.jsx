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
  { semana_fecha: 'Semana 1', fecha: '2/2/2025', liturgico: 'Inicio de actividades, La presentación del Señor', tema: '', contenido: '', recursos: '', evaluacion: 'Prueba diagnóstica', compromiso: '', observaciones: '' },
  { semana_fecha: 'Semana 2', fecha: '9/2/2025', liturgico: 'V Domingo del Tiempo Ordinario', tema: '', contenido: '', recursos: '', evaluacion: '', compromiso: '', observaciones: '' },
  { semana_fecha: 'Semana 3', fecha: '16/2/2025', liturgico: 'VI Domingo del Tiempo Ordinario', tema: '', contenido: '', recursos: '', evaluacion: '', compromiso: '', observaciones: '' },
  { semana_fecha: 'Semana 4', fecha: '23/2/2025', liturgico: 'VII Domingo del Tiempo Ordinario', tema: '', contenido: '', recursos: '', evaluacion: '', compromiso: '', observaciones: '' },
  { semana_fecha: 'Semana 5', fecha: '2/3/2025', liturgico: 'VIII Domingo del Tiempo Ordinario', tema: '', contenido: '', recursos: '', evaluacion: '', compromiso: '', observaciones: '' },
  { semana_fecha: 'Semana 6', fecha: '9/3/2025', liturgico: 'I Domingo de Cuaresma', tema: '', contenido: '', recursos: '', evaluacion: '', compromiso: '', observaciones: '' },
  { semana_fecha: 'Semana 7', fecha: '16/3/2025', liturgico: 'II Domingo de Cuaresma', tema: '', contenido: '', recursos: '', evaluacion: '', compromiso: '', observaciones: '' },
  { semana_fecha: 'Semana 8', fecha: '23/3/2025', liturgico: 'III Domingo de Cuaresma', tema: '', contenido: '', recursos: '', evaluacion: '', compromiso: '', observaciones: '' },
  { semana_fecha: 'Semana 9', fecha: '30/3/2025', liturgico: 'IV Domingo de Cuaresma «Laetare»', tema: '', contenido: '', recursos: '', evaluacion: '', compromiso: '', observaciones: '' },
  { semana_fecha: 'Semana 10', fecha: '6/4/2025', liturgico: 'V Domingo de Cuaresma', tema: '', contenido: '', recursos: '', evaluacion: '', compromiso: '', observaciones: '' },
  { semana_fecha: 'Semana 11', fecha: '13/4/2025', liturgico: 'Domingo de Ramos en la Pasión del Señor', tema: '', contenido: '', recursos: '', evaluacion: '', compromiso: '', observaciones: '' },
  { semana_fecha: 'Semana 12', fecha: '20/4/2025', liturgico: 'Domingo de Pascua de la Resurrección del Señor', tema: '', contenido: '', recursos: '', evaluacion: '', compromiso: '', observaciones: '' },
  { semana_fecha: 'Semana 13', fecha: '27/4/2025', liturgico: 'II Domingo de Pascua o de la Divina Misericordia', tema: '', contenido: '', recursos: '', evaluacion: '', compromiso: '', observaciones: '' },
  { semana_fecha: 'Semana 14', fecha: '4/5/2025', liturgico: 'III Domingo de Pascua', tema: '', contenido: '', recursos: '', evaluacion: '', compromiso: '', observaciones: '' },
  { semana_fecha: 'Semana 15', fecha: '11/5/2025', liturgico: 'IV Domingo de Pascua', tema: '', contenido: '', recursos: '', evaluacion: '', compromiso: '', observaciones: '' },
  { semana_fecha: 'Semana 16', fecha: '18/5/2025', liturgico: 'V Domingo de Pascua', tema: '', contenido: '', recursos: '', evaluacion: '', compromiso: '', observaciones: '' },
  { semana_fecha: 'Semana 17', fecha: '25/5/2025', liturgico: 'VI Domingo de Pascua', tema: '', contenido: '', recursos: '', evaluacion: '', compromiso: '', observaciones: '' },
  { semana_fecha: 'Semana 18', fecha: '1/6/2025', liturgico: 'La Ascensión del Señor', tema: '', contenido: '', recursos: '', evaluacion: '', compromiso: '', observaciones: '' },
  { semana_fecha: 'Semana 19', fecha: '8/6/2025', liturgico: 'Domingo de Pentecostés', tema: '', contenido: '', recursos: '', evaluacion: '', compromiso: '', observaciones: '' },
  { semana_fecha: 'Semana 20', fecha: '15/6/2025', liturgico: 'La Santísima Trinidad', tema: '', contenido: '', recursos: '', evaluacion: '', compromiso: '', observaciones: '' },
  { semana_fecha: 'Semana 21', fecha: '22/6/2025', liturgico: 'El Cuerpo y la Sangre Santísimos de Cristo', tema: '', contenido: '', recursos: '', evaluacion: '', compromiso: '', observaciones: '' },
  { semana_fecha: 'Semana 22', fecha: '29/6/2025', liturgico: 'Santos Pedro y Pablo, Apóstoles', tema: '', contenido: '', recursos: '', evaluacion: '', compromiso: '', observaciones: '' },
  { semana_fecha: 'Semana 23', fecha: '06/7/2025', liturgico: 'XIV Domingo del Tiempo Ordinario', tema: '', contenido: '', recursos: '', evaluacion: '', compromiso: '', observaciones: '' },
  { semana_fecha: 'Semana 24', fecha: '13/7/2025', liturgico: 'XV Domingo del Tiempo Ordinario', tema: '', contenido: '', recursos: '', evaluacion: '', compromiso: '', observaciones: '' },
  { semana_fecha: 'Semana 25', fecha: '20/7/2025', liturgico: 'XVI Domingo del Tiempo Ordinario', tema: '', contenido: '', recursos: '', evaluacion: '', compromiso: '', observaciones: '' },
  { semana_fecha: 'Semana 26', fecha: '27/7/2025', liturgico: 'XVII Domingo del Tiempo Ordinario', tema: '', contenido: '', recursos: '', evaluacion: '', compromiso: '', observaciones: '' },
  { semana_fecha: 'Semana 27', fecha: '03/8/2025', liturgico: 'XVIII Domingo del Tiempo Ordinario', tema: '', contenido: '', recursos: '', evaluacion: 'Prueba intermedia', compromiso: '', observaciones: '' },
  { semana_fecha: 'Semana 28', fecha: '7/9/2025', liturgico: 'XXIII Domingo del Tiempo Ordinario', tema: '', contenido: '', recursos: '', evaluacion: '', compromiso: '', observaciones: '' },
  { semana_fecha: 'Semana 29', fecha: '14/9/2025', liturgico: 'XXIV Domingo del Tiempo Ordinario', tema: '', contenido: '', recursos: '', evaluacion: '', compromiso: '', observaciones: '' },
  { semana_fecha: 'Semana 30', fecha: '21/9/2025', liturgico: 'XXV Domingo del Tiempo Ordinario', tema: '', contenido: '', recursos: '', evaluacion: '', compromiso: '', observaciones: '' },
  { semana_fecha: 'Semana 31', fecha: '28/9/2025', liturgico: 'XXVI Domingo del Tiempo Ordinario', tema: '', contenido: '', recursos: '', evaluacion: '', compromiso: '', observaciones: '' },
  { semana_fecha: 'Semana 32', fecha: '5/10/2025', liturgico: 'XXVII Domingo del Tiempo Ordinario', tema: '', contenido: '', recursos: '', evaluacion: '', compromiso: '', observaciones: '' },
  { semana_fecha: 'Semana 33', fecha: '12/10/2025', liturgico: 'XXVIII Domingo del Tiempo Ordinario', tema: '', contenido: '', recursos: '', evaluacion: '', compromiso: '', observaciones: '' },
  { semana_fecha: 'Semana 34', fecha: '19/10/2025', liturgico: 'XXIX Domingo del Tiempo Ordinario', tema: '', contenido: '', recursos: '', evaluacion: '', compromiso: '', observaciones: '' },
  { semana_fecha: 'Semana 35', fecha: '26/10/2025', liturgico: 'XXX Domingo del Tiempo Ordinario', tema: '', contenido: '', recursos: '', evaluacion: '', compromiso: '', observaciones: '' },
  { semana_fecha: 'Semana 36', fecha: '2/11/2025', liturgico: 'Conmemoración de todos los fieles difuntos', tema: '', contenido: '', recursos: '', evaluacion: '', compromiso: '', observaciones: '' },
  { semana_fecha: 'Semana 37', fecha: '9/11/2025', liturgico: 'La dedicación de la Basílica de Letrán', tema: '', contenido: '', recursos: '', evaluacion: '', compromiso: '', observaciones: '' },
  { semana_fecha: 'Semana 38', fecha: '16/11/2025', liturgico: 'XXXIII Domingo del Tiempo Ordinario', tema: '', contenido: '', recursos: '', evaluacion: '', compromiso: '', observaciones: '' },
  { semana_fecha: 'Semana 39', fecha: '23/11/2025', liturgico: 'Nuestro Señor Jesucristo, Rey del Universo', tema: '', contenido: '', recursos: '', evaluacion: '', compromiso: '', observaciones: '' },
  { semana_fecha: 'Semana 40', fecha: '30/11/2025 Cierre de actividades', liturgico: 'I Domingo de Adviento', tema: '', contenido: '', recursos: '', evaluacion: 'Prueba final', compromiso: '', observaciones: '' }
];

const ProgramacionConfirmacion = forwardRef(({ calendario, filtros }, ref) => {
  const lapsoData = calendario && calendario.length > 0
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

  const seccion = filtros?.seccion || '________________';
  
  const headers = [
    { title: 'FECHA (Domingos de cada mes)', width: '15%' },
    { title: 'CALENDARIO LITÚRGICO, 2025', width: '25%' },
    { title: 'TEMA DEL SACRAMENTO DE CONFIRMACIÓN', width: '15%' },
    { title: 'CONTENIDO', width: '15%' },
    { title: 'RECURSOS', width: '8%' },
    { title: 'EVALUACIÓN SEGÚN EL TIEMPO', width: '10%' },
    { title: 'COMPROMISO DEL CATEQUIZANDO', width: '7%' },
    { title: 'OBSERVACIONES', width: '5%' },
  ];

  return (
    <div style={styles.container} ref={ref}> 
      <div style={styles.headerInfo}>
        <img
          src={logo} 
          alt="Parroquia Divino Maestro"
          style={styles.parroquiaLogo}
        />
        <h1 style={styles.title}>PROGRAMACIÓN III NIVEL CONFIRMACIÓN 2025</h1>
        <p style={styles.subtitle}>SACRAMENTO DE LA CONFIRMACIÓN</p>
        <p style={styles.details}>PROGRAMACIÓN 2/2/2025 HASTA EL 30/11/2025 | SEDE UNET</p>
        <p style={styles.section}>SECCIÓN N°: {seccion}</p>
      </div>

      <hr style={styles.divider} />

      <div style={styles.tableResponsive}>
        <table style={styles.programacionTable}>
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index} style={{ ...styles.tableHeader, width: header.width }}>
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
        <p style={styles.footerText}><strong>Catequista responsable:</strong></p>
        <p style={styles.footerText}>Nombres y apellidos: ___________________________________________________ C.I. N° _______________________ N° de teléfono: __________________________________</p>
      </div>
    </div>
  );
});

export default ProgramacionConfirmacion;