import React, { useState } from 'react';
import { AseAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from "react-router-dom";

//css
import '../css/login.css';

function login() {
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const { login, user } = AseAuth();

  const handleSubmit = async (e) => { // Agrega 'async' aquí
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', contrasena);

    try {
      // Usa 'await' para esperar la respuesta completa de la promesa
      const result = await login({ email, contrasena });

      // Ahora puedes acceder a la propiedad tipoUsuario
      const tipo = result.tipoUsuario;
      console.log('Tipo de usuario:', tipo);

      // Redirige basándote en el tipo de usuario
      if (tipo === 'administrador') {
        navigate("/admin");
      } else if (tipo === 'financiero') {
        navigate("/financiero");
      } else if (tipo === "contenido"){
        navigate("/contenido")
      } else if (tipo ==='catequesis') {
        navigate("/catequesis")
      }
      else {
        // Redirige a una página por defecto si el tipo no coincide
        navigate("/"); 
      }

    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      // Aquí puedes mostrar un mensaje de error al usuario
      // Por ejemplo, con un estado local
    }
  };

  return (
    <div className="login-container1">
        <div className="login-container2">
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
            type="password" // Cambié el tipo a 'password' por seguridad
            id="contrasena"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Iniciar sesión
        </button>
      </form>
      </div>
    </div>
  );
}

export default login;