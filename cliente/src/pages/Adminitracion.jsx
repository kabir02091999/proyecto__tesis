// Código para Administracion.jsx
import React from 'react';
import PostUsuarios from '../components/PostUsuarios';
import GetUsuarios from '../components/GetUsuarios';
import '../css/Administracion.css';

function Administracion() {
  return (//ojo tengo que crar un usecontes donde se reinicia formularion
    <div className="administracion-page-container">
      <PostUsuarios className="post-usuarios-top-margin" />
      <GetUsuarios />
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