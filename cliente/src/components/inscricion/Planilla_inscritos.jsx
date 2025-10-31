import React, { useState, useEffect, useRef } from 'react';
import { usePoblacion } from '../../context/PoblacionContext';
import { useReactToPrint } from 'react-to-print';

import Planilla_InscritosPDF from '../pdf/planilla_InscritosPDF';

function Planilla_inscritos() {
    const contentRef = useRef(null);
    const reactToPrintFn = useReactToPrint({
        contentRef,
        documentTitle: 'Planilla de Inscritos',
    });

    const [inscripcionPlanilla, setInscripcionPlanilla] = useState({
        lapsoId: '',
        nivel: ''
    });

    const {
        Lapso,
        Planilla_Incritos_Por_Filtro1,
        PlanillaInscritos,
        loading,
        error
    } = usePoblacion();

    const formatFecha = (fecha) => {
        if (!fecha) return '';
        return new Date(fecha).toLocaleDateString('es-VE', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInscripcionPlanilla((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { lapsoId, nivel } = inscripcionPlanilla;
        if (!lapsoId || !nivel) return;
        await Planilla_Incritos_Por_Filtro1(lapsoId, nivel);
    };

    useEffect(() => {
        console.log("Inscritos:", PlanillaInscritos);
    }, [PlanillaInscritos]);

    return (
        <div className="planilla-insctos-page">
            <div className="planilla-insctos-container">
                <h1>Planilla de Inscritos</h1>
                <hr className="title-divider" />

                <form className="inscripcion-form" onSubmit={handleSubmit}>
                    <h2>Filtrar Inscritos por Lapso y Nivel</h2>

                    <select
                        name="lapsoId"
                        value={inscripcionPlanilla.lapsoId}
                        onChange={handleChange}
                        required
                        disabled={loading}
                    >
                        <option value="">Seleccione un lapso</option>
                        {Lapso?.map((lapso, index) => (
                            <option key={lapso.ID || index} value={lapso.ID}>
                                {lapso.tipo_inscripcion} (
                                {formatFecha(lapso.inicio)} - {formatFecha(lapso.fin)})
                            </option>
                        ))}
                    </select>

                    <select
                        name="nivel"
                        value={inscripcionPlanilla.nivel}
                        onChange={handleChange}
                        required
                        disabled={loading}
                    >
                        <option value="">Seleccione un nivel</option>
                        <option value="1">Nivel 1</option>
                        <option value="2">Nivel 2</option>
                        <option value="3">Nivel 3</option>
                    </select>

                    <button type="submit" disabled={loading}>
                        {loading ? 'Buscando...' : 'Buscar Inscritos'}
                    </button>
                </form>

                {error && <p className="error-message">Error: {error}</p>}
                {loading && <p className="loading-message">Cargando inscritos...</p>}

                {/* BOTÓN PARA IMPRIMIR */}
                {PlanillaInscritos && PlanillaInscritos.length > 0 && (
                    <button onClick={reactToPrintFn} className="btn-print">
                        Imprimir Planilla
                    </button>
                )}

                {/* COMPONENTE PDF A IMPRIMIR */}
                <div style={{ display: 'none' }}>
                    <Planilla_InscritosPDF
                        PlanillaInscritos={PlanillaInscritos}
                        nivel={inscripcionPlanilla.nivel}
                        contentRef={contentRef}
                    />
                </div>
            </div>
        </div>
    );
}

export default Planilla_inscritos;

