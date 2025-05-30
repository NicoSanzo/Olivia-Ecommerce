import { useEffect, useState } from "react";


export function UseResumenDePago(compraDetail) {

    const [subtotalProductos,setSubtotalProductos]=useState(0);
    const [MontodeDescuento,setMontoDescuento]=useState(0);
    const [total,setTotal]=useState(0);
    const [fecha_compra,SetfechaCompra]=useState(0);

    const opciones = { // Definir las opciones para formatear la fecha
        day: 'numeric', 
        month: 'long',
        year:'numeric'
      };


      useEffect(() => {
        if(compraDetail){
            if(compraDetail.data){
                const PorcentajeDescuento=compraDetail.data[0].det_oper[0].descuento_aplicado;
                const subtotal=compraDetail.data[0].det_oper.reduce((subtotal,item)=>subtotal+ item.precio_unitario * item.cantidad,0)
                const totalCondescuento=compraDetail.data[0].total;
                const Envio=compraDetail.data[0].monto_envio;
                const FechaPagoAprobado = new Date(compraDetail.data[0].fecha + "T00:00:00");
                SetfechaCompra(FechaPagoAprobado && FechaPagoAprobado.toLocaleDateString('es-ES', opciones));
                setSubtotalProductos(subtotal);
                setMontoDescuento(subtotal*PorcentajeDescuento/100);
                setTotal(Number(Envio) + Number(totalCondescuento));  
          }
        }  
    }, [compraDetail]);


    return (
        {
            opciones,
            subtotalProductos,
            MontodeDescuento,
            total,   
            fecha_compra  
        }
    )
}
