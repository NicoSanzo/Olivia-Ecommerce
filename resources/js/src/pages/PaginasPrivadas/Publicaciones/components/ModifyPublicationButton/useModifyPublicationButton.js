import { useState } from "react";
import {useQuery } from "@tanstack/react-query";

/**
 * Hook para manejar la eliminación de publicaciones con confirmación y feedback.
 * @param {MouseEvent} event - Abre el modal de modificacion de publicacion
 * @param {Object} props - Parámetros del hook.
 * @param {Function} props.ActualizarPublicaciones - Función que actualiza el listado de publicaciones después de modificar una.
 * @returns {Object} Funciones y estados para controlar el flujo de eliminación.
 * 
 */


export const useModifyPublicationButton = ({ActualizarPublicaciones}) => {

const [isModificationModalOpen, setIsModificationModalOpen] = useState(false);
const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false); 


  
  
/** Abre el modal de modificación.*/
const openModificationModal = (event) => {
  event.stopPropagation();
  setIsModificationModalOpen(true);
};

/** Cierra el modal de modificación.*/
const closeModificationModal = () => {
  setIsModificationModalOpen(false);
};

/** Abre el modal de éxito tras una acción completada. */
const openSuccessModal = () => {
  setIsSuccessModalOpen(true);
};

/**
 * Cierra el modal de éxito y actualiza las publicaciones visibles.
 */
const closeSuccessModal = () => {
  setIsSuccessModalOpen(false);
  ActualizarPublicaciones(true); 
};
  
    return {
      openModificationModal,
      closeModificationModal,
      isModificationModalOpen,
      openSuccessModal,
      closeSuccessModal,
      isSuccessModalOpen,
      }
  };