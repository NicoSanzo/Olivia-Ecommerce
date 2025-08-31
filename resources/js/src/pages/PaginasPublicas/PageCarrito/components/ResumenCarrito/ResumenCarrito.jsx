import "./ResumenCarritoStyle.css";
import React, { useRef } from "react"
import { useResumenCarrito } from "./useResumenCarrito";
import { useAuth } from "../../../../../Context/authContext";


export function ResumenCarrito() {

    const OcultarButtonComprar= useRef(null);
    const {Envio,total,ContinuarCompra,arrayProductsCarrito,MostrarDescuento,cantidadDescuento,subtotal}=useResumenCarrito(OcultarButtonComprar);
    const {autenticado} = useAuth();

    return (
        <>

            <div className="resumen-container">
                    <h2 className="titulo"> Resumen de compra</h2>
                <div className="container-father-precios">
                    <div className="precios-container"> 
                        <h2 className="resumen">Productos:</h2>
                        <h2 className="resumen">$ {subtotal.toFixed(2)}</h2>     
                    </div>
                   
                   {Envio?
                    <div className="precios-container"> 
                        <h2 className="resumen">Envio:</h2>
                        <h2 className="resumen">$ {Envio.toFixed(2)}</h2>  
                    </div> : ""
                    }

                </div>
                { MostrarDescuento===true && arrayProductsCarrito.length>0 ? 
                    <div className="precios-container"> 
                        <h2 className="descuento-transfer">10%OFF:</h2>
                        <h2 className="descuento-transfer">$ -{cantidadDescuento.toFixed(2)}</h2>     
                    </div>: ""
                }
                <div className="precios-container-total">      
                        <h2 className="total-compra">TOTAL:</h2>
                        <h2 className="total-compra">$ {total.toFixed(2)}</h2>  
                </div>
                    <button 
                        className="comprar-button" 
                        onClick={ContinuarCompra}
                        ref={OcultarButtonComprar}
                        disabled= {arrayProductsCarrito.length === 0 || !autenticado}
                    >
                    Continuar Compra
                    </button>        
            </div>
            
        </>
    )
}
