import { useEffect, useState } from "react"
import { useFetch } from "../../../../../hooks/PedidoFetchGenerico";


/**
 * Hook para manejar las publicaciones con confirmación y feedback.
 * @param {MouseEvent} event - Abre el modal de confirmacion de activacion de una publicacion 
 * @param {Object} props - Parámetros del hook.
 * @param {Function} props.ActualizarPublicaciones - Función que actualiza el listado de publicaciones después de activar una.
 * @param {number} props.itemKey - Identificador único de la publicación a reactivar.
 * @returns {Object} Funciones y estados para controlar el flujo de activacion de un publicación.
 */

export function useActivePublicationButton({itemKey,ActualizarPublicaciones}) {


const [abrirModalActivacion, setAbrirModalActivar] = useState(false);
const [activeTrigger, setActiveTrigger]= useState(false);
const [modalActivarExitoso,setModalActivarExitoso]=useState(false);

/** Controla la apertura del modal de confirmación de Activar publicación */
const funcionAbrirModaldeActivacion = (event) => {
    event.stopPropagation()
    setAbrirModalActivar(true)
};

/** Controla el cierre del modal de confirmacion de activación al seleccionar "cancelar" */
const funcionCancelarActivar = () => {
    setAbrirModalActivar(false)
};


/**  Controla trigger para ejecutar la query de php */
const activarPublicacion = () =>{
    setActiveTrigger(true);
    setAbrirModalActivar(false);
}

/** Controla el cierre del modal de tarea exitosa al seleccionar "OK" */
const cerrarActivacionExitoso = () => {
    setModalActivarExitoso(false);
    ActualizarPublicaciones(true)
  };


const {data, loading, error}=useFetch('/api/activar_publicacion.php','POST',{itemKey},activeTrigger);

useEffect(() => {
   
    if (data?.success === true ) {       
        setActiveTrigger(false);
        setModalActivarExitoso(true);
    }  
}, [data,error]);


    return {
        funcionAbrirModaldeActivacion,
        abrirModalActivacion,
        funcionCancelarActivar,
        activarPublicacion,
        modalActivarExitoso,
        cerrarActivacionExitoso
        }
}
