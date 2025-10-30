import React, { useState, useEffect, useRef } from 'react';
import { usePoblacion } from "../../context/PoblacionContext";
import PlanillaAsistencia from '../../components/pdf/Planilla_Asistencia';
import PlanillaControlAsistencia from '../pdf/PlanillaControlAsistencia';
import ProgramacionConfirmacion from '../pdf/PlanillaControlConfirmacion';
import { useReactToPrint } from 'react-to-print';

// Función auxiliar para formatear fechas
const formatFecha = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('es-VE'); 
};

function Get_inscrito_pfd() {

  const [inscripcionData, setInscripcionData] = useState({
    lapsoId: '',
    seccion: '',
    nivel: ''
  });
  const [loading, setLoading] = useState(false);
  const { Lapso, getInscritosPorFiltro, poblacionPorLapso, obtenerCalendarioLapso, getLapso } = usePoblacion(); 
  const [inscritos, setInscritos] = useState([]); 
  const [visibleSection, setVisibleSection] = useState(null); // 👈 Controla qué planilla se muestra

  useEffect(() => {
    setInscritos(poblacionPorLapso || []);
  }, [poblacionPorLapso]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInscripcionData(prevData => ({
      ...prevData,
      [name]: value.trim()
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { lapsoId, seccion, nivel } = inscripcionData;

    if (!lapsoId || !seccion || !nivel) {
      alert('Por favor, complete todos los campos de filtro.');
      return;
    }

    setLoading(true);
    try {
      await getInscritosPorFiltro(lapsoId, seccion, nivel);
      await obtenerCalendarioLapso(lapsoId);
    } catch (error) {
      console.error("Error al buscar inscritos:", error);
      alert("Hubo un error al buscar los inscritos. Verifique la conexión.");
    } finally {
      setLoading(false);
    }
  };

  const contentRef = useRef(null);
  const contentRef1 = useRef(null);
  const contentRef2 = useRef(null);

  const reactToPrintFn = useReactToPrint({ contentRef });
  const reactToPrintFn1 = useReactToPrint({ contentRef: contentRef1 });
  const reactToPrintFn2 = useReactToPrint({ contentRef: contentRef2 });

  return (
    <div className="poblacion-pdf-container">

      {/* Tus estilos originales para impresión */}
      <style>
      {`
        @media print {
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          html, body, #root, .poblacion-pdf-container, #print {
            height: auto !important;
            overflow: visible !important;
          }

          @page {
            size: A4 portrait;
            margin: 1cm;
          }

          .planilla-asistencia {
            page: planillaAsistencia;
          }

          @page planillaAsistencia {
            size: A4 landscape;
            margin: 1cm;
          }
        }
      `}
      </style>

      {/* --- FORMULARIO DE FILTRO --- */}
      <form className="inscripcion-form" onSubmit={handleSubmit}>
        <h2>Generar PDF de Inscritos (Filtro)</h2>

        <select 
          name="lapsoId" 
          value={inscripcionData.lapsoId}
          onChange={handleChange}
          required
          disabled={loading}
        >
          <option value="" disabled>Seleccione un lapso</option>
          {Lapso.map((lapso, index) => (
            <option key={lapso.ID || index} value={lapso.ID}> 
              {lapso.tipo_inscripcion} ({formatFecha(lapso.inicio)} - {formatFecha(lapso.fin)})
            </option>
          ))}
        </select>

        <input 
          type="text" 
          placeholder="Sección (Ej: A, B, Única)"
          name="seccion"
          value={inscripcionData.seccion} 
          onChange={handleChange}
          required
          disabled={loading}
        />

        <select 
          name="nivel" 
          value={inscripcionData.nivel}
          onChange={handleChange}
          required
          disabled={loading}
        >
          <option value="" disabled>Seleccione un nivel</option>
          <option value="1">Nivel 1</option>
          <option value="2">Nivel 2</option>
          <option value="3">Nivel 3</option>
        </select>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Buscando...' : 'Buscar Inscritos y Generar PDF'}
        </button>
      </form>
      
      <hr />

      <style>
{`
  .tabla-container {
    margin-top: 20px;
    overflow-x: auto;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }

  .tabla-inscritos {
    width: 100%;
    border-collapse: collapse;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }

  .tabla-inscritos thead {
    background-color: #1e3a8a; /* Azul UNET */
    color: white;
    text-align: left;
  }

  .tabla-inscritos th, 
  .tabla-inscritos td {
    padding: 10px 15px;
    border-bottom: 1px solid #ddd;
  }

  /* ✅ Solo aplica hover a las filas del cuerpo, no del encabezado */
  .tabla-inscritos tbody tr:hover {
    background-color: #e0e7ff;
    transition: background-color 0.2s ease-in-out;
  }

  .tabla-inscritos tbody tr:nth-child(even) {
    background-color: #f9fafb;
  }

  .tabla-inscritos th {
    font-weight: 600;
    font-size: 14px;
    cursor: default; /* evita el cambio de cursor en el encabezado */
  }

  .tabla-inscritos td {
    font-size: 14px;
    color: #333;
  }

  @media (max-width: 600px) {
    .tabla-inscritos th, 
    .tabla-inscritos td {
      padding: 8px;
      font-size: 12px;
    }
  }
`}
</style>
      
      <h3>Resultados de la Búsqueda ({inscritos.length} estudiantes)</h3>

        {inscritos.length > 0 && (
        <div className="tabla-container">
            <table className="tabla-inscritos">
            <thead>
                <tr>
                <th>Cédula</th>
                <th>Nombre y Apellido</th>
                <th>Nivel</th>
                <th>Sección</th>
                <th>Tipo de Población</th>
                </tr>
            </thead>
            <tbody>
                {inscritos.map((estudiante, index) => (
                <tr key={estudiante.Cedula || index}> 
                    <td>{estudiante.Cedula}</td>
                    <td>{estudiante.Nombre_Estudiante} {estudiante.Apellido_Estudiante}</td>
                    <td>{estudiante.Nivel_Inscrito}</td>
                    <td>{estudiante.Seccion_Inscrita}</td>
                    <td>{estudiante.tipoPoblacion}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        )}

      {loading && <p>Cargando datos...</p>}
      <style>
        {`
        .botones-planillas {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            margin-top: 20px;
        }

        .botones-planillas button {
            background-color: #1e3a8a; /* Azul UNET */
            color: white;
            border: none;
            border-radius: 8px;
            padding: 10px 18px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 2px 4px rgba(0,0,0,0.15);
        }

        .botones-planillas button:hover {
            background-color: #2b4fc3; /* Azul más claro al pasar el cursor */
            transform: translateY(-1px);
        }

        .botones-planillas button:active {
            background-color: #162f75; /* Azul más oscuro al hacer clic */
            transform: translateY(0);
        }

        .btn-imprimir {
        background-color: #047857 !important; /* Verde profesional */
        color: white !important;
        border: none !important;
        border-radius: 8px;
        padding: 10px 18px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
        margin-top: 10px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.15);
        }

        .btn-imprimir:hover {
        background-color: #059669 !important; /* Verde más claro */
        transform: translateY(-1px);
        }

        .btn-imprimir:active {
        background-color: #065f46 !important; /* Verde más oscuro */
        transform: translateY(0);
        }
        @media (max-width: 600px) {
            .botones-planillas {
            flex-direction: column;
            }
            .botones-planillas button {
            width: 100%;
            text-align: center;
            }
        }
        `}
        </style>

      {/* --- NUEVOS BOTONES DE SELECCIÓN DE PLANILLA --- */}
      {getLapso.length !== 0 && (
  <div>
    <h4>Seleccione qué planilla visualizar:</h4>
    <div className="botones-planillas">
      <button onClick={() => setVisibleSection('asistencia')}>Planilla de Asistencia</button>
      <button onClick={() => setVisibleSection('control')}>Control de Asistencia</button>
      <button onClick={() => setVisibleSection('programacion')}>Programación Confirmación</button>
    </div>
  </div>
)}

{/* --- COMPONENTES MOSTRADOS SEGÚN BOTÓN --- */}
{getLapso.length !== 0 && visibleSection === 'asistencia' && (
  <div>
    <button className="btn-imprimir" onClick={reactToPrintFn}>
      IMPRIMIR PLANILLA DE ASISTENCIA
    </button>
    <PlanillaAsistencia 
      data={getLapso} 
      contentRef={contentRef}
      className="planilla-asistencia"
      filtros={inscripcionData} // 👈 Aquí enviamos nivel y sección
      lapsoSeleccionado={
        Lapso.find(l => l.ID === parseInt(inscripcionData.lapsoId)) || {}
      }
    />
  </div>
)}

{getLapso.length !== 0 && visibleSection === 'control' && (
  <div>
    <button className="btn-imprimir" onClick={reactToPrintFn1}>
      IMPRIMIR CONTROL DE ASISTENCIA
    </button>
    <PlanillaControlAsistencia
      contentRef={contentRef1} 
      inscritos={inscritos} 
      filtros={inscripcionData} 
      calendario={getLapso}
      filtro={inscripcionData} // 👈 Aquí enviamos nivel y sección
      lapsoSeleccionado={
        Lapso.find(l => l.ID === parseInt(inscripcionData.lapsoId)) || {}
      } 
    />
  </div>
)}

{getLapso.length !== 0 && visibleSection === 'programacion' && (
  <div>
    <button className="btn-imprimir" onClick={reactToPrintFn2}>
      IMPRIMIR PROGRAMACIÓN
    </button>
    <ProgramacionConfirmacion 
      calendario={getLapso} 
      filtros={inscripcionData}     
      ref={contentRef2}
      lapsoSeleccionado={
        Lapso.find(l => l.ID === parseInt(inscripcionData.lapsoId)) || {}
      }
    />
  </div>
)}

    </div>
  );
}

export default Get_inscrito_pfd;
