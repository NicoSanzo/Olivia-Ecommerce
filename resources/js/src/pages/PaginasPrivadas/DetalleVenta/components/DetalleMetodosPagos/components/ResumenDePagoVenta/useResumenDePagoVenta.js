import { useState, useRef, useEffect } from 'react';


export function useResumenDePagoVenta(ventaDetail) {

    const [subtotalProductos,setSubtotalProductos]=useState(0);
    const [MontodeDescuento,setMontoDescuento]=useState(0);
    const [total,setTotal]=useState(0);
    const [desplegableAbierto, setDesplegableAbierto] = useState(false);
    const flecha_desplegable= useRef(null)
    const [rotation, setRotation] = useState(0); 

    const opciones = { // Definir las opciones para formatear la fecha
        day: 'numeric', 
        month: 'long',
        year:'numeric'
      };


      useEffect(() => {
        if(ventaDetail){
            if(ventaDetail.data){
                const PorcentajeDescuento=ventaDetail.data.det_oper[0].descuento_aplicado;
                const subtotal=ventaDetail.data.det_oper.reduce((subtotal,item)=>subtotal+ item.precio_unitario * item.cantidad,0)
                const totalCondescuento=ventaDetail.data.total;
                const Envio=ventaDetail.data.monto_envio;
                setSubtotalProductos(subtotal);
                setMontoDescuento(subtotal*PorcentajeDescuento/100);
                setTotal(Number(Envio) + Number(totalCondescuento));  
          }
        }  
    }, [ventaDetail]);

    const AbrirDesplegable = () => {
        setDesplegableAbierto(prevState => !prevState);
        setRotation(prevRotation => (prevRotation === 0 ? 180 : 0)); // Toggle rotation
      };
    
     
      useEffect(() => {
        if (flecha_desplegable.current) {
          flecha_desplegable.current.style.transform = `rotate(${rotation}deg)`;
        }
      }, [rotation]); 


    return (
        {
            opciones,
            subtotalProductos,
            MontodeDescuento,
            total,   
            desplegableAbierto,
            AbrirDesplegable,
            flecha_desplegable  
        }
    )
}
