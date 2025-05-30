import { useEffect, useState } from "react";
import { useFetch } from "../../../../../../hooks/PedidoFetchGenerico";



export function useProductsAndState(ventaDetail) {

    const [fecha_entrega,SetFechaEntrega]=useState(null);
    const [triggerFetchEntrega, settriggerFetchEntrega] = useState(false);
    const [triggerFetchCambiarEntrega, settriggerFetchCambiarEntrega] = useState(null);
    const [abrirModalConfirmarEntrega, setabrirModalConfirmarEntrega] = useState(false);
    
    const EstadoEntregaStyle={
            StyleEntregado: {color:'#78c398', fontWeight:'800',fontSize:'14px' },
            StylePendiente: {color:'rgba(0, 0, 0, 0.43)',fontWeight:'800'},
    }     

    const opciones = { //  opciones para formatear la fecha
        day: 'numeric', 
        month: 'long',
        year:'numeric',
        timeZone: 'America/Argentina/Buenos_Aires' 
      };


      const {data:data_estado_venta,loading:loading_estado_venta,error:error_estado_venta} = useFetch("/api/fetch_estado_entrega_venta.php","POST", {numero_operacion:ventaDetail.data.numero},triggerFetchEntrega)
      const {data:data_cambio_venta,loading:loading_cambio_venta,error:error_cambio_venta} = useFetch("/api/cambiar_estado_entregado.php","POST", {numero_operacion:ventaDetail.data.numero},triggerFetchCambiarEntrega)
  


      useEffect(() => {
        settriggerFetchEntrega(true)
      }, []);
      

      useEffect(() => {
        if(data_estado_venta){
            if(data_estado_venta.data){
                if(data_estado_venta.data.fecha_entrega){                
                    const FechaEntrega = new Date(data_estado_venta.data.fecha_entrega + "T00:00:00" );        
                    SetFechaEntrega(FechaEntrega && FechaEntrega.toLocaleDateString('es-ES', opciones))            
                }  
                settriggerFetchEntrega(false)
            }  
        }  
    }, [data_estado_venta]);
    

      useEffect(() => {
        if(data_cambio_venta && data_cambio_venta.success===true){
            settriggerFetchCambiarEntrega(false)
            settriggerFetchEntrega(true)
        }
    }, [data_cambio_venta]);


    const SetEstilo = () => {
        if(data_estado_venta){  
          if(data_estado_venta.data.estado_compra === "Entregado"){
              return EstadoEntregaStyle.StyleEntregado;
          }
          if(data_estado_venta.data.estado_compra === "Pendiente de entrega"){
              return EstadoEntregaStyle.StylePendiente
          }    
        } 
        return undefined;
    };


    const abrirModalConfirmar = () => { setabrirModalConfirmarEntrega(true);};
    const cerrarModalConfirmar = () => {setabrirModalConfirmarEntrega(false); };

    const EntregarVenta = () => {
        settriggerFetchCambiarEntrega(true);
        setabrirModalConfirmarEntrega(false);
    };

    return (
       {
        fecha_entrega,
        SetEstilo,
        loading_estado_venta,
        data_estado_venta,
        EntregarVenta,
        abrirModalConfirmarEntrega,
        cerrarModalConfirmar,
        abrirModalConfirmar 
       }
    )
}