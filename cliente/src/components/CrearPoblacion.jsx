import React, { useState } from 'react';
import '../css/CrearPoblacion.css'; 
import { usePoblacion } from '../context/PoblacionContext'; // Asumo que tienes una función para crear

function CrearPoblacion() {
    const { createPoblacion } = usePoblacion(); // Asume que tienes esta función en tu Context
    
    // Estado para la navegación entre pestañas (tabs)
    const [activeTab, setActiveTab] = useState('basicos');
    
    // Estados para cada sección de datos
    const [datosBasicos, setDatosBasicos] = useState({
        nombre: '',
        apellidos: '',
        ci: '',
        tipoPoblacion: 'estudiante' // Valor por defecto
    });

    const [datosPersonales, setDatosPersonales] = useState({
        lugar_nacimiento: '',
        fecha_nacimiento: '',
        lugar_bautizo: '',
        fecha_bautizo: '',
        direccion_habitacion: '',
        instituto: '',
        grado: '',
        turno: 'mañana' // Valor por defecto
    });

    const [datosPadres, setDatosPadres] = useState({
        N_M: '', ci_M: '', NR_M: '', ocupacion_M: '',
        N_P: '', ci_P: '', NR_P: '', ocupacion_P: '',
        casados: 'no', // Opciones: 'iglesia', 'civil', 'no'
        viven_junto: 1,
        NR_Her: 0,
        edad: 0
    });

    const [loading, setLoading] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [success, setSuccess] = useState(false);

    // Función genérica para manejar cambios en los datos básicos
    const handleChangeBasicos = (e) => {
        const { name, value } = e.target;
        setDatosBasicos(prev => ({ ...prev, [name]: value }));
    };

    // Función genérica para manejar cambios en datos personales
    const handleChangePersonales = (e) => {
        const { name, value } = e.target;
        setDatosPersonales(prev => ({ ...prev, [name]: value }));
    };
    
    // Función genérica para manejar cambios en datos de padres
    const handleChangePadres = (e) => {
        const { name, value } = e.target;
        // Convertir a número si es necesario para campos específicos
        const finalValue = ['viven_junto', 'NR_Her', 'edad'].includes(name) ? Number(value) : value;
        setDatosPadres(prev => ({ ...prev, [name]: finalValue }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSubmitError(null);
        setSuccess(false);

        // 1. Ensamblar el objeto final con la estructura requerida por el backend
        const nuevaPoblacion = {
            ...datosBasicos,
            datos_poblacion: datosPersonales,
            padres: datosPadres,
            // NOTA: 'id', 'ID', y 'ci' dentro de sub-objetos no se envían
            // porque deben ser manejados por el backend (auto-incremento o claves foráneas)
        };
        
        console.log("Datos a enviar:", nuevaPoblacion);

        try {
            // Llama a la función del contexto. Asume que toma el objeto ensamblado.
            await createPoblacion(nuevaPoblacion);
            
            setSuccess(true);
            // Opcional: Limpiar los formularios después del éxito
            // setDatosBasicos({ nombre: '', apellidos: '', ci: '', tipoPoblacion: 'estudiante' });
            // ... limpiar el resto
        } catch (error) {
            setSubmitError(error.message || 'Error al crear la población. Verifique los datos.');
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
                            <option value="catequista">Catequista</option>
                            <option value="otro">Otro</option>
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
                                    <option value="noche">Noche</option>
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
                        <label>Teléfono Madre:</label>
                        <input type="text" name="NR_M" value={datosPadres.NR_M} onChange={handleChangePadres} />
                        <label>Ocupación Madre:</label>
                        <input type="text" name="ocupacion_M" value={datosPadres.ocupacion_M} onChange={handleChangePadres} />

                        {/* Datos del Padre */}
                        <h4>Padre</h4>
                        <label>Nombre Padre:</label>
                        <input type="text" name="N_P" value={datosPadres.N_P} onChange={handleChangePadres} />
                        <label>CI Padre:</label>
                        <input type="text" name="ci_P" value={datosPadres.ci_P} onChange={handleChangePadres} />
                        <label>Teléfono Padre:</label>
                        <input type="text" name="NR_P" value={datosPadres.NR_P} onChange={handleChangePadres} />
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
                        <label>¿Viven Juntos? (1=Sí, 0=No):</label>
                        <input type="number" name="viven_junto" value={datosPadres.viven_junto} onChange={handleChangePadres} min="0" max="1" />
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
            <h1 className="form-title">Registro de Nueva Población</h1>
            
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