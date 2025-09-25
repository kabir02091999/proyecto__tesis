// Código para PostUsuarios.jsx
import React, { useState } from 'react';
import { createUsuario } from '../api/auth';
import '../css/PostUsuarios.css';

// 1. Acepta 'props' como argumento
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
        console.log("Datos del formulario enviados:", formData);
        createUsuario(formData);
    };

    // 2. Aplica 'props.className' al div principal
    return (
        <div className={`usuarios-form-container ${props.className || ''}`}>
            <form className="usuarios-form" onSubmit={handleSubmit}>
                <h2>Crear Usuario</h2>
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