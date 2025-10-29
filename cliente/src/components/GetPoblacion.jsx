import React, { useState } from 'react';
import { usePoblacion } from '../context/PoblacionContext';
import '../css/GetPoblacion.css';

const DetalleItem = ({ label, value }) => (
    <p className="detalle-item">
        <strong>{label}:</strong> <span>{value || 'N/A'}</span>
    </p>
);

const formatDate = (isoDate) => {
    if (!isoDate) return 'N/A';
    return new Date(isoDate).toLocaleDateString('es-VE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
};

function GetPoblacion() {
    const { getPoblacionByCI, poblacion } = usePoblacion(); 

    const [ci, setCi] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await getPoblacionByCI(ci);
        } catch (err) {
            setError('Error grave al conectar con el servidor.'); 
        } finally {
            setLoading(false); 
        }
    }

    return (
        <div className="search-container">
            <h2 className="title">Búsqueda de Miembros de la Comunidad</h2>
            
            <form onSubmit={handleSubmit} className="search-form">
                <input
                    type="text"
                    value={ci}
                    onChange={(e) => setCi(e.target.value)}
                    placeholder="Ingrese CI (Ej: 27643185)"
                    required
                    className="ci-input"
                />
                <button type="submit" disabled={loading} className="search-button">
                    {loading ? 'Buscando...' : 'Buscar Persona'}
                </button>
            </form>
            
            {loading && <p className="status-message loading">Cargando información...</p>}
            {error && <p className="status-message error">{error}</p>}
            
            {poblacion && !error && (
                <div className="result-panel">
                    <h3>✅ Persona Encontrada</h3>

                    <div className="data-card primary-data">
                        <h4>Datos Básicos</h4>
                        <DetalleItem label="Nombre Completo" value={`${poblacion.nombre} ${poblacion.apellidos}`} />
                        <DetalleItem label="Cédula de Identidad" value={poblacion.ci} />
                        <DetalleItem label="Tipo de Población" value={poblacion.tipoPoblacion} />
                    </div>

                    {poblacion.datos_poblacion && (
                        <div className="data-card secondary-data">
                            <h4>Datos Personales y de Inscripción</h4>
                            <DetalleItem label="Lugar de Nacimiento" value={poblacion.datos_poblacion.lugar_nacimiento} />
                            <DetalleItem label="Fecha de Nacimiento" value={formatDate(poblacion.datos_poblacion.fecha_nacimiento)} />
                            <DetalleItem label="Dirección" value={poblacion.datos_poblacion.direccion_habitacion} />
                            <DetalleItem label="Lugar de Bautizo" value={poblacion.datos_poblacion.lugar_bautizo} />
                            <DetalleItem label="Fecha de Bautizo" value={formatDate(poblacion.datos_poblacion.fecha_bautizo)} />
                            <DetalleItem label="Instituto/Colegio" value={poblacion.datos_poblacion.instituto} />
                            <DetalleItem label="Grado/Nivel" value={poblacion.datos_poblacion.grado} />
                            <DetalleItem label="Turno" value={poblacion.datos_poblacion.turno} />
                        </div>
                    )}
                    
                    {poblacion.padres && (
                        <div className="data-card tertiary-data">
                            <h4>Datos de Padres</h4>
                            <DetalleItem label="Edad del Acudiente" value={poblacion.padres.edad} />

                            <DetalleItem label="Madre" value={`${poblacion.padres.N_M} (CI: ${poblacion.padres.ci_M})`} />
                            <DetalleItem label="Teléfono Madre" value={poblacion.padres.NR_M} />
                            <DetalleItem label="Ocupación Madre" value={poblacion.padres.ocupacion_M} />

                            <DetalleItem label="Padre" value={`${poblacion.padres['-N_P']} (CI: ${poblacion.padres.ci_P})`} />
                            <DetalleItem label="Teléfono Padre" value={poblacion.padres.NR_P} />
                            <DetalleItem label="Ocupación Padre" value={poblacion.padres.ocupacion_P} />

                            <DetalleItem label="Estado Civil" value={poblacion.padres.casados} />
                            <DetalleItem label="Viven Juntos" value={poblacion.padres.viven_junto == 1 ? 'Sí' : 'No'} />
                            <DetalleItem label="Pareja de Hecho" value={poblacion.padres.Pareja_echo == 1 ? 'Sí' : 'No'} />
                            <DetalleItem label="Nro. Hermanos" value={poblacion.padres.NR_Her} />
                        </div>
                    )}

                </div>
            )}
            
            {poblacion === null && ci !== '' && !loading && !error && 
                <p className="status-message no-result">No se encontraron resultados para la CI: {ci}.</p>
            }
        </div>
    );
}

export default GetPoblacion;
