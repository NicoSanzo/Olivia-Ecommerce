import React, { useEffect, useState } from 'react';
import "./CompraExitosaStyle.css";
import { UseCompraExitosa } from './useCompraExitosa';


export function CompraExitosa() {
  

  const {visible,checkedVisible}=UseCompraExitosa();


  return (
    <>
   {
     <div className={`compra-container-opaco ${visible ? 'visible' : ''}`}>
          <div className={`compra-success-container ${visible ? 'visible' : ''}`}>
         <div className='compra-success-logo-container'>

           <div className="checkbox-wrapper-31">
              <input checked={checkedVisible} type="checkbox" readOnly/>
              <svg viewBox="0 0 35.6 35.6">
                <circle className="background" cx="17.8" cy="17.8" r="17.8"></circle>
                <circle className="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
                <polyline className="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
              </svg>
            </div>
         </div>
         
         <p className='compra-text-success-container'>¡GRACIAS POR TU COMPRA!</p>
         {/*<div className='compra-button-container'>
            <button className='compra-close-button-success' onClick={handleClose}>OK</button>
         </div>*/}
       </div>
    </div>   
  }
  </>
  );
}