import { Tooltip } from "../../../../../components/GenericTooltip/Tooltip";
import { useDeletePublicationButton } from "./useDeletePublicationButton";
import "./DeletePublicationButtonStyle.css"
import { ConfirmationModal } from "../ConfirmationModal/ConfirmaticonModal";
import { GenericExitoso } from "../../../../../components/GenericExitoso/GenericExitoso";


export const DeletePublicationButton = ({itemKey,ActualizarPublicaciones}) => {


const { ModalDeEliminacion,
    ConfirmarEliminacion,
    isSuccessDeleteOpenModal,
    isConfirmationDeleteModalOpen,
    closeSuccessDeleteModal,
    SetIsConfirmationDeleteModalOpen
    } = useDeletePublicationButton({ActualizarPublicaciones,itemKey})

return(

    <>
       <div className="container-delete-button" onClick={(e) => e.stopPropagation()}>
          <button type="button" className="delete-button" onClick={ModalDeEliminacion}> 
              <Tooltip descripcion="Eliminar"/>    
          </button> 

          <ConfirmationModal
              Abierto={isConfirmationDeleteModalOpen}
              Cerrado={() => SetIsConfirmationDeleteModalOpen(false)} 
              onConfirm={ConfirmarEliminacion} 
              Leyenda= "¿Estás seguro de que deseas eliminar esta publicación?"
          />
          <GenericExitoso isSuccess={isSuccessDeleteOpenModal} onClose={closeSuccessDeleteModal} Leyenda={"¡Publicación eliminada con éxito!"} /> 

        </div>
    
    </>
    )
};
