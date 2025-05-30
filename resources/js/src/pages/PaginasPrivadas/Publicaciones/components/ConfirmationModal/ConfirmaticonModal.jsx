
import React from "react";
import "./ConfirmationModalStyle.css"; 

export const ConfirmationModal = ({ Abierto, Cerrado, onConfirm, Leyenda }) => {

  if (!Abierto) return null; 

  return (
    <div className="confirmation-modal-overlay">
      <div className="confirmation-modal">
        <h3>{Leyenda}</h3>
        <div className="confirmation-actions">
          <button className="Cancelar" onClick={Cerrado}>Cancelar</button>
          <button className="Confirmar"onClick={onConfirm}>Confirmar</button>
        </div>
      </div>
    </div>
  );
};