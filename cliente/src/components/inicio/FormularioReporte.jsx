import React, { useState } from 'react';
import '../../css/inicion/reporteForm.css'; 
import { useReportes } from '../../context/ReportesContext';

const TEXT_COLOR = '#001F54'; 
const ACCENT_COLOR = '#007bff'; 

const FormularioReporte = () => {
    
    const { enviarReporte } = useReportes();

    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        tipoReporte: 'reporte', 
        mensaje: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        /* console.log("Datos del Reporte Enviados:", formData);
        alert('Reporte enviado con éxito. Gracias por tu comunicación.'); */

        try {
            await enviarReporte(formData);
            alert('Reporte enviado con éxito. Gracias por tu comunicación. recordar que te responderesmos de acuerdo al medio que nos proporcionaste.');
        } catch (error) {
            alert('Hubo un error al enviar el reporte. Por favor, intenta nuevamente.');
            console.error('Error al enviar el reporte:', error);
        }
        


        setFormData({
            nombre: '',
            email: '',
            telefono: '',
            tipoReporte: 'reporte',
            mensaje: ''
        });
    };
    
    // ... Tu JSX con las clases CSS definidas en reporteForm.css ...
    return (
        <div className="reporte-form-container">
            <h2 className="reporte-form-title" style={{ color: TEXT_COLOR }}>
                Módulo de Comunicación y Reportes
            </h2>
            <p className="reporte-form-subtitle">
                Por favor, utiliza este formulario para enviar reportes de fallas, sugerencias o comunicaciones importantes.
            </p>

            <form className="reporte-form" onSubmit={handleSubmit}>
                
                {/* SECCIÓN 1: DATOS DE CONTACTO */}
                <h3 className="section-header" style={{ color: ACCENT_COLOR }}>
                    1. Datos de Comunicación
                </h3>
                <div className="form-group-grid">
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre Completo (*)</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Correo Electrónico (*)</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                
                <div className="form-group-grid">
                    <div className="form-group">
                        <label htmlFor="telefono">Teléfono</label>
                        <input
                            type="text"
                            id="telefono"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="tipoReporte">Tipo de Comunicación (*)</label>
                        <select
                            id="tipoReporte"
                            name="tipoReporte"
                            value={formData.tipoReporte}
                            onChange={handleChange}
                            required
                        >
                            <option value="reporte">Reporte de Falla (Bug)</option>
                            <option value="sugerencia">Sugerencia/Mejora</option>
                            <option value="consulta">Consulta General</option>
                        </select>
                    </div>
                </div>

                {/* SECCIÓN 2: MENSAJE DE REPORTE */}
                <h3 className="section-header" style={{ color: ACCENT_COLOR }}>
                    2. Mensaje y Detalle del Reporte
                </h3>
                
                <div className="form-group">
                    <label htmlFor="mensaje">
                        Describa su Mensaje o Reporte detalladamente (*)
                    </label>
                    <textarea
                        id="mensaje"
                        name="mensaje"
                        rows="6"
                        value={formData.mensaje}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <button type="submit" className="submit-button" style={{ backgroundColor: ACCENT_COLOR }}>
                    Enviar Comunicación
                </button>
            </form>
        </div>
    );
};

export default FormularioReporte;