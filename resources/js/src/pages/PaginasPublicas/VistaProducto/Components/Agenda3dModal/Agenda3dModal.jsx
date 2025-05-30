import React, { useState } from 'react';
import './Agenda3dModalStyle.css';


export const Agenda3dModal = ({isOpen ,children ,onClose}) => {


  if (!isOpen) return null;




  return (
    <div className="modal-mod">
      <div className="mod-modal-content">
       
        <button className="close-button" onClick={onClose}>X</button>
          
        {children}
      </div>
    </div>
  );
};


