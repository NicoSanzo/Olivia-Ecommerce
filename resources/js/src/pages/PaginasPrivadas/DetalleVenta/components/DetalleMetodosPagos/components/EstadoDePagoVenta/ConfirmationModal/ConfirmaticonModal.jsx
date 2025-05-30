
import React from "react";
import "./ConfirmationModalStyle.css"; 

export const ConfirmationModal = ({ Abierto, Cerrado, onConfirm }) => {

  if (!Abierto) return null; 

  return (
    <div className="confirmation-modal-overlay">
      <div className="confirmation-modal">
        <h3>¿Está seguro de que desea validar el comprobante y aprobar el pago?</h3>
        <div className="confirmation-actions">
          <button className="Cancelar" onClick={Cerrado}>Cancelar</button>
          <button className="Confirmar"onClick={onConfirm}>Confirmar</button>
        </div>
      </div>
    </div>
  );
};