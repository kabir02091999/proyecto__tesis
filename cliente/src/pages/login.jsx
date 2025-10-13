import React, { useState } from 'react';
import { AseAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from "react-router-dom";

//imagenes
import logoParroquia from '../image/logoParroquia.png' 
import logoUnet from '../image/unet2.png' 

//css
import '../css/login.css'; 

function Login() {
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState(''); 
  const navigate = useNavigate();
  const location = useLocation();

  const { login, user } = AseAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 
    
    try {
      const result = await login({ email, contrasena });
      console.log("Inicio de sesión exitoso:", result);
      const tipo = result.tipoUsuario;
      console.log('Tipo de usuario:', tipo);

      // Redirige basándose en el tipo de usuario
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
        navigate("/"); 
      }

    } catch (err) {
      console.error("Error en el inicio de sesión:", err);
      // Mostrar un mensaje de error legible al usuario
      setError("Credenciales incorrectas o usuario no autorizado."); 
    }

    console.log("Usuario actual:", user);
  };

  return (
    <div className="login-container1">
      <div className="login-container2">
        
        <div className="logo-section">
          <img 
            src={logoUnet} 
            alt="Logo UNET" 
            className="logo logo-unet" 
            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/120x120/A0A0A0/FFFFFF?text=U+Logo" }}
          />
          
          <img 
            src={logoParroquia} 
            alt="Logo Parroquia" 
            className="logo logo-parroquia" 
            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/100x100/A0A0A0/FFFFFF?text=P+Logo" }}
          />
          
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Iniciar Sesión</h2>
          
          {/* Muestra el mensaje de error si existe */}
          {error && <p className="error-message">{error}</p>}
          
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
              type="password" 
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

export default Login;