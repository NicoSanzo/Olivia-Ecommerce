import React, { useEffect, useState } from 'react';
import './ModalDatosFisStyle.css'
import { useFormDataUserValidation } from '../../../../../../hooks/FormDataUserValidation';
import { useFetch } from '../../../../../../hooks/PedidoFetchGenerico';
import { LoadingComponente } from '../../../../../../components/GenericLoadingComponent/LoadingComponent';
import { GenericExitoso } from '../../../../../../components/GenericExitoso/GenericExitoso';
import { useModalDatos } from './useModalDatos';
 

export const ModalDatosFis = ({isOpen, onClose,  data, ActualizarPagina} ) => {
    
    const { formValues ,handleChange,handleSubmit, errors ,loading_modi,isSubmittedSuccessfully,handleCloseModal} =useModalDatos({onClose,data,ActualizarPagina});
       
    if (!isOpen) return null;
    
      
  return (
    <>
     {isSubmittedSuccessfully && <GenericExitoso Leyenda={"¡Cambios realizados correctamente!"} isSuccess={isSubmittedSuccessfully} onClose={handleCloseModal} />}
    <div className="modal-mod">
      <div className="mod-modal-content">
        <button className="close-button" onClick={onClose}>X</button>
  
        <div className="Data-user-Modal">

          <form  onSubmit={handleSubmit}>
            <div className="input-container">
              <label>Direccion</label>
              <input 
                type="text" 
                name="direccion_fis" 
                value={formValues.direccion_fis} 
                onChange={handleChange} 
              />
              <div className="error-msg">{errors.direccion_fis}</div>
            </div> 
  
            <div className="input-container">
              <label>Localidad</label>
              <input 
                type="text" 
                name="localidad_fis" 
                value={formValues.localidad_fis} 
                onChange={handleChange} 
              />
              <div className="error-msg">{errors.localidad_fis}</div>
            </div>
            
            <div className="input-container">
              <label>Provincia</label>
              <input 
                type="text" 
                name="provincia_fis" 
                value={formValues.provincia_fis} 
                onChange={handleChange} 
              />
              <div className="error-msg">{errors.provincia_fis}</div>
            </div>
            
  
            <div className="input-container">
              <label>Codigo Postal</label>
              <input 
                type="number" 
                name="codigo_postal_fis" 
                value={formValues.codigo_postal_fis} 
                onChange={handleChange} 
              />
              <div className="error-msg">{errors.codigo_postal_fis}</div>
            </div>
            
            
            <div className='loading-component'> {loading_modi && <LoadingComponente width={20} height={20}/>}</div>
            <button className="Envio-Modi-button" type="submit">MODIFICAR</button>
            
          </form >
          
        </div>
      </div>
      
    </div>
    

   
</>
  );
  
};