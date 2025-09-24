
import React, { useState } from 'react';

import { createUsuario } from '../api/auth';

//componets
import PostUsuarios from '../components/PostUsuarios';

function Administracion() {
  

  return (
    <div>
      <PostUsuarios/>
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