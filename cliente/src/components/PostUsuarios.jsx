import React, { useState } from 'react';
import { createUsuario } from '../api/auth';
import '../css/PostUsuarios.css';

function PostUsuarios(props) {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    contrasena: '',
    tipoUsuario: 'administrador',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUsuario(formData);
      setFormData({
        nombre: '',
        apellido: '',
        email: '',
        contrasena: '',
        tipoUsuario: 'administrador',
      });
    } catch (error) {
      console.error("Error al crear el usuario:", error);
    }
  };

  return (
    <div className={`usuarios-form-container ${props.className || ''}`}>
      <form className="usuarios-form" onSubmit={handleSubmit}>
        <h2>👤 Crear Nuevo Usuario</h2>

        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            placeholder="Ingrese el nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Apellido</label>
          <input
            type="text"
            name="apellido"
            placeholder="Ingrese el apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Correo Electrónico</label>
          <input
            type="email"
            name="email"
            placeholder="usuario@ejemplo.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password"
            name="contrasena"
            placeholder="********"
            value={formData.contrasena}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Tipo de Usuario</label>
          <select
            name="tipoUsuario"
            value={formData.tipoUsuario}
            onChange={handleChange}
          >
            <option value="administrador">Administrador</option>
            <option value="financiero">Financiero</option>
            <option value="contenido">Contenido</option>
            <option value="catequesis">Catequesis</option>
          </select>
        </div>

        <button type="submit" className="btn-submit">✅ Crear Usuario</button>
      </form>
    </div>
  );
}

export default PostUsuarios;
