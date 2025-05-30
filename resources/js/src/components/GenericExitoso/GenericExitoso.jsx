import React, { useEffect, useState } from 'react';
import './GenericExitosoStyle.css';


export function GenericExitoso({ isSuccess, onClose, Leyenda }) {
  
  const [visible, setVisible] = useState(false);
  

  useEffect(() => {
    if (isSuccess==true) {
      setTimeout(() => {
        setVisible(true);
      }, 200);
    }
  }, [isSuccess]);

  const handleClose = () => {
    
    setVisible(false);
    onClose(); 
  };

  if (!isSuccess) return null;

  return (

<div className={`container-opaco ${visible ? 'visible' : 'hidden'}`}>
    <div className={`success-container ${visible ? 'visible' : ''}`}>
      <div className='success-logo-container'></div>
      <p className='text-success-container'>{Leyenda}</p>
      <div className='button-container'>
        <button className="close-button-success" onClick={handleClose}>OK</button>
      </div>
    </div>
</div>
  );
}