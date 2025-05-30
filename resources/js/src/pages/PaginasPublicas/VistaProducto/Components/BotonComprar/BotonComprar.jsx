
import "./BotonComprarStyle.css";
import React from 'react';
import { useBotonComprar } from "./useBotonComprar.js";
import shopping_bag from "../../../../../assets/shopping_bag_buy.svg"


export const BotonComprar=({data}) => {
  

    const {handleComprarClick}= useBotonComprar({data});
  
    return (

        <div className="Container-comprar-Carrito-Button-detail">
         
      
        <button className='comprar-detail' onClick={handleComprarClick}>
          <p>Comprar</p> 
          <img src={shopping_bag} alt="" />
        </button>
        
        </div>
  )
}