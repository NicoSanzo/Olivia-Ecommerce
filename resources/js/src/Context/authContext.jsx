import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchGenerico } from '../utils/fetchGenerico';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [autenticado, setAutenticado] = useState(null);
  const [userPublicData, setUserPublicData] = useState(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();


  // Consulta para verificar sesión activa
  const { data, isLoading: loading } = useQuery({
    queryKey: ['session'],
    queryFn: () => fetchGenerico('/api/perfil', 'POST'),
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    retry: false,
  });

  
  useEffect(() => {
    if (data?.status === 'success') {
      setUserPublicData(data.user);
      setAutenticado(true);
      sessionStorage.setItem('autenticado',true);
      sessionStorage.setItem('usuario',data.user.tipo_usuario);
    } else if (data?.error) {
      setAutenticado(false);
      queryClient.removeQueries(['session']);
      setUserPublicData(null);
    }
  }, [data]);


  // Mutación para logout (React Query v5)
  const logoutMutation = useMutation({
    mutationFn: () => fetchGenerico('/api/Logout', 'POST'),
    onSuccess: () => {
      queryClient.removeQueries(['session']);
      setAutenticado(false);
      setUserPublicData(null);
      navigate('/login');
      sessionStorage.removeItem('autenticado');
      sessionStorage.removeItem('usuario');
    },
    onError: (error) => {
      console.error('Error al cerrar sesión:', error);
      setAutenticado(false);
      setUserPublicData(null);
      navigate('/login');
     
    }
  });


  const logout = () => {
    logoutMutation.mutate();
  };

  return (
    <AuthContext.Provider value={{ autenticado, logout, userPublicData, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);