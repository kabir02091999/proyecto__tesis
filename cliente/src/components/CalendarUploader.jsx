import React, { useState } from 'react';
import { AseAuth } from '../context/AuthContext'; 
import '../css/CalendarUploader.css'; 

const CalendarUploader = () => {
  const { Post_Calendario_liturgico, loading: contextLoading } = AseAuth(); 
  
  const [jsonText, setJsonText] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isLoading, setIsLoading] = useState(false);

  const validateAndParseJson = (text) => {
    setMessage({ type: '', text: '' }); 
    try {
      const parsedData = JSON.parse(text);

      if (!Array.isArray(parsedData) || parsedData.length === 0) {
        setMessage({ type: 'error', text: 'El JSON debe ser un array no vacío de eventos.' });
        return null;
      }

      const isValid = parsedData.every(item => 
        item.fecha && typeof item.fecha === 'string' && 
        item.evento && typeof item.evento === 'string'
      );

      if (!isValid) {
        setMessage({ type: 'error', text: "Cada evento debe tener las propiedades 'fecha' (YYYY-MM-DD) y 'evento' (string)." });
        return null;
      }
      
      return parsedData;

    } catch (e) {
      setMessage({ type: 'error', text: 'Formato JSON inválido. Revisa las comillas y la estructura de tu array.' });
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const eventos = validateAndParseJson(jsonText);

    if (!eventos) {
      setIsLoading(false);
      return; 
    }
    console.log("Eventos a enviar:", eventos);
    try {
      const response = await Post_Calendario_liturgico(eventos);
      
      if (response && response.message) {
        setMessage({ 
          type: 'success', 
          text: response.message 
        });
        setJsonText('');
      } else {
         setMessage({ 
          type: 'success', 
          text: 'Envío exitoso, pero la respuesta del servidor fue inesperada.' 
        });
      }
      
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message || 'Error desconocido al guardar.';
      
      setMessage({ 
        type: 'error', 
        text: `Fallo en el envío: ${errorMessage}` 
      });
      
    } finally {
      setIsLoading(false);
    }
  };

  const alertClassName = `message-alert alert-${message.type}`;
  
  const isButtonDisabled = isLoading || !jsonText.trim() || contextLoading;

  return (
    <div className="calendar-uploader-container">
      <h2>📅 Carga de Calendario Litúrgico</h2>
      
      {/* 🚨 LÍNEA CORREGIDA A CONTINUACIÓN */}
      <p>Pega el array JSON en el área de texto. Formato: <code className="json-format-hint">{ '[{ "fecha": "YYYY-MM-DD", "evento": "Nombre del Evento" }, ...]' }</code></p>
      
      <form onSubmit={handleSubmit}>
        <textarea
          className="json-textarea"
          value={jsonText}
          onChange={(e) => setJsonText(e.target.value)}
          placeholder="pegar aquí el array JSON, por favor."
          disabled={isLoading || contextLoading}
        />
        
        {message.text && (
          <div className={alertClassName}>
            {message.text}
          </div>
        )}

        <button 
          type="submit" 
          className="submit-button"
          disabled={isButtonDisabled}
        >
          {isLoading || contextLoading ? 'Procesando en Backend...' : '💾 Enviar Calendario'}
        </button>
      </form>
    </div>
  );
};

export default CalendarUploader;