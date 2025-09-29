import react, { useState } from 'react'
import { usePoblacion } from '../context/PoblacionContext';
// Se eliminó la importación no utilizada: import { use } from 'react';

function GetPoblacion() {
    // Solo necesitamos getPoblacionByCI del contexto
    const { getPoblacionByCI , poblacion } = usePoblacion(); 

    const [ci, setCi] = useState('');
    const [poblacionData, setPoblacionData] = useState(null); // Aquí se guarda el objeto encontrado
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSutmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setPoblacionData(null); 
        console.log("ci en component " + ci)
        try {
            // El resultado de getPoblacionByCI se guarda en poblacionData
            const data = await getPoblacionByCI(ci); 
            //console.log("xxxxxxxxxxxx:", data); // Corregido el console.log
            //setPoblacionData(data);
        } catch (err) {
            setError('Error al obtener datos de población');
        } finally {
            setLoading(false); 
        }
    }
    console.log("aaaaaaaaaaaa:", poblacionData); // Corregido el console.log
    return (
        <div>
            <h2>Buscar Población por CI</h2>
            <form onSubmit={handleSutmit}>
                <input
                    type="text"
                    value={ci}
                    onChange={(e) => setCi(e.target.value)}
                    placeholder="Ingrese CI"
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Buscando...' : 'Buscar'}
                </button>
            </form>
            
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            
            {/* Si poblacionData es "truthy" (es decir, contiene el objeto), lo imprime */}
            {poblacion && (
                <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '10px' }}>
                    <h3>Información de la Población Encontrada:</h3>
                    
                    {/* Imprime el objeto JSON formateado para una mejor visualización */}
                    <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                        {JSON.stringify(poblacion, null, 2)}
                    </pre>

                </div>
            )}
            
        </div>
    );
}

export default GetPoblacion;