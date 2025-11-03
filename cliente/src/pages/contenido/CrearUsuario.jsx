import React from 'react';
import Nav_contenido from '../../components/contenido/Nav_contenido';
import PostUsuarios from '../../components/PostUsuarios';

function CrearUsuario() {
  return (
    <div className="admin-layout">
        <Nav_contenido/>
        <div className="admin-content-main">
            
            <PostUsuarios/>

        </div>
    </div>
  );
}
export default CrearUsuario;