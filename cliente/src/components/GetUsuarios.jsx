import React, { useState, useEffect } from 'react';
import { getUsuarios, deleteUsuario } from '../api/auth';
import '../css/GetUsuario.css'; // Importa el archivo CSS

function GetUsuarios() {
    const [usuarios, setUsuarios] = useState([]);

    // ✅ Función para capitalizar la primera letra
    const capitalize = (text) => {
        if (!text) return '';
        return text
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

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

    // 💡 Función para eliminar usuario
    const handleDelete = async (userId, nombreCompleto) => {
        const isConfirmed = window.confirm(
            `¿Estás seguro de que quieres eliminar al usuario "${nombreCompleto}"?\n¡Esta acción es irreversible!`
        );

        if (isConfirmed) {
            try {
                await deleteUsuario(userId);
                setUsuarios(usuarios.filter(usuario => usuario.id !== userId));
                alert(`Usuario ${nombreCompleto} eliminado con éxito.`);
            } catch (err) {
                console.error('Error al eliminar usuario:', err);
                alert('Error al eliminar el usuario. Intente de nuevo.');
            }
        }
    };

    return (
        <div className="usuarios-container">
            <h1>Lista de Usuarios</h1>

            {usuarios.length > 0 ? (
                <div className="card-grid">
                    {usuarios.map((usuario) => {
                        const nombre = capitalize(usuario.nombre);
                        const apellido = capitalize(usuario.apellido);
                        const nombreCompleto = `${nombre} ${apellido}`;

                        return (
                            <div key={usuario._id || usuario.id} className="user-card">
                                <div className="user-info">
                                    <h3>{nombre} {apellido}</h3>
                                    <p><strong>Email:</strong> {usuario.email}</p>
                                    <p>
                                        <strong>Tipo:</strong>{' '}
                                        <span className={`user-role ${usuario.tipoUsuario}`}>
                                            {usuario.tipoUsuario}
                                        </span>
                                    </p>
                                </div>

                                <button
                                    className="delete-button"
                                    onClick={() => handleDelete(usuario._id || usuario.id, nombreCompleto)}
                                >
                                    Eliminar Usuario
                                </button>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p className="no-users-message">No se encontraron usuarios.</p>
            )}
        </div>
    );
}

export default GetUsuarios;
