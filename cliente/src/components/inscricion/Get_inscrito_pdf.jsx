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

      <h3>Resultados de la Búsqueda ({inscritos.length} estudiantes)</h3>
      
      {inscritos.length > 0 && (
        <table>
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
      )}

      {loading && <p>Cargando datos...</p>}

      {/* --- NUEVOS BOTONES DE SELECCIÓN DE PLANILLA --- */}
      {getLapso.length !== 0 && (
        <div style={{ marginTop: "20px" }}>
          <h4>Seleccione qué planilla visualizar:</h4>
          <button onClick={() => setVisibleSection('asistencia')}>Planilla de Asistencia</button>
          <button onClick={() => setVisibleSection('control')}>Control de Asistencia</button>
          <button onClick={() => setVisibleSection('programacion')}>Programación Confirmación</button>
        </div>
      )}

      {/* --- COMPONENTES MOSTRADOS SEGÚN BOTÓN --- */}
      {getLapso.length !== 0 && visibleSection === 'asistencia' && (
        <div>
          <button onClick={reactToPrintFn}>IMPRIMIR PLANILLA DE ASISTENCIA</button>
          <PlanillaAsistencia 
            data={getLapso} 
            contentRef={contentRef}
            className="planilla-asistencia"
          />
        </div>
      )}

      {getLapso.length !== 0 && visibleSection === 'control' && (
        <div>
          <button onClick={reactToPrintFn1}>IMPRIMIR CONTROL DE ASISTENCIA</button>
          <PlanillaControlAsistencia
            contentRef={contentRef1} 
            inscritos={inscritos} 
            filtros={inscripcionData} 
            calendario={getLapso} 
          />
        </div>
      )}

      {getLapso.length !== 0 && visibleSection === 'programacion' && (
        <div>
          <button onClick={reactToPrintFn2}>IMPRIMIR PROGRAMACIÓN</button>
          <ProgramacionConfirmacion 
            calendario={getLapso} 
            filtros={inscripcionData}     
            ref={contentRef2}
          />
        </div>
      )}

    </div>
  );
}

export default Get_inscrito_pfd;
