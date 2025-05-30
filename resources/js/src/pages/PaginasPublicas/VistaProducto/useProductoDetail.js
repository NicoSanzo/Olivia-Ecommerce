import { useEffect, useState } from "react";
import { useFetch } from "../../../hooks/PedidoFetchGenerico";

export function UseProductoDetail() {
 
    const [triggerFetch, setTriggerFetch] = useState(false);
    const [dataPublicacion, setDataPublicacion] = useState(null);
    const [imagenes,setImagenes]=useState([])

    const urlActiva = new URLSearchParams (location.search)
    const itemKey =  urlActiva.get('ID');
    const {data, loading, error:fetchError } = useFetch("/api/detalle","POST",{itemKey} ,triggerFetch);


      useEffect(() => {
        setTriggerFetch(true)
      }, []);

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
          setTriggerFetch(false);
      }

      }, [data,loading,fetchError]);
         
      return {
        dataPublicacion,
        imagenes,
        loading
      };
    
}
