import React, { useEffect, useState } from 'react';

import '../css/cssReportes.css';
import { useReportes } from '../context/ReportesContext';

function Reportes() {

  useReportes
  const { reportes, eliminarReporte , reportesLoading} = useReportes();
 
  if (reportesLoading) {
    return <div className="loading-message">Cargando reportes...</div>;
  }

  return (
    <div className="reportes-container">
      <h2>Panel de Administración de Comunicaciones ({reportes ? reportes.length : 0})</h2>

      {(!reportes || reportes.length === 0) ? (
        <div className="no-reportes">
          ✅ No hay comunicaciones ni reportes pendientes en este momento.
        </div>
      ) : (
        <div className="reportes-grid">
          {reportes.map((reporte) => (
            <div key={reporte.ID_Reporte} className="reporte-card">
              <div className="reporte-header">
                <h3>{reporte.Nombre_Completo}</h3>
                <span
                  className={`tipo-etiqueta ${
                    reporte.Tipo_Comunicacion?.toLowerCase() === 'consulta'
                      ? 'tipo-consulta'
                      : reporte.Tipo_Comunicacion?.toLowerCase() === 'sugerencia'
                      ? 'tipo-sugerencia'
                      : 'tipo-otro'
                  }`}
                >
                  {reporte.Tipo_Comunicacion}
                </span>
              </div>

              <p>
                <strong>Email:</strong>{' '}
                <a
                  href={`mailto:${reporte.Correo_Electronico}`}
                  className="email-link"
                >
                  {reporte.Correo_Electronico}
                </a>
              </p>

              <p><strong>Teléfono:</strong> {reporte.Telefono || 'N/A'}</p>

              <p className="mensaje-truncate"><strong>Mensaje:</strong> {reporte.Mensaje}</p>

              <div className="acciones">
                <button
                  onClick={() => eliminarReporte(reporte.ID_Reporte)}
                  className="btn-eliminar"
                >
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Reportes;
