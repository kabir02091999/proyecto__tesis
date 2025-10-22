import React, { useState } from 'react';
import '../css/CrearPoblacion.css'; 
import { usePoblacion } from '../context/PoblacionContext';


function CrearPoblacion() {
    const { createPoblacion } = usePoblacion();
    
    const [activeTab, setActiveTab] = useState('basicos');
    
    // Opciones para el prefijo telefónico
    const phonePrefixes = ['0414', '0424', '0412', '0416', '0426'];
    
    // 1. ESTADO DE DATOS BÁSICOS
    const [datosBasicos, setDatosBasicos] = useState({
        nombre: '',
        apellidos: '',
        ci: '',
        tipoPoblacion: 'estudiante'
    });

    // 2. ESTADO DE DATOS PERSONALES
    const [datosPersonales, setDatosPersonales] = useState({
        lugar_nacimiento: '',
        fecha_nacimiento: '',
        lugar_bautizo: '',
        fecha_bautizo: '',
        direccion_habitacion: '',
        instituto: '',
        grado: '',
        turno: 'mañana'
    });

    // 3. ESTADO DE DATOS DE PADRES (separando prefijos/números)
    const [datosPadres, setDatosPadres] = useState({
        N_M: '', ci_M: '', 
        NR_M_prefix: phonePrefixes[0], 
        NR_M_number: '', 
        ocupacion_M: '',
        
        N_P: '', ci_P: '', 
        NR_P_prefix: phonePrefixes[0], 
        NR_P_number: '', 
        ocupacion_P: '',
        
        casados: 'no', 
        viven_junto: 0, 
        NR_Her: 0,
        edad: 0
    });

    const [loading, setLoading] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [success, setSuccess] = useState(false);

    // Funciones de manejo de cambios (Basicos y Personales sin cambios)
    const handleChangeBasicos = (e) => {
        const { name, value } = e.target;
        setDatosBasicos(prev => ({ ...prev, [name]: value }));
    };

    const handleChangePersonales = (e) => {
        const { name, value } = e.target;
        setDatosPersonales(prev => ({ ...prev, [name]: value }));
    };
    
    // FUNCIÓN DE CAMBIO MODIFICADA
    const handleChangePadres = (e) => {
        const { name, value } = e.target;
        let finalValue = value;

        if (name === 'viven_junto') {
            finalValue = value === 'si' ? 1 : 0;
        } else if (['NR_Her', 'edad'].includes(name)) {
            finalValue = Number(value);
        }
        
        setDatosPadres(prev => ({ ...prev, [name]: finalValue }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSubmitError(null);
        setSuccess(false);

        // --- LÓGICA CLAVE: Reconstruir los números de teléfono antes de enviar ---
        const NR_M = `${datosPadres.NR_M_prefix}${datosPadres.NR_M_number}`;
        const NR_P = `${datosPadres.NR_P_prefix}${datosPadres.NR_P_number}`;

        // Crear una copia del estado de padres y eliminar los campos separados
        const { 
            NR_M_prefix, NR_M_number, 
            NR_P_prefix, NR_P_number, 
            ...padresToSave 
        } = datosPadres;

        const nuevaPoblacion = {
            ...datosBasicos,
            datos_poblacion: datosPersonales,
            padres: { 
                ...padresToSave, 
                NR_M, // Añadir el número de madre completo
                NR_P  // Añadir el número de padre completo
            }, 
        };
        // ----------------------------------------------------------------------
        
        try {
            await createPoblacion(nuevaPoblacion);
            
            setSuccess(true);
            
            // Resetear el formulario después de un envío exitoso
            setDatosBasicos({ nombre: '', apellidos: '', ci: '', tipoPoblacion: 'estudiante' });
            setDatosPersonales({
                lugar_nacimiento: '', fecha_nacimiento: '', lugar_bautizo: '', fecha_bautizo: '', 
                direccion_habitacion: '', instituto: '', grado: '', turno: 'mañana'
            });
            // Resetear el estado de Padres al estado inicial modificado
            setDatosPadres({
                N_M: '', ci_M: '', NR_M_prefix: phonePrefixes[0], NR_M_number: '', ocupacion_M: '',
                N_P: '', ci_P: '', NR_P_prefix: phonePrefixes[0], NR_P_number: '', ocupacion_P: '',
                casados: 'no', viven_junto: 0, NR_Her: 0, edad: 0
            });
            setActiveTab('basicos');
            
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message || 'Error al crear la población. Verifique los datos.';
            setSubmitError(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    // --- Lógica de Renderizado de Pestañas ---
    const renderContent = () => {
        switch (activeTab) {
            case 'basicos':
                return (
                    <div className="tab-content">
                        <h3>Datos Personales Básicos</h3>
                        <label>Nombre:</label>
                        <input type="text" name="nombre" value={datosBasicos.nombre} onChange={handleChangeBasicos} required />
                        
                        <label>Apellidos:</label>
                        <input type="text" name="apellidos" value={datosBasicos.apellidos} onChange={handleChangeBasicos} required />
                        
                        <label>Cédula de Identidad (CI):</label>
                        <input type="text" name="ci" value={datosBasicos.ci} onChange={handleChangeBasicos} required />
                        
                        <label>Tipo de Población:</label>
                        <select name="tipoPoblacion" value={datosBasicos.tipoPoblacion} onChange={handleChangeBasicos} required>
                            <option value="estudiante">Estudiante</option>
                            <option value="profesor">Profesor</option>
                        </select>

                        <button type="button" onClick={() => setActiveTab('personales')}>Siguiente (Datos Personales)</button>
                    </div>
                );
            case 'personales':
                return (
                    <div className="tab-content">
                        <h3>Datos Personales y de Inscripción</h3>
                        <label>Lugar de Nacimiento:</label>
                        <input type="text" name="lugar_nacimiento" value={datosPersonales.lugar_nacimiento} onChange={handleChangePersonales} />
                        
                        <label>Fecha de Nacimiento:</label>
                        <input type="date" name="fecha_nacimiento" value={datosPersonales.fecha_nacimiento} onChange={handleChangePersonales} />
                        
                        <label>Dirección de Habitación:</label>
                        <input type="text" name="direccion_habitacion" value={datosPersonales.direccion_habitacion} onChange={handleChangePersonales} />

                        <label>Lugar de Bautizo:</label>
                        <input type="text" name="lugar_bautizo" value={datosPersonales.lugar_bautizo} onChange={handleChangePersonales} />

                        <label>Fecha de Bautizo:</label>
                        <input type="date" name="fecha_bautizo" value={datosPersonales.fecha_bautizo} onChange={handleChangePersonales} />

                        <label>Instituto/Colegio:</label>
                        <input type="text" name="instituto" value={datosPersonales.instituto} onChange={handleChangePersonales} />

                        <div className="row">
                            <div>
                                <label>Grado/Nivel:</label>
                                <input type="text" name="grado" value={datosPersonales.grado} onChange={handleChangePersonales} />
                            </div>
                            <div>
                                <label>Turno:</label>
                                <select name="turno" value={datosPersonales.turno} onChange={handleChangePersonales}>
                                    <option value="mañana">Mañana</option>
                                    <option value="tarde">Tarde</option>
                                </select>
                            </div>
                        </div>

                        <button type="button" onClick={() => setActiveTab('basicos')}>Anterior</button>
                        <button type="button" onClick={() => setActiveTab('padres')}>Siguiente (Datos de Padres)</button>
                    </div>
                );
            case 'padres':
                return (
                    <div className="tab-content padres-tab">
                        <h3>Información de Padres</h3>
                        
                        {/* Datos de la Madre */}
                        <h4>Madre</h4>
                        <label>Nombre Madre:</label>
                        <input type="text" name="N_M" value={datosPadres.N_M} onChange={handleChangePadres} />
                        <label>CI Madre:</label>
                        <input type="text" name="ci_M" value={datosPadres.ci_M} onChange={handleChangePadres} />
                        
                        {/* CAMPO TELEFÓNICO DE MADRE - CORREGIDO CON WRAPPER */}
                        {/* IMPORTANTE: QUITAMOS LA CLASE 'row' para que el CSS de phone-input-group funcione bien */}
                        <div className="phone-input-group">
                            <label className="full-width-label">Teléfono Madre:</label>
                            
                            {/* NUEVO CONTENEDOR PARA LA ALINEACIÓN HORIZONTAL */}
                            <div className="phone-inputs-wrapper"> 
                                <div className="phone-prefix">
                                    <select name="NR_M_prefix" value={datosPadres.NR_M_prefix} onChange={handleChangePadres}>
                                        {phonePrefixes.map(p => (
                                            <option key={p} value={p}>{p}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="phone-number">
                                    <input 
                                        type="text" 
                                        name="NR_M_number" 
                                        value={datosPadres.NR_M_number} 
                                        onChange={handleChangePadres}
                                        placeholder="#######"
                                        maxLength="7"
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <label>Ocupación Madre:</label>
                        <input type="text" name="ocupacion_M" value={datosPadres.ocupacion_M} onChange={handleChangePadres} />

                        {/* Datos del Padre */}
                        <h4>Padre</h4>
                        <label>Nombre Padre:</label>
                        <input type="text" name="N_P" value={datosPadres.N_P} onChange={handleChangePadres} />
                        <label>CI Padre:</label>
                        <input type="text" name="ci_P" value={datosPadres.ci_P} onChange={handleChangePadres} />
                        
                        {/* CAMPO TELEFÓNICO DE PADRE - CORREGIDO CON WRAPPER */}
                        {/* IMPORTANTE: QUITAMOS LA CLASE 'row' para que el CSS de phone-input-group funcione bien */}
                        <div className="phone-input-group">
                            <label className="full-width-label">Teléfono Padre:</label>
                            
                            {/* NUEVO CONTENEDOR PARA LA ALINEACIÓN HORIZONTAL */}
                            <div className="phone-inputs-wrapper">
                                <div className="phone-prefix">
                                    <select name="NR_P_prefix" value={datosPadres.NR_P_prefix} onChange={handleChangePadres}>
                                        {phonePrefixes.map(p => (
                                            <option key={p} value={p}>{p}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="phone-number">
                                    <input 
                                        type="text" 
                                        name="NR_P_number" 
                                        value={datosPadres.NR_P_number} 
                                        onChange={handleChangePadres}
                                        placeholder="#######"
                                        maxLength="7"
                                    />
                                </div>
                            </div>
                        </div>

                        <label>Ocupación Padre:</label>
                        <input type="text" name="ocupacion_P" value={datosPadres.ocupacion_P} onChange={handleChangePadres} />

                        {/* Datos Matrimoniales y Hermanos */}
                        <h4>Datos Familiares</h4>
                        <label>Casados por:</label>
                        <select name="casados" value={datosPadres.casados} onChange={handleChangePadres}>
                            <option value="no">No Casados</option>
                            <option value="civil">Vía Civil</option>
                            <option value="iglesia">Vía Eclesiástica</option>
                        </select>
                        
                        <label>¿Viven Juntos?:</label>
                        <select 
                            name="viven_junto" 
                            value={datosPadres.viven_junto === 1 ? 'si' : 'no'} 
                            onChange={handleChangePadres}
                        >
                            <option value="si">Sí</option>
                            <option value="no">No</option>
                        </select>

                        <label>Número de Hermanos:</label>
                        <input type="number" name="NR_Her" value={datosPadres.NR_Her} onChange={handleChangePadres} min="0" />
                        <label>Edad Promedio (Opcional):</label>
                        <input type="number" name="edad" value={datosPadres.edad} onChange={handleChangePadres} min="0" />

                        <button type="button" onClick={() => setActiveTab('personales')}>Anterior</button>
                        <button type="submit" disabled={loading} className="submit-button">
                            {loading ? 'Guardando...' : 'Crear Población'}
                        </button>
                    </div>
                );
            default:
                return <div>Selecciona una pestaña</div>;
        }
    };
    
    return (
        <div className="create-poblacion-container">
            <h1 className="form-title">Registro de Nuevo participante</h1>
            
            <div className="tab-menu">
                <button 
                    className={`tab-button ${activeTab === 'basicos' ? 'active' : ''}`}
                    onClick={() => setActiveTab('basicos')}
                >
                    1. Datos Básicos
                </button>
                <button 
                    className={`tab-button ${activeTab === 'personales' ? 'active' : ''}`}
                    onClick={() => setActiveTab('personales')}
                >
                    2. Datos Personales
                </button>
                <button 
                    className={`tab-button ${activeTab === 'padres' ? 'active' : ''}`}
                    onClick={() => setActiveTab('padres')}
                >
                    3. Datos de Padres
                </button>
            </div>

            {success && <p className="status-message success">¡Registro creado con éxito! 🎉</p>}
            {submitError && <p className="status-message error">{submitError}</p>}

            <form onSubmit={handleSubmit} className="poblacion-form">
                {renderContent()}
            </form>
        </div>
    );
}

export default CrearPoblacion;