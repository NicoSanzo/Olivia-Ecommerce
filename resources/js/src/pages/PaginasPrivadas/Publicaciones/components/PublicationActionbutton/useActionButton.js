import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { fetchGenerico } from "../../../../../utils/fetchGenerico";

/**
 * Hook para manejar la eliminación de publicaciones con confirmación y feedback.
 * @param {MouseEvent} event - Abre el modal de confirmacion para la eliminacion de publicacion 
 * @param {Object} props - Parámetros del hook.
 * @param {Function} props.ActualizarPublicaciones - Función que actualiza el listado de publicaciones después de eliminar una.
 * @param {number} props.itemKey - Identificador único de la publicación a eliminar.
 * @returns {Object} Funciones y estados para controlar el flujo de eliminación.
 */

export const useAccionButton = ({ ActualizarPublicaciones,endpoint }) => {

  const [isConfirmationModalOpen, SetsConfirmationModalOpen] = useState(false);
  const [isSuccessOpenModal, SetisSuccessOpenModal] = useState(false);


  const deleteMutation = useMutation({
    mutationFn: () => fetchGenerico(endpoint, "POST"),
    onSuccess: () => {
      SetisSuccessOpenModal(true);
    },
    onError: (error) => {
      console.error("Error al eliminar publicación:", error);
    },
  });

    /** Abre el modal de confirmación de eliminación */
  const AccionModal = () => {
    SetsConfirmationModalOpen(true);
  };

  /** Confirma la eliminación y dispara la petición al backend */
  const ConfirmarAccion = () => {
    SetsConfirmationModalOpen(false);
    deleteMutation.mutate();
  };

  /** Cierra el modal de éxito al eliminar y actualiza las publicaciones */
  const CloseAccionModal = () => {
     ActualizarPublicaciones(); // Llama a la función pasada por props
  };


  return {
    AccionModal,
    ConfirmarAccion,
    isSuccessOpenModal,
    isConfirmationModalOpen,
    SetsConfirmationModalOpen,
    CloseAccionModal,
    SetisSuccessOpenModal,
  };
};