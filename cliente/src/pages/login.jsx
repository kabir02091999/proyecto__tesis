import React, { useState } from 'react';

import { AseAuth }  from '../context/AuthContext'

//css
import '../css/login.css'

function login()    {

  const [email, setEmail] = useState('');
  const [contrasena, setcontrasena] = useState('');

  const {login} = AseAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', contrasena);
    login({email, contrasena});
    alert(`Iniciando sesión con el correo: ${email}`);
    // Aquí podrías agregar la lógica para la autenticación
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>
        <div className="form-group">
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contrasena">Contraseña</label>
          <input
            type="contrasena"
            id="contrasena"
            value={contrasena}
            onChange={(e) => setcontrasena(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}

export default login;