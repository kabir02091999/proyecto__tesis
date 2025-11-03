import React, { useState, useEffect } from 'react';
import { getUsuarios, deleteUsuario } from '../api/auth';
import '../css/GetUsuario.css';

function GetUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [usuarioAEliminar, setUsuarioAEliminar] = useState(null);

    // ✅ Capitalizar primera letra
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

    // 💡 Mostrar modal
    const handleOpenModal = (usuario) => {
        setUsuarioAEliminar(usuario);
        setShowModal(true);
    };

    // 💡 Confirmar eliminación
    const handleConfirmDelete = async () => {
        if (!usuarioAEliminar) return;

        try {
            await deleteUsuario(usuarioAEliminar._id || usuarioAEliminar.id);
            setUsuarios(usuarios.filter(u => (u._id || u.id) !== (usuarioAEliminar._id || usuarioAEliminar.id)));
            alert(`✅ Usuario "${usuarioAEliminar.nombre} ${usuarioAEliminar.apellido}" eliminado correctamente.`);
        } catch (err) {
            console.error('Error al eliminar usuario:', err);
            alert('❌ Ocurrió un error al eliminar el usuario.');
        } finally {
            setShowModal(false);
            setUsuarioAEliminar(null);
        }
    };

    return (
        <div className="usuarios-container">
            <h1>👥 Gestión de Usuarios</h1>

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
                                        <strong>Rol:</strong>{' '}
                                        <span className={`user-role ${usuario.tipoUsuario}`}>
                                            {capitalize(usuario.tipoUsuario)}
                                        </span>
                                    </p>
                                </div>

                                <button
                                    className="delete-button"
                                    onClick={() => handleOpenModal(usuario)}
                                >
                                    🗑️ Eliminar
                                </button>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p className="no-users-message">No hay usuarios registrados.</p>
            )}

            {/* ✅ Modal de confirmación */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Confirmar Eliminación</h2>
                        <p>¿Seguro que deseas eliminar al usuario <strong>{usuarioAEliminar?.nombre} {usuarioAEliminar?.apellido}</strong>?</p>
                        <p className="modal-warning">Esta acción no se puede deshacer.</p>

                        <div className="modal-buttons">
                            <button className="confirm-button" onClick={handleConfirmDelete}>Sí, eliminar</button>
                            <button className="cancel-button" onClick={() => setShowModal(false)}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default GetUsuarios;
