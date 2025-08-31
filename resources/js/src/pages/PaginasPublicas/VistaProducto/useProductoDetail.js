import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { fetchGenerico } from "../../../utils/fetchGenerico";

export function UseProductoDetail() {
 
  const [dataPublicacion, setDataPublicacion] = useState(null);
  const [imagenes,setImagenes]=useState([])

  const urlActiva = new URLSearchParams (location.search)
  const itemKey =  urlActiva.get('ID');

const detalleMutation = useMutation({ 
    mutationKey:['detallePublicacion'],
    mutationFn: ()=>fetchGenerico('/api/detalle/' ,'POST' , {itemKey}),
    onSuccess: (data) => {   
      if(data.status==="success")
      {
         setDataPublicacion(normalizarDatos(data.publicacion));
            setImagenes(data.publicacion?.imagenes.map(imagen => ({
                publicacion_key: dataPublicacion?.publicacion?.id,
                id: imagen.id,
                src: imagen.image_url
            })));
      }
    },
    onError:(error)=>{
      setError(error);
      setDataPublicacion(null);
    }  
})

    useEffect(() => {
  detalleMutation.mutate({ itemKey }); 
}, []); 
  

  setTimeout(() => {
     window.scrollTo({ top: 0,behavior: 'smooth'});
  }, 0);



  const normalizarDatos = (publicacion) => {
            
          const datosNormalizados = {
            id: publicacion.id,
            titulo: publicacion.titulo,
            precio: publicacion.precio,
            stock: publicacion.stock,
            eliminada: publicacion.deleted,
            imagen:publicacion.imagenes[0].image_url,
            pausada: publicacion.paused,
            alto: publicacion.producto.alto,
            ancho:publicacion.producto.ancho,
            ancho:publicacion.producto.profundidad,
            peso:publicacion.producto.peso,
            color:publicacion.producto.color,
            modelo:publicacion.producto.modelo,
            marca:publicacion.producto.marca.nombre,
            categoria:publicacion.producto.categoria.nombre,
            codigoProducto:publicacion.producto.codigo
          };      

          return datosNormalizados
    };


         
  return {
    dataPublicacion,
    imagenes,
    detalleMutation
    
  };
    
}
