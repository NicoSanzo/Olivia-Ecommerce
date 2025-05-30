import React from "react"
import { useAddCarrito } from "../../../../../Context/addCarritoContext";
import { useValidarCompra } from "../../../../../Context/validarComprar";
import { useAuth } from "../../../../../Context/authContext";

export function UseMetodosDePago() {

    const {isTokenValid}=useAuth();
    const {setPorcentajeDescuento,setMostrarDescuento} =useAddCarrito()
    const {setMetodoPago,
          setTerminosCondiciones,
          handleRealizarCompraTransfer, 
          isSubmitted,
          errors,
          metodo_pago,
          handleFinalizarCompra,
          validacionExitosa,
          IDMercadopago,
          setIDMercadopago,
          loading_MP,
          abrirCompraExitosa }=useValidarCompra()


  /********************ESTABLECE EL DESCUENTO AL ELEGIR UN EVENTO DE LOS METODOS DE PAGO ***********************/
      
  const handleChangeOpcionesPago = (event) => {
    const metodo_pago=event.target.value
    setMetodoPago(metodo_pago);

    if(metodo_pago==="Transferencia")
      {
       setPorcentajeDescuento(10);
       setMostrarDescuento(true);
       setIDMercadopago(null);
      }
    else if (metodo_pago==="Mercadopago"){
     setMostrarDescuento(false); 
     setPorcentajeDescuento(0);
    } 
    else if(arrayProductsCarrito.length===0)
    {
     setPorcentajeDescuento(0)
     setMostrarDescuento(false);
     setIDMercadopago(null);
     }
     
}


    return ( {

        handleChangeOpcionesPago,
        setTerminosCondiciones,
        handleRealizarCompraTransfer, 
        isSubmitted,
        errors,
        metodo_pago,
        handleFinalizarCompra,
        validacionExitosa,
        IDMercadopago,
        isTokenValid,
        abrirCompraExitosa,
        loading_MP
        
    })
    
}
