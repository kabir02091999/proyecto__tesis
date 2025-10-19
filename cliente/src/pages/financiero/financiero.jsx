
import React, { useEffect, useState } from 'react';
import { AseAuth } from '../../context/AuthContext';
import { getUsuarios } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import Nav_Finanzas from '../../components/financiero/Nav_Finanzas';

function Financiero() {
  const { isAuthenticated, loading } = AseAuth();
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchUsuarios = async () => {
      try {
        const response = await getUsuarios();
        setUsuarios(response.data);
      } catch (err) {
        console.error('Error al obtener usuarios:', err);
        setError('No se pudo obtener la lista de usuarios. Intente de nuevo más tarde.');
      }
    };

    fetchUsuarios();
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="admin-layout">
      <Nav_Finanzas/>
      <div className="admin-content-main">
        <h1>Bienvenido al Panel de Finanzas</h1>
      </div>
    </div>
  );
}

export default Financiero;


{/* <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Página de Finanzas</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div >
        {usuarios.length > 0 ? (
          usuarios.map((usuario) => (
            <div key={usuario.id} className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold">{usuario.nombreUsuario}</h2>
              <p className="text-gray-600">{usuario.email}</p>
              <p className="text-sm text-gray-400">Tipo: {usuario.tipoUsuario}</p>
            </div>
          ))
        ) : (
          <p>No hay usuarios para mostrar.</p>
        )}
      </div>
    </div> */}