import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Context/authContext';
import { LoadingComponente } from '../components/GenericLoadingComponent/LoadingComponent';


export const PrivateRouteAdmin = () => {
  const { userPublicData, autenticado, loading } = useAuth();

  // Mientras no sabemos si está autenticado, mostramos loader
  if (!sessionStorage.getItem('autenticado')=== 'true') {
    // Si NO está autenticado, lo mandamos al login
    return <Navigate to="/home" replace />;
  }
 
  // Solo si es admin y está autenticado
  if (sessionStorage.getItem('autenticado')=== 'true' && sessionStorage.getItem('usuario') === "Admin") {
    return <Outlet />;
  }

  // Si ya sabemos que NO está autenticado o no es admin
  
  return <Navigate to="/home" replace />;
};