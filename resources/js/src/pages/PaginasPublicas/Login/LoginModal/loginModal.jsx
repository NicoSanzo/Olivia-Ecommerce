import React, { useEffect, useRef, useState } from 'react';
import { Login } from '../Login';
import { useLoginModal } from '../../../../Context/LoginPopContext';
import './loginModelStyle.css';
import {Registrarse} from '../../../PaginasPublicas/Login/Registro/Registrarse'


export const LoginModal = () => {
  const modalContent = useRef();
  const [isFlipped, setIsFlipped] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const { isOpen, closeModal: originalCloseModal } = useLoginModal(); // Usar el estado del modal

  const toRegistrate = () => {
    setOpenRegister(true);
    toggleFlip();
  };

  const toLogin = () => {
    setOpenRegister(false);
    toggleFlip();
  };

  const toggleFlip = () => {
    setIsFlipped((prev) => !prev); // Alterna el estado de 'isFlipped' cada vez que se llama
  };

  const closeModal = () => {
    // Resetea el estado al cerrar el modal
    setOpenRegister(false);
    setIsFlipped(false);
    originalCloseModal();
  };

  useEffect(() => {
    if (modalContent.current) {
      modalContent.current.classList.remove('flip');
      // Usar un pequeño retraso para reiniciar la clase 'flip'
      setTimeout(() => {
        if (isFlipped) {
          modalContent.current.classList.add('flip');
        }
      }, 10);
    }
  }, [isFlipped]); // Ejecuta el efecto solo cuando 'isFlipped' cambia

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content" ref={modalContent}>
        <button className="close-button" onClick={closeModal}>X</button>

        {!openRegister && 
        <div className="front">
           <Login onClose={closeModal} Registrate={toRegistrate} />
        </div>}
        
        {openRegister && 
        <div className="back">
         <Registrarse Logueate={toLogin} />
        </div>}
      </div>
    </div>
  );
};


