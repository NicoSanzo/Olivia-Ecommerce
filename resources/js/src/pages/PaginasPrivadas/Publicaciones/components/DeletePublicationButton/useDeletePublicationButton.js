import { useEffect, useState } from "react";
import { useFetch } from "../../../../../hooks/PedidoFetchGenerico";

/**
 * Hook para manejar la eliminación de publicaciones con confirmación y feedback.
 * @param {MouseEvent} event - Abre el modal de confirmacion para la eliminacion de publicacion 
 * @param {Object} props - Parámetros del hook.
 * @param {Function} props.ActualizarPublicaciones - Función que actualiza el listado de publicaciones después de eliminar una.
 * @param {number} props.itemKey - Identificador único de la publicación a eliminar.
 * @returns {Object} Funciones y estados para controlar el flujo de eliminación.
 */

export const useDeletePublicationButton = ({ ActualizarPublicaciones, itemKey }) => {

  const [deleteTrigger, setDeleteTrigger] = useState(false);
  const [isConfirmationDeleteModalOpen, SetIsConfirmationDeleteModalOpen] = useState(false);
  const [isSuccessDeleteOpenModal, SetisSuccessDeleteOpenModal] = useState(false);

  /** Abre el modal de confirmación de eliminación */
  const ModalDeEliminacion = () => {
    SetIsConfirmationDeleteModalOpen(true);
  };

  /** Confirma la eliminación y dispara la petición al backend */
  const ConfirmarEliminacion = () => {
    SetIsConfirmationDeleteModalOpen(false);
    setDeleteTrigger(true);
  };

  /** Cierra el modal de éxito al eliminar y actualiza las publicaciones */
  const closeSuccessDeleteModal = () => {
    SetisSuccessDeleteOpenModal(false);
    ActualizarPublicaciones(true);
  };

  const { data: delete_data, loading: delete_loading, error: delete_error } = useFetch(
    '/api/baja_publicaciones.php',
    'POST',
    { itemKey },
    deleteTrigger
  );

  useEffect(() => {
    if (delete_data?.success === true) {
      setDeleteTrigger(false);
      SetisSuccessDeleteOpenModal(true);
    }
  }, [delete_data, delete_error]);

  return {
    ModalDeEliminacion,
    ConfirmarEliminacion,
    isSuccessDeleteOpenModal,
    isConfirmationDeleteModalOpen,
    SetIsConfirmationDeleteModalOpen,
    closeSuccessDeleteModal,
    SetisSuccessDeleteOpenModal,
  };
};