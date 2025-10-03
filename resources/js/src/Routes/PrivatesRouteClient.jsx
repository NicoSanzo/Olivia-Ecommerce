import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Context/authContext';
import { LoadingComponente } from '../components/GenericLoadingComponent/LoadingComponent';

export const PrivateRouteClient = () => {

  const { userPublicData, autenticado, loading } = useAuth();

  // Mientras no sabemos si está autenticado, mostramos loader
  if (userPublicData === null || loading) {
    return <LoadingComponente height={50} width={50}/>
  }

  if (!autenticado) {
    // Si NO está autenticado, lo mandamos al login
    return <Navigate to="/home" replace />;
  }
 
  // Solo si es admin y está autenticado
  if (autenticado && userPublicData?.tipo_usuario === "Cliente") {
    return <Outlet />;
  }

  // Si ya sabemos que NO está autenticado o no es admin
  
  return <Navigate to="/home" replace />;
};


