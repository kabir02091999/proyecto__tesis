import React from 'react';
import '../css/Administracion.css';
import Nav_Admin from '../components/Administrador/Nav_Admin';
import { AseAuth } from '../context/AuthContext';
import Reportes from '../components/Reportes';
import { ReportesProvider } from '../context/ReportesContext';
import GetUsuarios from '../components/GetUsuarios';
import PostUsarios from '../components/PostUsuarios';


function Administracion() {

  const { admin } = AseAuth();  
  if (!admin) {
    alert("No tienes permiso para acceder a esta página.");
    return <div>No tienes permiso para acceder a esta página.</div>;
  }

  return (
    <div className="admin-layout">
      <Nav_Admin/>
      <div className="admin-content-main">
            <GetUsuarios/>
            <PostUsarios/>
            
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