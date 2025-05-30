import { useEffect, useState } from "react";


export function UseDetallePagoCompra(compraDetail) {

    const[fecha_pago,setFechaPago]=useState(null);
    
    const EstadoPagoStyle={StyleAprobado: {backgroundColor:'#DBEAE2 ',color:'green',boxShadow:'0 0 2px black'},
                       StylePendiente: {backgroundColor:'rgba(255, 255, 85, 0.163)',color: 'rgb(176, 176, 71)',boxShadow:'0 0 2px black'},
                       StyleCancelado: {backgroundColor:'rgb(255, 184, 184)',color: 'rgb(255, 2, 2)',boxShadow:'0 0 2px black'}}

    
    const opciones = { // Definir las opciones para formatear la fecha
        day: 'numeric', 
        month: 'long',
        year:'numeric'
      };


     useEffect(() => {
        if(compraDetail && compraDetail.data[0].fecha_pago && compraDetail.data){
            const fechaISO= new Date (compraDetail.data[0].fecha_pago + "T00:00:00")
            setFechaPago(fechaISO.toLocaleDateString('es-ES', opciones))
        }
             
     }, [compraDetail]);


    const setEstadoPagoStyle = () => {    
        if(compraDetail.data[0].estado_pago === "Pendiente de pago"){
            return EstadoPagoStyle.StylePendiente;
        }
        if(compraDetail.data[0].estado_pago === "Aprobado"){
            return EstadoPagoStyle.StyleAprobado;
        }
        else{
            return EstadoPagoStyle.StyleCancelado;
        }
        
    };

    return (
        {
            setEstadoPagoStyle,
            fecha_pago
        }
    )
}
