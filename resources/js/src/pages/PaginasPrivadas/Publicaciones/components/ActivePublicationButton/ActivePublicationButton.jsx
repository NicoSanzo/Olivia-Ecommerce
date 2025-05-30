import "./ActivePublicationButtonStyle.css";
import { Tooltip } from "../../../../../components/GenericTooltip/Tooltip";
import { ConfirmationModal } from "../ConfirmationModal/ConfirmaticonModal";
import { GenericExitoso } from "../../../../../components/GenericExitoso/GenericExitoso";
import { useActivePublicationButton } from "./useActivePublicationButton";

export function ActivePublicationButton({itemKey,ActualizarPublicaciones}) {


    const { funcionAbrirModaldeActivacion,
        abrirModalActivacion,
        funcionCancelarActivar,
        activarPublicacion,
        modalActivarExitoso,
        cerrarActivacionExitoso}= useActivePublicationButton({itemKey,ActualizarPublicaciones})


    return (  
           <>
              <div className="container-active-button" onClick={(e) => e.stopPropagation()}>
                 <button type="button" className="active-button" onClick={funcionAbrirModaldeActivacion}> 
                     <Tooltip descripcion="Activar"/>    
                 </button> 
                
                 <ConfirmationModal
                     Abierto={abrirModalActivacion}
                     Cerrado={funcionCancelarActivar} 
                     onConfirm={activarPublicacion} 
                     Leyenda= "¿Estás seguro de que deseas reactivar esta publicación?"
                 />
                {<GenericExitoso isSuccess={modalActivarExitoso} onClose={cerrarActivacionExitoso} Leyenda={"¡Publicación reactivada con éxito!"} />}              
               </div>       
           </>
    )
}
