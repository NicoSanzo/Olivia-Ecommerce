import "./StyleFunctions.css";
import React from "react";
import { Function } from "./Components/Function";
import PagoIcon from "./Components/Home-Function-Icons/Pago-Icon.jpg"
import PesoIcon from "./Components/Home-Function-Icons/Peso-Icon.jpg"
import PorcentajeIcon from "./Components/Home-Function-Icons/Porcentaje-icon.jpg"
import ShippingIcon from "./Components/Home-Function-Icons/Shipping-icon.jpg"



export const Functions = ()=> {

    return(
    <>
        <section className="functions">
            <Function descripcion="Envío Gratis a todo el pais por Correo Argentino desde $100mil" imagen={PagoIcon} />
            <Function descripcion="Tenemos 10% off si pagás por transferencia Bancaria" imagen={PesoIcon} />
            <Function descripcion="Envío a domicilio y sucursales de todo el País." imagen={PorcentajeIcon} />
            <Function descripcion="Pagá con todos los medios de pago." imagen={ShippingIcon}/>
        </section>
    
     </>

    )

}