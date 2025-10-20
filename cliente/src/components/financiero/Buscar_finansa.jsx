import React , { useEffect } from 'react';
import { useFinancieroContext } from '../../context/finacieroContext';
import '../../css/financiero/TablaTransacciones.css'; // 💡 Se mantiene solo el CSS de la tabla

function Buscar_finansa() {
    const { 
        fetchTransacciones, 
        transacciones, 
        loading, 
        error 
    } = useFinancieroContext();

    useEffect(() => {
        // Ejecutar la búsqueda al cargar el componente
        fetchTransacciones();
    }, [fetchTransacciones]); // Dependencia agregada para buenas prácticas

    const formatMonto = (monto) => {
        // Formato de moneda, usando 'es-VE' o tu configuración local
        return new Intl.NumberFormat('es-VE', { 
            style: 'currency', 
            currency: 'VES', 
            minimumFractionDigits: 2 
        }).format(monto);
    };

    return ( 
        // 💡 SOLO EL CONTENIDO PRINCIPAL
        <div className="finanzas-table-container"> 
            <h1>Buscar Transacciones</h1>
            <p>Listado histórico de movimientos registrados.</p>
            
            {loading && <div className="loading-message">Cargando transacciones...</div>}
            {error && <div className="alert error">{error}</div>}
            
            {/* Mostrar la tabla solo si hay datos */}
            {!loading && transacciones.length > 0 ? (
                <table className="transacciones-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Fecha</th>
                            <th>Tipo</th>
                            <th>Monto</th>
                            <th>Descripción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transacciones.map((transaccion) => (
                            <tr 
                                key={transaccion.id} 
                                className={transaccion.es_ingreso ? 'row-ingreso' : 'row-egreso'}
                            >
                                <td className="col-id">{transaccion.id}</td>
                                <td>{new Date(transaccion.fecha_registro).toLocaleDateString()}</td>
                                <td>
                                    <span className={`tipo-badge ${transaccion.es_ingreso ? 'badge-ingreso' : 'badge-egreso'}`}>
                                        {transaccion.es_ingreso ? 'ING.' : 'EGR.'}
                                    </span>
                                </td>
                                <td className="col-monto">
                                    {formatMonto(transaccion.monto)}
                                </td>
                                <td>{transaccion.descripcion}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                !loading && !error && <div className="no-data-message">No se encontraron transacciones.</div>
            )}
        </div>
     );
}
export default Buscar_finansa;