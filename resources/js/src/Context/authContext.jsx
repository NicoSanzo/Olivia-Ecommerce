import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchGenerico } from '../utils/fetchGenerico';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [autenticado, setAutenticado] = useState(false);
  const [publicData, setPublicData] = useState(null);
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
      setPublicData(queryClient.getQueryData(['session']).user);
      setAutenticado(true);
    } else if (data?.error) {
      setAutenticado(false);
      setPublicData(null);
    }
  }, [data]);


  // Mutación para logout (React Query v5)
  const logoutMutation = useMutation({
    mutationFn: () => fetchGenerico('/api/Logout', 'POST'),
    onSuccess: () => {
      queryClient.removeQueries(['session']);
      setAutenticado(false);
      setPublicData(null);
      navigate('/login');
    },
    onError: (error) => {
      console.error('Error al cerrar sesión:', error);
      setAutenticado(false);
      setPublicData(null);
      navigate('/login');
    }
  });


  const logout = () => {
    logoutMutation.mutate();
  };

  return (
    <AuthContext.Provider value={{ autenticado, logout, publicData, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);