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

  const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal
  const [isSubmitting, setIsSubmitting] = useState(false); // Evita doble envío

  // Manejo del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Al presionar el botón, muestra el modal en lugar de enviar directamente
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  // Confirmar envío al backend
  const handleConfirmSubmit = async () => {
    setIsSubmitting(true);
    try {
      await createUsuario(formData);
      setFormData({
        nombre: '',
        apellido: '',
        email: '',
        contrasena: '',
        tipoUsuario: 'administrador',
      });
      setShowModal(false);
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      alert('❌ Error al crear el usuario');
    } finally {
      setIsSubmitting(false);
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

        <button type="submit" className="btn-submit">
          ✅ Crear Usuario
        </button>
      </form>

      {/* === Modal de Confirmación === */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // evita cerrar al hacer clic dentro
          >
            <h3>Confirmar Envío</h3>
            <p>¿Deseas crear este usuario ?</p>
            <ul>
              <li><strong>Nombre:</strong> {formData.nombre}</li>
              <li><strong>Apellido:</strong> {formData.apellido}</li>
              <li><strong>Email:</strong> {formData.email}</li>
              <li><strong>Tipo:</strong> {formData.tipoUsuario}</li>
            </ul>

            <div className="modal-buttons">
              <button
                className="btn-confirmar"
                onClick={handleConfirmSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : 'Confirmar'}
              </button>
              <button
                className="btn-cerrar"
                onClick={() => setShowModal(false)}
                disabled={isSubmitting}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostUsuarios;

