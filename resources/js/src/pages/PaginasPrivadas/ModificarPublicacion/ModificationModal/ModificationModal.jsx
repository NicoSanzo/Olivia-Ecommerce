import React from 'react';
import './ModificationModalStyle.css';


export const ModificationModal = ({isOpen ,children ,onClose}) => {


  if (!isOpen) return null;

  return (
    <div className="modal-mod" >
      <div className="mod-modal-content">
       
        <button className="close-button" onClick={onClose}>X</button>
          
        {children}
      </div>
    </div>
  );
};


