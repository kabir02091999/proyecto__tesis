import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/NotFound.css'; // opcional, si quieres darle estilos
import NavbarParroquia from '../components/inicio/NavbarParroquia';

function NotFound() {
    const navigate = useNavigate();

    return (
        <div><NavbarParroquia />
            <div className="not-found-container">

                <h1>Error 404</h1>
                <p>La página que intentas visitar no existe.</p>
                <button className="btn-inicio" onClick={() => navigate('/')}>
                    Ir al inicio
                </button>
            </div>
        </div>
    );
}

export default NotFound;