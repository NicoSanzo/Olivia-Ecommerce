import { usePausePublicationButton } from "./usePausePublicationButton";
import "./PausePublicationButtonStyle.css";
import { Tooltip } from "../../../../../components/GenericTooltip/Tooltip";
import { ConfirmationModal } from "../ConfirmationModal/ConfirmaticonModal";
import { GenericExitoso } from "../../../../../components/GenericExitoso/GenericExitoso";

export function PausePublicationButton({itemKey,ActualizarPublicaciones}) {


    const {funcionAbrirModaldePausa,
            abrirModalPausa,
            funcionCancelarPausado,
            PausarPublicacion,
            modalPausadoExitoso,
            closePausarExitoso}= usePausePublicationButton({itemKey,ActualizarPublicaciones})


    return (
       
           <>
              <div className="container-pausar-button" onClick={(e) => e.stopPropagation()}>
                 <button type="button" className="pausar-button" onClick={funcionAbrirModaldePausa}> 
                     <Tooltip descripcion="Pausar"/>    
                 </button> 
                
                 <ConfirmationModal
                     Abierto={abrirModalPausa}
                     Cerrado={funcionCancelarPausado} 
                     onConfirm={PausarPublicacion} 
                     Leyenda= "¿Estás seguro de que deseas pausar esta publicación?"
                 />
                {<GenericExitoso isSuccess={modalPausadoExitoso} onClose={closePausarExitoso} Leyenda={"¡Publicación pausada con éxito!"} />}              
               </div>       
           </>
    )
}
