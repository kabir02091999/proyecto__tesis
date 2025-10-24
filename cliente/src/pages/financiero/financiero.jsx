
import React, { useEffect, useState } from 'react';
import { AseAuth } from '../../context/AuthContext';
import { getUsuarios } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import Nav_Finanzas from '../../components/financiero/Nav_Finanzas';


import EventCalendar from '../../components/calendario';

import '../../css/Poblacion_Lapso.css'; 
import '../../css/imprimir.css';
import '../../css/Calendario_Estilos.css';


function Financiero() {
  const { isAuthenticated, loading ,calendario, Getcalendario} = AseAuth();
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


    Getcalendario();
    fetchUsuarios();
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="admin-layout">
      <Nav_Finanzas/>
      <div className="admin-content-main">
          <div className="calendar-view">
            <h1>Calendario liturgico</h1> 
              <EventCalendar calendario={calendario} /> 
          </div>
        </div>
    </div>
  );
}

export default Financiero;
