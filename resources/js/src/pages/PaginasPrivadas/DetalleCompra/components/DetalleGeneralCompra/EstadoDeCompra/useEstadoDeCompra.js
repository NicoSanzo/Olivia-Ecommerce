import { useEffect, useState } from "react";



export function UseEstadoDeCompra(compraDetail) {

    const [fecha_entrega,SetFechaEntrega]=useState(null);
    
    const EstadoEntregaStyle={
            StyleEntregado: {color:'#78c398', fontWeight:'800',fontSize:'14px' },
            StylePendiente: {color:'rgba(0, 0, 0, 0.43)',fontWeight:'800'},
    }     

    const opciones = { //  opciones para formatear la fecha
        day: 'numeric', 
        month: 'long',
        year:'numeric'
      };


      useEffect(() => {
        if(compraDetail){
            if(compraDetail.data && compraDetail.data[0].fecha_entrega){
                const FechaEntrega = new Date(compraDetail.data[0].fecha_entrega + "T00:00:00");
                SetFechaEntrega(FechaEntrega && FechaEntrega.toLocaleDateString('es-ES', opciones))
            }      
        }  
    }, [compraDetail]);


    const SetEstilo = () => {
        if(compraDetail.data[0].estado_compra === "Entregado"){
            return EstadoEntregaStyle.StyleEntregado;
        }
        if(compraDetail.data[0].estado_compra === "Pendiente de entrega"){
            return EstadoEntregaStyle.StylePendiente
        }    
        return undefined;
    };


    return (
       {

        fecha_entrega,
        SetEstilo
        
       }
    )
}
