
import "./AgregarAlcarritoStyle.css";
import React from 'react';
import { UseAgregarAlCarrito } from "./useAgregarAlCarrito";


export const AgregarAlCarrito=({data}) => {
  

    const {handleCarritoClick,arrayProductsCarrito}= UseAgregarAlCarrito({data});
  
    return (

        <div className="Container-Agrega-Carrito-Button">
           {arrayProductsCarrito.map((item)=>{
              if(data.itemKey==item.data.data.itemKey && item.stock > 0 ){           
                return <div className="Cantidad-Agregada" key={item.data.data.itemKey}>{item.stock}</div>
              }
              
          })}
        
        <button className='AgregarAlCarrito' onClick={handleCarritoClick}></button>
        </div>
  )
}