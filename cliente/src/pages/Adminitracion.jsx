// Código para Administracion.jsx
import React from 'react';
import PostUsuarios from '../components/PostUsuarios';
import GetUsuarios from '../components/GetUsuarios';
import '../css/Administracion.css';
import Nav_Admin from '../components/Administrador/Nav_Admin';
import { AseAuth } from '../context/AuthContext';
import Reportes from '../components/Reportes';


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
            
            {/* <PostUsuarios className="post-usuarios-top-margin" />
            <GetUsuarios /> */}  
            <Reportes/>
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