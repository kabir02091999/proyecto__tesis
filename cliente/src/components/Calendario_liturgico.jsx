import React, { useState } from 'react';
import { AseAuth } from '../context/AuthContext'; 
import '../css/Calendario_liturgico.css';

function Calendario_Liturgico() { 
    
    const { 
        loading, 
        errors, 
        Post_Calendario_liturgico 
    } = AseAuth(); 
    
    const [eventos, setEventos] = useState([{ fecha: '', evento: '' }]);
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (index, field, value) => {
        const newEventos = eventos.map((item, i) => {
            if (index === i) {
                return { ...item, [field]: value };
            }
            return item;
        });
        setEventos(newEventos);
        setSuccessMessage('');
    };

    const handleAddEvento = () => {
        setEventos([...eventos, { fecha: '', evento: '' }]);
    };

    const handleRemoveEvento = (index) => {
        const newEventos = eventos.filter((_, i) => i !== index);
        if (newEventos.length === 0) {
            setEventos([{ fecha: '', evento: '' }]);
        } else {
            setEventos(newEventos);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');

        const eventosValidos = eventos.filter(e => e.fecha && e.evento && e.evento.trim() !== '');

        if (eventosValidos.length === 0) {
            setSuccessMessage("Se requiere al menos un evento completo (Fecha y Nombre) para enviar.");
            return;
        }

        const result = await Post_Calendario_liturgico(eventosValidos);
        
        if (result && !result.error) {
            const countMatch = result.message.match(/\d+/);
            const count = countMatch ? countMatch[0] : 'varios';
            setSuccessMessage(`¡Éxito! Se ha insertado ${count} evento(s) en el calendario.`);
            setEventos([{ fecha: '', evento: '' }]);
        } else if (result && result.error) {
            setSuccessMessage(`Error en la inserción: ${result.message}`);
        }
    };
    
    return (
        <div className="cl-container">
            <h2>Insertar Fechas del Calendario Litúrgico</h2>
            
            {errors.length > 0 && <p className="cl-error-message">{errors.join(', ')}</p>}
            
            {successMessage && (
                <p className={successMessage.includes("Éxito") ? "cl-success-message" : "cl-error-message"}>
                    {successMessage}
                </p>
            )}

            <form onSubmit={handleSubmit}>

                <div className="cl-table-wrapper">
                    <h3 style={{color: '#007bff'}}>Eventos a Registrar</h3>
                    <table className="cl-table">
                        <thead>
                            <tr>
                                <th style={{width: '20%'}}>Fecha</th>
                                <th style={{width: '65%'}}>Evento/Nombre</th>
                                <th style={{width: '15%', textAlign: 'center'}}>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {eventos.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <input
                                            type="date"
                                            value={item.fecha}
                                            onChange={(e) => handleChange(index, 'fecha', e.target.value)}
                                            required
                                            disabled={loading}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            placeholder="Nombre del evento litúrgico" 
                                            value={item.evento}
                                            onChange={(e) => handleChange(index, 'evento', e.target.value)}
                                            required
                                            disabled={loading}
                                        />
                                    </td>
                                    <td style={{textAlign: 'center'}}>
                                        {eventos.length > 1 && (
                                            <button 
                                                type="button" 
                                                onClick={() => handleRemoveEvento(index)}
                                                disabled={loading}
                                            >
                                                Eliminar
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="cl-actions-container">
                    <button 
                        type="button" 
                        onClick={handleAddEvento} 
                        disabled={loading}
                    >
                        Añadir Otro Evento
                    </button>

                    <button type="submit" disabled={loading}>
                        {loading ? 'Registrando Eventos...' : 'Registrar Eventos'}
                    </button>
                </div>
            </form>
        </div>
    );
} 

export default Calendario_Liturgico;
