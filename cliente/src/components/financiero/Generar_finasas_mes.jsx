import React, { useState, useEffect } from 'react';
//import NavbarParroquia from '../../components/inicio/NavbarParroquia'; // 🚨 Ajusta esta ruta si es necesario
import { useFinancieroContext } from '../../context/finacieroContext'; // 🚨 RUTA AL CONTEXTO
import '../../css/financiero/finanzas_mes.css'; 

// Array simple para los nombres de los meses (para mostrar en el selector y título)
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
    const [mesSeleccionado, setMesSeleccionado] = useState(today.getMonth() + 1); // 1-index
    const [anioSeleccionado, setAnioSeleccionado] = useState(today.getFullYear());
    
    useEffect(() => {
        
        cargarTransaccionesPorPeriodo(mesSeleccionado, anioSeleccionado);
    }, [mesSeleccionado, anioSeleccionado]); 


    const totalIngresos = transaccionesPeriodo
        .filter(t => t.es_ingreso === 1 || t.es_ingreso === true)
        .reduce((sum, t) => sum + parseFloat(t.monto), 0);
        
    const totalEgresos = transaccionesPeriodo
        .filter(t => t.es_ingreso === 0 || t.es_ingreso === false)
        .reduce((sum, t) => sum + parseFloat(t.monto), 0);

    const saldoTotal = totalIngresos - totalEgresos;

  
    const opcionesAnios = [];
    const anioActual = today.getFullYear();
    for (let i = 2023; i <= anioActual + 1; i++) {
        opcionesAnios.push(i);
    }
    
    const formatCurrency = (amount) => {
        return parseFloat(amount).toLocaleString('es-VE', { 
            style: 'currency', 
            currency: 'VES', 
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    return (
        <React.Fragment>

            <div className="finanzas-page-wrapper">
                <div className="finanzas-content-wrapper">
                    
                    <h2 className="finanzas-header">Reporte de Flujo de Caja Mensual 📊</h2>
                    
                    {/* SELECTORES DE PERÍODO */}
                    <div className="periodo-selector-container">
                        <label htmlFor="mes">Seleccionar Mes:</label>
                        <select
                            id="mes"
                            value={mesSeleccionado}
                            onChange={(e) => setMesSeleccionado(parseInt(e.target.value))}
                        >
                            {NOMBRES_MESES.map((nombre, index) => (
                                <option key={index + 1} value={index + 1}>
                                    {nombre}
                                </option>
                            ))}
                        </select>

                        <label htmlFor="anio">Seleccionar Año:</label>
                        <select
                            id="anio"
                            value={anioSeleccionado}
                            onChange={(e) => setAnioSeleccionado(parseInt(e.target.value))}
                        >
                            {opcionesAnios.map(anio => (
                                <option key={anio} value={anio}>
                                    {anio}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* RESUMEN DE TOTALES */}
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

                    {/* TABLA DE TRANSACCIONES */}
                    <h3 className="transacciones-table-title">
                        Detalle de Transacciones: {NOMBRES_MESES[mesSeleccionado - 1]} de {anioSeleccionado}
                    </h3>

                    {/* MENSAJES DE ESTADO */}
                    {loading && <p className="loading-message">Cargando transacciones... ⌛</p>}
                    {error && <p className="error-message">⚠️ Error: {error}</p>}
                    
                    {(!loading && !error && transaccionesPeriodo.length === 0) && (
                        <p className="no-data-message">No hay transacciones registradas para este período. 🧾</p>
                    )}

                    {/* RENDERIZADO DE LA TABLA */}
                    {(!loading && transaccionesPeriodo.length > 0) && (
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
                                            <td className="right-align">
                                                {formatCurrency(t.monto)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </React.Fragment>
    );
}

export default Generar_finasas_mes;