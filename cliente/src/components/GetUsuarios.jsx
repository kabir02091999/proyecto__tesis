import React, { useState, useEffect } from 'react';
// 💡 ASUME que tienes una función deleteUsuario en tu archivo api/auth
import { getUsuarios, deleteUsuario } from '../api/auth'; 
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

  // 💡 NUEVA FUNCIÓN PARA ELIMINAR USUARIO
  const handleDelete = async (userId, nombreCompleto) => {
    // 1. Mostrar la alerta de confirmación
    const isConfirmed = window.confirm(
      `¿Estás seguro de que quieres eliminar al usuario "${nombreCompleto}"? \n¡Esta acción es irreversible!`
    );

    // 2. Si el usuario confirma, proceder con la eliminación
    if (isConfirmed) {
      try {
        // 💡 Llama a la función de la API (DEBES CREARLA en '../api/auth')
        await deleteUsuario(userId); 

        // 3. Actualizar la lista de usuarios en el estado (sin recargar toda la página)
        setUsuarios(usuarios.filter(usuario => usuario.id !== userId));
        
        // Opcional: Mostrar una notificación de éxito
        alert(`Usuario ${nombreCompleto} eliminado con éxito.`); 

      } catch (err) {
        console.error('Error al eliminar usuario:', err);
        // Opcional: Mostrar una notificación de error
        alert('Error al eliminar el usuario. Intente de nuevo.');
      }
    }
  };

  return (
    <div className="usuarios-container">
      <h1>Lista de Usuarios</h1>
      {usuarios.length > 0 ? (
        <div className="card-grid">
          {usuarios.map((usuario) => (
            // Usamos el ID de MongoDB si existe (_id), o el ID normal
            <div key={usuario._id || usuario.id} className="user-card">
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
              
              {/* 💡 BOTÓN DE ELIMINAR */}
              <button 
                className="delete-button"
                // Pasamos el ID del usuario y el nombre completo
                onClick={() => handleDelete(usuario._id || usuario.id, `${usuario.nombre} ${usuario.apellido}`)}
              >
                Eliminar Usuario
              </button>

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