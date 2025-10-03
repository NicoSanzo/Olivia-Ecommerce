import React, { useState } from "react";
import { useValidarCompra } from "../../../../../Context/validarComprar";
import { useAddCarrito } from "../../../../../Context/addCarritoContext";


export function UseEntrega() {

   const {setTipoEntrega}= useValidarCompra();
   const {setPrecioEnvio} =useAddCarrito()


   const handleEntrega = (event) => {

    const metodo_entrega=event.target.value;
    setTipoEntrega (metodo_entrega);

    if(metodo_entrega==="Envio")
      {
        setPrecioEnvio(50);  
      }
    else if (metodo_entrega==="Acordar"){
        setPrecioEnvio(null);
    } 
   };


    return ({
        
        handleEntrega
    
    })
}
