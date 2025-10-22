import React, { useState } from 'react';
import '../../css/financiero/FormularioMultiTransacciones.css';
import { useFinancieroContext } from '../../context/finacieroContext';

const crearNuevaTransaccion = () => ({
  id: Date.now() + Math.random(),
  es_ingreso: true,
  monto: 0,
  descripcion: '',
  otroTexto: '' // Campo para "otros"
});

const opcionesIngresos = [
  "Servicio por celebración de bautismo",
  "Servicio por celebración matrimonial",
  "Servicio por celebración de funeral",
  "Servicio por celebración de cumpleaños de vida",
  "Servicio por celebración del Sacramento de Primera Comunión",
  "Servicio por celebración del Sacramento de Confirmación",
  "Servicio por celebración de actividades eventuales",
  "Servicio por celebración de Actos de Grado",
  "Servicio por celebración de la Eucaristía dominical",
  "Otros servicios"
];

const opcionesEgresos = [
  "Gastos por insumos para la celebración eucarística",
  "Gastos por artículos de limpieza",
  "Gastos por adquisición de hostias",
  "Gastos por adquisición de insumos para las actividades eventuales",
  "Gastos por Honorarios de Representación Sacerdotal",
  "Gastos por adquisición de materiales para actividades de fechas especiales religiosas",
  "Gastos por aporte a la Diócesis",
  "Gastos por impresión y fotocopias de material parroquial",
  "Gastos por movilidad urbana",
  "Gastos por adquisición de flores naturales",
  "Gastos por inscripción a las actividades de formación parroquial",
  "Gastos por adquisición de materiales de oficina",
  "Otros egresos"
];

const NuevaTransaccionBase = () => {
  const { 
    registrarTransacciones, 
    loading, 
    error, 
    successMessage,
    setError,
    setSuccessMessage
  } = useFinancieroContext();

  const [transacciones, setTransacciones] = useState([crearNuevaTransaccion()]);

  const handleInputChange = (index, event) => {
    const { name, value, type, checked } = event.target;
    const list = [...transacciones];

    if (type === 'checkbox') {
      list[index][name] = checked;
      // Reinicia los campos al cambiar tipo
      list[index].descripcion = '';
      list[index].otroTexto = '';
    } else if (name === 'monto') {
      list[index][name] = parseFloat(value) || 0;
    } else {
      list[index][name] = value;
    }

    setTransacciones(list);
  };

  const handleAddClick = () => {
    setTransacciones([...transacciones, crearNuevaTransaccion()]);
  };

  const handleRemoveClick = (index) => {
    const list = [...transacciones];
    list.splice(index, 1);
    setTransacciones(list.length > 0 ? list : [crearNuevaTransaccion()]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    // 💡 Aquí concatenamos si es “otros”
    const transaccionesPreparadas = transacciones.map(t => {
      const esOtros = t.descripcion.includes("Otros");
      const descripcionFinal = esOtros && t.otroTexto.trim() !== ''
        ? `${t.descripcion} - ${t.otroTexto.trim()}`
        : t.descripcion;

      return {
        ...t,
        descripcion: descripcionFinal
      };
    });

    const transaccionesValidas = transaccionesPreparadas.filter(t => 
      t.monto > 0 && t.descripcion.trim() !== ''
    );

    if (transaccionesValidas.length === 0) {
      setError('Debe ingresar al menos una transacción válida (Monto > 0 y Descripción).');
      return;
    }

    const result = await registrarTransacciones(transaccionesValidas);

    if (result.success) {
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

        {transacciones.map((transaccion) => {
          const index = transacciones.findIndex(t => t.id === transaccion.id);
          const opciones = transaccion.es_ingreso ? opcionesIngresos : opcionesEgresos;
          const esOtros = transaccion.descripcion.includes("Otros");

          return (
            <div key={transaccion.id} className="transaccion-row">
              
              {/* Tipo */}
              <div className="input-group">
                <input
                  type="checkbox"
                  name="es_ingreso"
                  checked={transaccion.es_ingreso}
                  onChange={(e) => handleInputChange(index, e)}
                />
                <span>{transaccion.es_ingreso ? 'Ingreso (I)' : 'Egreso (E)'}</span>
              </div>

              {/* Monto */}
              <div className="input-group">
                <input
                  type="number"
                  name="monto"
                  step="0.01"
                  min="0"
                  value={transaccion.monto === 0 ? '' : transaccion.monto}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder="0.00"
                  required
                />
              </div>

              {/* Descripción */}
              <div className="input-group description-input">
                <select
                    name="descripcion"
                    value={transaccion.descripcion}
                    onChange={(e) => handleInputChange(index, e)}
                    required
                >
                    <option value="">Seleccione una opción...</option>
                    {opciones.map((op, i) => (
                    <option key={i} value={op}>{op}</option>
                    ))}
                </select>

                {esOtros && (
                    <input
                    type="text"
                    name="otroTexto"
                    placeholder="Especifique otro servicio o gasto..."
                    value={transaccion.otroTexto}
                    onChange={(e) => handleInputChange(index, e)}
                    required
                    />
                )}
              </div>

              {/* Botones */}
              <div className="actions-group">
                {transacciones[transacciones.length - 1].id === transaccion.id && (
                  <button type="button" onClick={handleAddClick} className="btn-add" title="Añadir fila">+</button>
                )}
                {transacciones.length > 1 && (
                  <button type="button" onClick={() => handleRemoveClick(index)} className="btn-remove" title="Eliminar fila">-</button>
                )}
              </div>
            </div>
          );
        })}

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
