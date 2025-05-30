import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearch } from "../../../Context/searchContext";
import { fetchGenerico } from "../../../utils/fetchGenerico";

export function usePublicaciones() {
  const { inputOrder,setFoundData,searchData,setLoading, setError,} = useSearch();


  const { data,isLoading,error} = useQuery({
    queryKey: ['publicaciones', inputOrder, searchData],
    queryFn: () => fetchGenerico('/api/publicacion','POST', {inputOrder, searchData}),
    enabled: true, // se ejecuta al recargar el componente
  });


  useEffect(() => {
    setLoading(isLoading);

    if (data) {
      if (data.status === 'success') {
        setFoundData(data.publicaciones);
        setError(null);
      } else {
        setError(data.message || 'Error inesperado');
        setFoundData(null);
      }
    }

    if (error) {
      setError(error.message);
      setFoundData(null);
    }
  }, [data, error, isLoading]);

}