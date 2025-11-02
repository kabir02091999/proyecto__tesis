import React, { useEffect } from "react";

import Nav_contenido from "../../components/contenido/Nav_contenido";
import EventCalendar from "../../components/calendario";

import { ReportesProvider } from '../../context/ReportesContext';
import Reportes from '../../components/Reportes';


import { AseAuth } from '../../context/AuthContext';

function Contenido() {

  const { calendario, Getcalendario } = AseAuth();

  useEffect(() => {

    Getcalendario();


  }, []);

  return (
    <div className="admin-layout">
      <Nav_contenido />
      <div className="admin-content-main">
        <h1>Contenido de Catequesis</h1>
        <div className="calendar-view">
          
          <EventCalendar calendario={calendario} />
        </div>
        <ReportesProvider>
          <Reportes />
        </ReportesProvider>
      </div>
    </div>
  );
}
export default Contenido;

