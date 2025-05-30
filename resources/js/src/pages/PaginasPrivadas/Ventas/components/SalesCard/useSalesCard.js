import {useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";



export function UseSalesCard (venta) {

const navigate = useNavigate();
const [fecha_entrega,setFechaEntrega]=useState(null);
const fechaISO= venta.fecha;
const fecha = new Date(fechaISO +"T00:00:00"); // Crear un objeto Date a partir de la cadena ISO
const numero_operacion=venta.numero;

const opciones = { // Definir las opciones para formatear la fecha
  day: 'numeric', 
  month: 'long',
  year:'numeric'
};


useEffect(() => {
    if(venta && venta.fecha_entrega)
        {
        const fechaEntrega= venta.fecha_entrega;
        setFechaEntrega( new Date(fechaEntrega + "T00:00:00"));
        }
  
}, [venta]);


const AbrirDetalleVenta = () => {
    navigate(`/Ventas/Detalle?numero_venta=${numero_operacion}`); // indico el numero de venta en la url para recuperarlo al buscar el detalle de la venta
};

const EstadoEntregaStyle={StyleEntregado: {color:'#78c398', fontWeight:'800' ,fontSize:"15px"},
                       StylePendiente: {color:'rgba(0, 0, 0, 0.43)',fontWeight:'800',fontSize:"17px"},
                     }    
            
const setEsiloEstadoEntrega = () => {
    if(venta.estado_compra === "Entregado"){
        return EstadoEntregaStyle.StyleEntregado;
    }
    if(venta.estado_compra === "Pendiente de entrega"){
        return EstadoEntregaStyle.StylePendiente
    }    
    return undefined;  
};                       

    return (
        {
            opciones,
            fecha,
            setEsiloEstadoEntrega,
            AbrirDetalleVenta,
            fecha_entrega

        }                  
    )
}
