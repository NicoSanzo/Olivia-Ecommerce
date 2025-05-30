import { useEffect, useState } from "react";


import { useFetch } from "../../../hooks/PedidoFetchGenerico";
import { useSearch } from "../../../Context/searchContext";

export function usePublicaciones() {

// Estados globales utilizados en un contexto (Componente: SearchContext)
    const {
        inputOrder,
        setFoundData,
        searchData,
        setRealizarBusqueda,
        realizarBusqueda,
        setLoading,
        setError
      } = useSearch();

    const [triggerFetchPublicaciones,setTriggerFetchPublicaciones]=useState(true);
   
    const {data,loading,error:fetchError}= useFetch ('/api/publicacion', 'POST', {inputOrder,searchData}, triggerFetchPublicaciones)

    useEffect(() => {  
        if(realizarBusqueda===true){
            setTriggerFetchPublicaciones(true);   
        }     
    }, [realizarBusqueda]);
    
    
    useEffect(() => {
        setLoading(loading);
        setRealizarBusqueda(false)

        if (data || fetchError) {
            if (data?.status === 'success') {
                setFoundData(data.publicaciones);
                
            } else {
                setError(data?.message || fetchError);
                setFoundData(null);
            }
            setTriggerFetchPublicaciones(false);
        }
        
    }, [data, loading, fetchError]);


}