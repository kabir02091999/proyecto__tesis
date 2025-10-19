import React, { useState } from 'react';
import axios from 'axios'; // Usaremos axios para la petición POST
import { useNavigate } from 'react-router-dom'; 
 // Asumiendo la ruta correcta
import '../../css/financiero/FormularioMultiTransacciones.css'; // Estilos específicos

//context
import { useFinancieroContext } from '../../context/finacieroContext';

const crearNuevaTransaccion = () => ({
    id: Date.now() + Math.random(), // ID único y estable
    es_ingreso: true, 
    monto: 0,
    descripcion: '',
});

const NuevaTransaccionBase = () => {
    const { 
        registrarTransacciones, 
        loading, 
        error, 
        successMessage,
        setError,
        setSuccessMessage
    } = useFinancieroContext();

    // 💡 Estado inicial con una transacción con ID
    const [transacciones, setTransacciones] = useState([crearNuevaTransaccion()]);
    
    const handleInputChange = (index, event) => {
        const { name, value, type, checked } = event.target;
        const list = [...transacciones];
        
        if (type === 'checkbox') {
            list[index][name] = checked;
        } else if (name === 'monto') {
            list[index][name] = parseFloat(value) || 0; 
        } else {
            list[index][name] = value;
        }
        setTransacciones(list);
    };

    const handleAddClick = () => {
        // 💡 Crear una nueva transacción con un ID único
        setTransacciones([...transacciones, crearNuevaTransaccion()]);
    };

    const handleRemoveClick = (index) => {
        const list = [...transacciones];
        list.splice(index, 1);
        // Asegurar que siempre quede al menos una fila
        setTransacciones(list.length > 0 ? list : [crearNuevaTransaccion()]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null); 

        const transaccionesValidas = transacciones.filter(t => 
            t.monto > 0 && t.descripcion.trim() !== ''
        );

        if (transaccionesValidas.length === 0) {
            setError('Debe ingresar al menos una transacción válida (Monto > 0 y Descripción).');
            return;
        }

        const result = await registrarTransacciones(transaccionesValidas);

        if (result.success) {
            // 💡 Limpiar el formulario con una nueva transacción con ID
            setTransacciones([crearNuevaTransaccion()]); 
        }
    };

    return (
        <div className="transacciones-container">
            <h1>Registro de Múltiples Transacciones</h1>
            <p>Ingrese los movimientos financieros (Ingresos o Egresos) que serán guardados en un solo lote.</p>
            
            <form onSubmit={handleSubmit} className="transacciones-form">
                
                {error && <div className="alert error">{error}</div>}
                {successMessage && <div className="alert success">{successMessage}</div>}

                <div className="transacciones-header">
                    <label>Tipo (I/E)</label>
                    <label>Monto</label>
                    <label>Descripción</label>
                    <label className="actions-label">Acciones</label>
                </div>
                
                {/* 💡 Usar transaccion.id como key */}
                {transacciones.map((transaccion) => (
                    <div key={transaccion.id} className="transaccion-row">
                        
                        <div className="input-group">
                            <input 
                                type="checkbox"
                                name="es_ingreso"
                                checked={transaccion.es_ingreso}
                                // Aquí todavía usamos el índice 'i' para handleInputChange
                                onChange={(e) => handleInputChange(transacciones.findIndex(t => t.id === transaccion.id), e)}
                            />
                            <span>{transaccion.es_ingreso ? 'Ingreso (I)' : 'Egreso (E)'}</span>
                        </div>

                        <div className="input-group">
                            <input
                                type="number"
                                name="monto"
                                step="0.01" 
                                min="0"
                                value={transaccion.monto === 0 ? '' : transaccion.monto} 
                                onChange={(e) => handleInputChange(transacciones.findIndex(t => t.id === transaccion.id), e)}
                                placeholder="0.00"
                                required
                            />
                        </div>
                        
                        <div className="input-group description-input">
                            <input
                                type="text"
                                name="descripcion"
                                value={transaccion.descripcion}
                                onChange={(e) => handleInputChange(transacciones.findIndex(t => t.id === transaccion.id), e)}
                                placeholder="Detalle del movimiento"
                                required
                            />
                        </div>

                        <div className="actions-group">
                            {/* Mostrar + solo en la última fila */}
                            {transacciones[transacciones.length - 1].id === transaccion.id && (
                                <button type="button" onClick={handleAddClick} className="btn-add" title="Añadir fila">+</button>
                            )}
                            {/* Mostrar - si hay más de una fila */}
                            {transacciones.length > 1 && (
                                <button type="button" onClick={() => handleRemoveClick(transacciones.findIndex(t => t.id === transaccion.id))} className="btn-remove" title="Eliminar fila">-</button>
                            )}
                        </div>
                    </div>
                ))}
                
                <div className="form-footer">
                    <button type="submit" disabled={loading} className="btn-submit">
                        {loading ? 'Registrando...' : 'Registrar Transacciones'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NuevaTransaccionBase;