import React, { useEffect, useState } from "react";
import { useAddCarrito } from "../../../../../Context/addCarritoContext";
import { useLoginModal } from "../../../../../Context/LoginPopContext";
import { useAuth } from "../../../../../Context/authContext";

export function useResumenCarrito(OcultarButtonComprar) {
  
  const {
    arrayProductsCarrito,
    total,
    MostrarDescuento,
    cantidadDescuento,
    MostrarMetodosDepago,
    setMostrarMetodosDePago,
    subtotal,
    Envio,
  } = useAddCarrito();
  
  const { sessionData,isTokenValid,token} = useAuth();
  const { openModal } = useLoginModal();


  // Función para continuar con la compra,   Verifica si el usuario no está autenticado o si falta algún dato en sessionStorage, sino abre el login
  const ContinuarCompra = () => {


    if (!sessionData || sessionData.data.isAdmin===true || !isTokenValid ) {
      openModal();
      setMostrarMetodosDePago(false);
    
    } else if (arrayProductsCarrito.length !== 0 &&  sessionData.data.isAdmin==false ) {
      setMostrarMetodosDePago(true);
      OcultarButtonComprar.current.style.display = "none";
    }
  
  };

   /******************* Efecto que muestra o oculta el botón de comprar dependiendo si el carrito está vacío *******************/
  
  useEffect(() => {
    if (arrayProductsCarrito.length === 0  || MostrarMetodosDepago===false ) {
      OcultarButtonComprar.current.style.display = "block";
    }
    if(MostrarMetodosDepago===true && arrayProductsCarrito.length > 0){
      OcultarButtonComprar.current.style.display = "none"; 
    }
    
  }, [arrayProductsCarrito,MostrarMetodosDepago]);

  /******************* Calcula el total de la compra con envio *******************/


  return {
    arrayProductsCarrito,
    total,
    Envio,
    ContinuarCompra,
    MostrarDescuento,
    cantidadDescuento,
    subtotal,
    isTokenValid
  };
}