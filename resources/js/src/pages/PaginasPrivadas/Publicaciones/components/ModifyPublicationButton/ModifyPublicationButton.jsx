import { GenericExitoso } from "../../../../../components/GenericExitoso/GenericExitoso";
import { Tooltip } from "../../../../../components/GenericTooltip/Tooltip";
import { ModificarPublicacion } from "../../../ModificarPublicacion/ModificarPublicacion";
import { ModificationModal } from "../../../ModificarPublicacion/ModificationModal/ModificationModal";
import { useModifyPublicationButton } from "./useModifyPublicationButton";
import "./ModifyPublicationButtonStyle.css"


export const ModifyPublicationButton = ({itemKey,ActualizarPublicaciones}) => {


const { openModificationModal,
    closeModificationModal,
    isModificationModalOpen,
    openSuccessModal,
    closeSuccessModal,
    isSuccessModalOpen,
    } = useModifyPublicationButton({ActualizarPublicaciones})
    

return(

    <>
        <div className="container-modify-button"  onClick={(e) => e.stopPropagation()}  >
            <button type="button" className="modify-button" onClick={openModificationModal}> 
                <Tooltip descripcion="Editar"/>  
            
            </button>   
            <ModificationModal isOpen={isModificationModalOpen} onClose={closeModificationModal} onClick={(e) => e.stopPropagation()} >
                    <ModificarPublicacion itemKey={itemKey} onClose={closeModificationModal} onSuccess={openSuccessModal} />
            </ModificationModal>

            <GenericExitoso isSuccess={isSuccessModalOpen} onClose={closeSuccessModal} Leyenda={"¡Producto Modificado Con Exito!"} /> 
        </div>
    
    </>
    )
};
