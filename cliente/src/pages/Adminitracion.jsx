import React from 'react';
import '../css/Administracion.css';
import Nav_Admin from '../components/Administrador/Nav_Admin';
import { AseAuth } from '../context/AuthContext';
import Reportes from '../components/Reportes';
import { ReportesProvider } from '../context/ReportesContext';


function Administracion() {

  const { admin } = AseAuth();  
  if (!admin) {
    alert("No tienes permiso para acceder a esta página.");
    return <div>No tienes permiso para acceder a esta página.</div>;
  }

  return (//ojo tengo que crar un usecontes donde se reinicia formularion
    <div className="admin-layout">
      <Nav_Admin/>
      <div className="admin-content-main">
            <ReportesProvider>
              <Reportes/>
            </ReportesProvider>
      </div>
    </div>
  );
}
export default Administracion;

/* {
    "id": 6,
    "nombre": "leonardo",
    "apellido": "quiros",
    "email": "kabirAd@gmail.com",
    "tipoUsuario": "administrador"
} */