
import React from "react";
import "./ConfirmationModalStyle.css"; 

export const ConfirmationModal = ({ Abierto, Cerrado, onConfirm }) => {

  if (!Abierto) return null; 

  return (
    <div className="confirmation-modal-overlay">
      <div className="confirmation-modal">
        <h3>¿Estás seguro de que deseas marcar como entregado?</h3>
        <div className="confirmation-actions">
          <button className="Cancelar" onClick={Cerrado}>Cancelar</button>
          <button className="Confirmar"onClick={onConfirm}>Confirmar</button>
        </div>
      </div>
    </div>
  );
};