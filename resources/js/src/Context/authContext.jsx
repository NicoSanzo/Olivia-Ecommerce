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
    } else if (data?.error) {
      setAutenticado(false);
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