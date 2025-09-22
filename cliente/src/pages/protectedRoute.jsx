import { Outlet, Navigate } from 'react-router-dom';
import { AseAuth } from '../context/AuthContext';

function ProtectedRoute() {
    // Usamos AseAuth para obtener el estado de autenticación
    const { isAuthenticated, loading } = AseAuth();

    // Si el usuario no está autenticado, lo redirigimos a la página de login
    //if (!isAuthenticated) return <Navigate to='/login' replace />;
    
    // Si el usuario está autenticado, renderizamos la ruta hija
    return <Outlet />;
}

export default ProtectedRoute;