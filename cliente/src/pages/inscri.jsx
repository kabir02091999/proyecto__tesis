import React, { useState ,useRef} from 'react';


import ReactToPrint, { useReactToPrint } from 'react-to-print';
import PlanillaAsistencia from '../components/pdf/Planilla_Asistencia';

import '../css/Poblacion_Lapso.css'; 
import '../css/imprimir.css'

import { usePoblacion } from '../context/PoblacionContext';

// Importa solo los componentes definidos originalmente (CrearPoblacion y GetPoblacion están fuera del flujo de renderContent)
import CrearPoblacion from '../components/CrearPoblacion';
import GetPoblacion from '../components/GetPoblacion';

import Nav_Inscricion from '../components/inscricion/Nav_Inscricion';

// --- Componente Principal ---

function Inscri() {
    
    const contentRef = useRef(null);
    const reactToPrintFn = useReactToPrint({ contentRef });

    const [contenidoActivo, setContenidoActivo] = useState('lapso');
    const { getPoblacionByCI } = usePoblacion(); // Mantenemos la desestructuración por si la necesitas más adelante

    
    const handleButtonClick = (opcion) => {
        setContenidoActivo(opcion);
    };

    return (
        
        <div className="admin-layout"> 
            <Nav_Inscricion onOptionSelect={handleButtonClick} />
            <div className="admin-content-main">
                <GetPoblacion/>

                <div>
                    <button onClick={reactToPrintFn} >IMRPIMIRRRRRRRRRRRRRRRR</button>
                        <PlanillaAsistencia contentRef={contentRef}   />
                </div>

            </div>
            
        </div>
    );
}

export default Inscri;