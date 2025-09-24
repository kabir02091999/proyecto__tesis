import React, { useState } from 'react';
import { createUsuario } from '../api/auth';
import '../css/PostUsuarios.css'; // Asegúrate de que este archivo CSS existe

function PostUsuarios() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    contrasena: '',
    tipoUsuario: 'administrador', // Valor por defecto
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => { // 1. Agrega 'async' aquí
    e.preventDefault();

    try {
      console.log("Datos del formulario enviados:", formData);
      
      // 2. Usa 'await' para esperar a que la promesa se complete
      const response = await createUsuario(formData);
      
      console.log("Respuesta del servidor:", response.data);
      alert("Usuario creado con éxito!");
      
      // 3. Limpia el formulario después de un envío exitoso
      setFormData({
        nombre: '',
        apellido: '',
        email: '',
        contrasena: '',
        tipoUsuario: 'administrador',
      });
      
    } catch (error) {
      // 4. Maneja cualquier error de la API aquí
      console.error("Error al crear el usuario:", error.response ? error.response.data : error.message);
      alert("Hubo un error al crear el usuario. Por favor, revisa los datos.");
    }
  };

  return (
    <div className="usuarios-form-container">
      <form className="usuarios-form" onSubmit={handleSubmit}>
        <h2>Crear Usuario</h2> {/* Título para el formulario */}
        <input 
          type="text" 
          name="nombre" 
          placeholder="Nombre" 
          value={formData.nombre} 
          onChange={handleChange} 
        />
        <input 
          type="text" 
          name="apellido" 
          placeholder="Apellido" 
          value={formData.apellido} 
          onChange={handleChange} 
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Correo electrónico" 
          value={formData.email} 
          onChange={handleChange} 
        />
        <input 
          type="password" 
          name="contrasena" 
          placeholder="Contraseña" 
          value={formData.contrasena} 
          onChange={handleChange} 
        />
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
        <button type="submit">Crear Usuario</button>
      </form>
    </div>
  );
}

export default PostUsuarios;