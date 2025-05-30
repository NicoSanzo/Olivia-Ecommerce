import { useEffect, useState } from "react"
import { useFetch } from "../../../../../hooks/PedidoFetchGenerico";


/**
 * Hook para manejar las publicaciones con confirmación y feedback.
 * @param {MouseEvent} event - Abre el modal de confirmacion de pausa de publicacion 
 * @param {Object} props - Parámetros del hook.
 * @param {Function} props.ActualizarPublicaciones - Función que actualiza el listado de publicaciones después de pausar una.
 * @param {number} props.itemKey - Identificador único de la publicación a pausar.
 * @returns {Object} Funciones y estados para controlar el flujo de pausado.
 */

export function usePausePublicationButton({itemKey,ActualizarPublicaciones}) {
    


const [abrirModalPausa, setAbrirModalPausado] = useState(false);
const [pauseTrigger, setPauseTrigger]= useState(false);
const [modalPausadoExitoso,setModalPausadoExitoso]=useState(false);

/** Controla la apertura del modal de confirmación de pausado */
const funcionAbrirModaldePausa = (event) => {
    event.stopPropagation()
    setAbrirModalPausado(true)
};

/**Controla el cierre del modal de confirmacion del pausado al seleccionar "cancelar"*/
const funcionCancelarPausado = () => {
    setAbrirModalPausado(false)
};

/**  Controla trigger para ejecutar la query de php*/
const PausarPublicacion = () =>{
    setPauseTrigger(true);
    setAbrirModalPausado(false);
}

/** Controla el cierre del modal de tarea exitosa al seleccionar "OK" */
const closePausarExitoso = () => {
    setModalPausadoExitoso(false);
    ActualizarPublicaciones(true)
};


const {data, loading, error}=useFetch('/api/PausarPublicaciones.php','POST',{itemKey},pauseTrigger);

useEffect(() => {
   
    if (data?.success === true ) {       
        setPauseTrigger(false);
        setModalPausadoExitoso(true);
    }  
}, [data,error]);


    return {
        funcionAbrirModaldePausa,
        abrirModalPausa,
        setAbrirModalPausado,
        funcionCancelarPausado,
        PausarPublicacion,
        modalPausadoExitoso,
        setModalPausadoExitoso,
        closePausarExitoso
        }
}
