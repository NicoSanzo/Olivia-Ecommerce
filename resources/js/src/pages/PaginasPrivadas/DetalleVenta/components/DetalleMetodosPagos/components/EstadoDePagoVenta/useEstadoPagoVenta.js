import { useEffect, useState } from "react";
import { useFetch } from "../../../../../../../hooks/PedidoFetchGenerico";


export function useEstadoDePagoVenta(ventaDetail) {

    
    const[fecha_pago,setFechaPago]=useState(null);
    const [triggerEstadoPagoVenta, setTriggertriggerEstadoPagoVenta] = useState(false); 
    const [triggervalidarComprobante, settriggerValidarComprobante] = useState(false);
    const [abrirConfirmacionModal,setAbrirConfirmacionModal]=useState(false);

    const EstadoPagoStyle={StyleAprobado: {backgroundColor:'#DBEAE2 ',color:'green',boxShadow:'0 0 2px black'},
                       StylePendiente: {backgroundColor:'rgba(255, 255, 85, 0.163)',color: 'rgb(176, 176, 71)',boxShadow:'0 0 2px black'},
                       StyleCancelado: {backgroundColor:'rgb(255, 184, 184)',color: 'rgb(255, 2, 2)',boxShadow:'0 0 2px black'}}

     const opciones = { // Definir las opciones para formatear la fecha
      day: 'numeric', 
      month: 'long',
      year:'numeric',
      timeZone: 'America/Argentina/Buenos_Aires' 
    };

    const {data:estado_pago_data,loading:loading_estado_pago_data,error}=useFetch("/api/fetch_comprobante_pago_venta.php", "POST" ,{numero_operacion:ventaDetail.data.numero}, triggerEstadoPagoVenta )
    const {data:data_actualizar_estado_pago,loading:loading_actualizar_estado_pago,error:error_actualizar_estado_pago}=useFetch("/api/cambiar_estado_pagado.php", "POST" ,{numero_operacion:ventaDetail.data.numero}, triggervalidarComprobante );

    
    
    useEffect(() => {
        
        if(data_actualizar_estado_pago && data_actualizar_estado_pago.success)
        {
         setTriggertriggerEstadoPagoVenta(true);
         settriggerValidarComprobante (false);
         setAbrirConfirmacionModal (false);
        } 
    }, [data_actualizar_estado_pago]);
    
   
    useEffect(() => {
        setTriggertriggerEstadoPagoVenta(true)
    }, []);

   

    useEffect(() => {
        if(estado_pago_data){
            setTriggertriggerEstadoPagoVenta(false)
            if(estado_pago_data.fecha_pago) {
                const fechaISO= new Date (estado_pago_data.fecha_pago + "T00:00:00")
                setFechaPago(fechaISO.toLocaleDateString('es-ES', opciones))     
                setTriggertriggerEstadoPagoVenta(false)      
            }  
        } 
     }, [estado_pago_data]);


    const setEstadoPagoStyle = () => {
        if(estado_pago_data.estado_pago === "Pendiente de pago"){
            return EstadoPagoStyle.StylePendiente;
        }
        if(estado_pago_data.estado_pago === "Aprobado"){
            return EstadoPagoStyle.StyleAprobado;
        }
        else{
            return EstadoPagoStyle.StyleCancelado;
        }    
    };

    const AbrirModalConfirmacion = () => {
        setAbrirConfirmacionModal(true);
    };
    
    const CerrarModalConfirmacion = () => {
        setAbrirConfirmacionModal(false);
    };

    const ValidarComprobante = () => {
        settriggerValidarComprobante(true)
    };

    return (
        {
            estado_pago_data,
            setEstadoPagoStyle,
            fecha_pago,
            loading_estado_pago_data,
            abrirConfirmacionModal,
            AbrirModalConfirmacion,
            ValidarComprobante,
            CerrarModalConfirmacion

        }
    )
}
