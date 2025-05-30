import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/PedidoFetchGenerico';


const AuthContext = createContext();

export const AuthProvider = ({ children , initialUser }) => {
    const [autenticado, setAutenticado] = useState(false);
    const [checkSession,setCheckSession]=useState(true);
    const [closeSession,setCloseSession]=useState(false);
    const [publicData, setPublicData] = useState(null);

    const navigate = useNavigate();

    // Verifica la session en PHP
    const { data, loading, error } = useFetch('/api/perfil', 'POST', null, checkSession); // el doble signo devuelve el valor segun si existe o no un valor,
    
    //console.log(data)
    
    // Efecto para verificar la autenticación basado en el token

    useEffect(() => {  
   
        if(data?.status==='success'){
            
            setPublicData(data.user);
            setAutenticado(true);
        }
         if (data?.error) {
             //alert('Tu sesión ha expirado. Redirigiendo al inicio.'); 
             localStorage.clear();  
             setAutenticado(false); 
         }
        setCheckSession(false)
    }, [data,error]);


     const { data:dataClose,loading:loadingError, error:closeError } = useFetch('/api/Logout', 'POST', null, false); 



    const logout = () => {
        setAutenticado(false);
        setCloseSession(true)
        localStorage.clear();   
    };

    useEffect(() => {
        if(dataClose){
        setCloseSession(false)   
        }
    }, [dataClose]);




    return (
        <AuthContext.Provider value={{ autenticado, logout, publicData,setCheckSession, loading}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);