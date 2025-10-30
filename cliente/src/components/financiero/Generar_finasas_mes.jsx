import React, { useState, useEffect, useRef } from 'react';
import { useFinancieroContext } from '../../context/finacieroContext';
import '../../css/financiero/finanzas_mes.css';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { useReactToPrint } from 'react-to-print';
//ojo aqui ya la importe 
import PlanillaFinanciera from '../pdf/PlanillaFinanciera';

const NOMBRES_MESES = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

function Generar_finasas_mes() {
    const {
        transaccionesPeriodo,
        loading,
        error,
        cargarTransaccionesPorPeriodo
    } = useFinancieroContext();

    const today = new Date();
    const [mesSeleccionado, setMesSeleccionado] = useState(today.getMonth() + 1);
    const [anioSeleccionado, setAnioSeleccionado] = useState(today.getFullYear());

    const componentRef = useRef(null); // ✅ Referencia para imprimir

    useEffect(() => {
        cargarTransaccionesPorPeriodo(mesSeleccionado, anioSeleccionado);
    }, [mesSeleccionado, anioSeleccionado]);

    const transaccionesPorDia = {};

    transaccionesPeriodo.forEach(t => {
        const fecha = new Date(t.fecha_registro);
        const dia = fecha.getDate();
        const monto = parseFloat(t.monto);

        if (!transaccionesPorDia[dia]) {
            transaccionesPorDia[dia] = {
                dia,
                ingresos: 0,
                egresos: 0
            };
        }

        if (t.es_ingreso === 1 || t.es_ingreso === true) {
            transaccionesPorDia[dia].ingresos += monto;
        } else {
            transaccionesPorDia[dia].egresos += monto;
        }
    });

    const dataGrafica = Object.values(transaccionesPorDia).sort((a, b) => a.dia - b.dia);

    const totalIngresos = dataGrafica.reduce((sum, d) => sum + d.ingresos, 0);
    const totalEgresos = dataGrafica.reduce((sum, d) => sum + d.egresos, 0);
    const saldoTotal = totalIngresos - totalEgresos;

    const formatCurrency = (amount) =>
        parseFloat(amount).toLocaleString('es-VE', { style: 'currency', currency: 'VES' });

    const opcionesAnios = [];
    const anioActual = today.getFullYear();
    for (let i = 2023; i <= anioActual + 1; i++) opcionesAnios.push(i);

    // ✅ Nueva sintaxis compatible con react-to-print v3+
    const handlePrint = useReactToPrint({
        contentRef: componentRef, // ✅ usa contentRef (nuevo API)
        documentTitle: `Reporte_Finanzas_${NOMBRES_MESES[mesSeleccionado - 1]}_${anioSeleccionado}`,
        pageStyle: `
      @page {
        size: A4 portrait;
        margin: 1cm;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          background: white;
          margin: 0;
        }
        .periodo-selector-container {
          display: none !important;
        }
        .tabla-responsive {
          page-break-inside: auto;
        }
        table, tr, td, th {
          page-break-inside: avoid;
        }
      }
    `
    });

    return (
        <div className="finanzas-page-wrapper" >
            <div className="finanzas-content-wrapper">
                <div className="acciones-superiores">
                    <h2 className="finanzas-header">Flujo de Caja por Fecha 📆</h2>

                    {/* 🖨️ Botón de imprimir */}
                    <button onClick={handlePrint} className="btn-imprimir">
                        🖨️ Imprimir Reporte
                    </button>
                </div>

                {/* ✅ Este div es el que se imprime */}
                <div ref={componentRef}>
                    {/* Selectores (ocultos al imprimir) */}
                    <div className="periodo-selector-container">
                        <label htmlFor="mes">Seleccionar Mes:</label>
                        <select
                            id="mes"
                            value={mesSeleccionado}
                            onChange={(e) => setMesSeleccionado(parseInt(e.target.value))}
                        >
                            {NOMBRES_MESES.map((nombre, index) => (
                                <option key={index + 1} value={index + 1}>{nombre}</option>
                            ))}
                        </select>

                        <label htmlFor="anio">Seleccionar Año:</label>
                        <select
                            id="anio"
                            value={anioSeleccionado}
                            onChange={(e) => setAnioSeleccionado(parseInt(e.target.value))}
                        >
                            {opcionesAnios.map(anio => (
                                <option key={anio} value={anio}>{anio}</option>
                            ))}
                        </select>
                    </div>

                    {/* Totales */}
                    <div className="resumen-totales">
                        <div className="total-card ingreso">
                            <h4>Total Ingresos</h4>
                            <p>{formatCurrency(totalIngresos)}</p>
                        </div>
                        <div className="total-card egreso">
                            <h4>Total Egresos</h4>
                            <p>{formatCurrency(totalEgresos)}</p>
                        </div>
                        <div className={`total-card saldo ${saldoTotal >= 0 ? 'positivo' : 'negativo'}`}>
                            <h4>Saldo Neto</h4>
                            <p>{formatCurrency(saldoTotal)}</p>
                        </div>
                    </div>

                    {/* 📈 Gráfica */}
                    <div className="grafica-container">
                        <h3>Evolución de Ingresos y Egresos - {NOMBRES_MESES[mesSeleccionado - 1]}</h3>
                        {dataGrafica.length > 0 ? (
                            <ResponsiveContainer width="100%" height={350}>
                                <LineChart data={dataGrafica}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="dia" label={{ value: "Día del mes", position: "insideBottom", offset: -5 }} />
                                    <YAxis />
                                    <Tooltip formatter={(value) => formatCurrency(value)} />
                                    <Legend />
                                    <Line type="monotone" dataKey="ingresos" stroke="#4CAF50" strokeWidth={3} name="Ingresos" />
                                    <Line type="monotone" dataKey="egresos" stroke="#F44336" strokeWidth={3} name="Egresos" />
                                </LineChart>
                            </ResponsiveContainer>
                        ) : (
                            <p className="no-data-message">No hay transacciones registradas para este período. 🧾</p>
                        )}
                    </div>

                    {/* 📋 Tabla de transacciones */}
                    {!loading && transaccionesPeriodo.length > 0 && (
                        <div className="tabla-responsive">
                            <table className="transacciones-table">
                                <thead>
                                    <tr>
                                        <th>Fecha</th>
                                        <th>Tipo</th>
                                        <th>Descripción</th>
                                        <th className="right-align">Monto</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transaccionesPeriodo.map(t => (
                                        <tr key={t.id} className={t.es_ingreso ? 'ingreso-row' : 'egreso-row'}>
                                            <td>{new Date(t.fecha_registro).toLocaleDateString('es-VE')}</td>
                                            <td>{t.es_ingreso ? 'INGRESO' : 'EGRESO'}</td>
                                            <td>{t.descripcion}</td>
                                            <td className="right-align">{formatCurrency(t.monto)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    <style>
                        {`
                            @media print {

                                html, body, #root, .poblacion-pdf-container, #print {

                                    overflow: visible !important;
                                }
                                .planilla-financiera-container table{
                                    page-break-inside: auto !important;
                                }

                            }
                        `}
                    </style>

                    {/* 📋 Planilla diaria de ingresos/egresos */}
                    {!loading && transaccionesPeriodo.length > 0 && (
                        <PlanillaFinanciera
                            data={transaccionesPeriodo}
                            mes={mesSeleccionado}
                            anio={anioSeleccionado}
                            contentRef={componentRef}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Generar_finasas_mes;
