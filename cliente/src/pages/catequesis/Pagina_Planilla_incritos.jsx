import React from 'react';
import Nav_Inscricion from '../../components/inscricion/Nav_Inscricion';
import Planilla_inscritos from '../../components/inscricion/Planilla_inscritos';

function Pagina_Planilla_Inscritos() {
  return (
     <div className="admin-layout"> 	
            <Nav_Inscricion/> 
            <div className="admin-content-main">
                <Planilla_inscritos/>
            </div>
    </div>
  );
}

export default Pagina_Planilla_Inscritos;