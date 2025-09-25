import React, { useState, useEffect } from 'react';
import { getUsuarios } from '../api/auth';
import '../css/GetUsuario.css'; // Importa el archivo CSS

function GetUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  
  const fetchUsuarios = async () => {
    try {
      const response = await getUsuarios();
      setUsuarios(response.data);
    } catch (err) {
      console.error('Error al obtener usuarios:', err);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <div className="usuarios-container">
      <h1>Lista de Usuarios</h1>
      {usuarios.length > 0 ? (
        <div className="card-grid">
          {usuarios.map((usuario) => (
            <div key={usuario.id} className="user-card">
              <div className="user-info">
                <h3>{usuario.nombre} {usuario.apellido}</h3>
                <p><strong>Email:</strong> {usuario.email}</p>
                <p>
                  <strong>Tipo:</strong> 
                  <span className={`user-role ${usuario.tipoUsuario}`}>
                    {usuario.tipoUsuario}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-users-message">No se encontraron usuarios.</p>
      )}
    </div>
  );
}

export default GetUsuarios;