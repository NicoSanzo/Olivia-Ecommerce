import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchGenerico } from "../../../utils/fetchGenerico";

export function UseProductoDetail() {
 
  const [dataPublicacion, setDataPublicacion] = useState(null);
  const [imagenes,setImagenes]=useState([])

  const urlActiva = new URLSearchParams (location.search)
  const itemKey =  urlActiva.get('ID');

  const {data, isLoading, error:fetchError }= useQuery({
    queryKey : ['detallePublicacion' , itemKey],
    queryFn: ()=> fetchGenerico('/api/detalle/' ,'POST' , {itemKey})
  })

     setTimeout(() => {
     window.scrollTo({ top: 0,behavior: 'smooth'});
  }, 0);

  useEffect(() => {
      if (data || fetchError) {
        if (data.status === 'success') {
            setDataPublicacion(data.publicacion);
            setImagenes(data.publicacion?.imagenes.map(imagen => ({
                publicacion_key: dataPublicacion?.publicacion?.id,
                id: imagen.id,
                src: imagen.image_url
            })));
        } else {
            setError(data.message || fetchError);
            setDataPublicacion(null);
        }
    }
  }, [data,isLoading,fetchError]);
         
  return {
    dataPublicacion,
    imagenes,
    isLoading
  };
    
}
