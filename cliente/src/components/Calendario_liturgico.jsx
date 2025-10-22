import React, { useState } from 'react';
import { AseAuth } from '../context/AuthContext'; 
/* import './GetPoblacionLapso.css';  */

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
            alert("Yo necesito al menos un evento completo (Fecha y Nombre) para enviar.");
            return;
        }

        const result = await Post_Calendario_liturgico(eventosValidos);
        
        if (result && !result.error) {
            const countMatch = result.message.match(/\d+/);
            const count = countMatch ? countMatch[0] : 'varios';

            setSuccessMessage(`¡Éxito! Yo he insertado ${count} evento(s) en el calendario.`);
            setEventos([{ fecha: '', evento: '' }]);
        }
    };

    return (
        <div className="poblacion-lapso-container">
            <h2>Insertar fecha del calendario liturgico</h2>
            
            {errors.length > 0 && <p className="error-message">{errors.join(', ')}</p>}
            
            {successMessage && <p className="loading-message" style={{backgroundColor: '#d4edda', color: '#155724', border: '1px solid #c3e6cb'}}>{successMessage}</p>}

            <form onSubmit={handleSubmit}>

                <div className="table-lapso-container" style={{padding: '10px 20px'}}>
                    <h3 style={{color: '#007bff'}}>Eventos que yo voy a Insertar</h3>
                    <table className="table-lapso">
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
                                            style={{padding: '5px', width: '100%', boxSizing: 'border-box', border: '1px solid #ccc'}}
                                            disabled={loading}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            placeholder="Yo escribo el nombre del evento"
                                            value={item.evento}
                                            onChange={(e) => handleChange(index, 'evento', e.target.value)}
                                            required
                                            style={{padding: '5px', width: '100%', boxSizing: 'border-box', border: '1px solid #ccc'}}
                                            disabled={loading}
                                        />
                                    </td>
                                    <td style={{textAlign: 'center'}}>
                                        {eventos.length > 1 && (
                                            <button 
                                                type="button" 
                                                onClick={() => handleRemoveEvento(index)}
                                                style={{backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer'}}
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

                <div className="inscripcion-form" style={{marginTop: '20px', justifyContent: 'flex-start', gap: '10px'}}>
                    <button 
                        type="button" 
                        onClick={handleAddEvento} 
                        disabled={loading}
                        style={{backgroundColor: '#28a745', padding: '10px 15px', borderRadius: '6px', color: 'white', border: 'none', cursor: 'pointer'}}
                    >
                        Yo Añado Otro Evento
                    </button>

                    <button type="submit" disabled={loading}>
                        {loading ? 'Yo Estoy Insertando...' : 'Yo Inserto Todos los Eventos'}
                    </button>
                </div>
            </form>
        </div>
    );
}  

export default Calendario_Liturgico;