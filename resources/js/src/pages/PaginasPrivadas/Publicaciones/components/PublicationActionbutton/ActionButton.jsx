import { Tooltip } from "../../../../../components/GenericTooltip/Tooltip";
import "./ActionButtonStyle.css"
import { ConfirmationModal } from "../ConfirmationModal/ConfirmaticonModal";
import { GenericExitoso } from "../../../../../components/GenericExitoso/GenericExitoso";
import { useAccionButton } from "./useActionButton";


export const ActionButton = ({ActualizarPublicaciones,endpoint,label,className}) => {


const { AccionModal,
    ConfirmarAccion,
    isSuccessOpenModal,
    isConfirmationModalOpen,
    SetsConfirmationModalOpen,
    CloseAccionModal,
    } = useAccionButton({ActualizarPublicaciones,endpoint})

return(

    <>
       <div className="container-action-button" onClick={(e) => e.stopPropagation()}>
          <button type="button" className={`action-button ${className}`} onClick={AccionModal}> 
              <Tooltip descripcion={label}/>    
          </button> 

          <ConfirmationModal
              Abierto={isConfirmationModalOpen}
              Cerrado={() => SetsConfirmationModalOpen(false)}
              onConfirm={ConfirmarAccion}
              Leyenda= {`¿Estás seguro de que deseas ${label} esta publicación?`}
          />
          <GenericExitoso isSuccess={isSuccessOpenModal} onClose={CloseAccionModal} Leyenda={"¡Realizado con éxito!"} />

        </div>
    
    </>
    )
};