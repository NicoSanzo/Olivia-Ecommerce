
import "./BotonAgregarAlCarritoDetailStyle.css";
import React from 'react';
import { useBotonAgregarAlCarritoDetail } from "./useBotonAgregarAlCarritoDetail.jsx";
import AgregarAlcarrito from "../../../../../assets/shopping_cart_button.svg"


export const BotonAgregarAlCarritoDetail=({data}) => {
  

    const {handleCarritoClick,arrayProductsCarrito}= useBotonAgregarAlCarritoDetail({data});
  
    return (

        <div className="Container-Agrega-Carrito-Button-detail">
         
           {arrayProductsCarrito.map((item)=>{
              if(data.itemKey==item.data.data.itemKey && item.stock > 0 ){           
                return <div className="Cantidad-Agregada-detail" key={item.data.data.itemKey}>{item.stock}</div>
              }
              
          })}
        
        <button className='AgregarAlCarrito-detail' onClick={handleCarritoClick}>
          <p>Agregar al carrito</p> 
          <img src={AgregarAlcarrito} alt="" />
        </button>
        
        </div>
  )
}