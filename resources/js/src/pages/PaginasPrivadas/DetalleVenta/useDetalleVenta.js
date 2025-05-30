import { useEffect, useState } from "react";
import { useFetch } from "../../../hooks/PedidoFetchGenerico";


export function UseDetalleVenta() {


    const[triggerdetail, setTriggerDetail]=useState(false);

    const getQueryParam = (numero_venta) => {  //funcion para extrare un parametro de la URL
        const urlParams = new URLSearchParams(location.search);
        return urlParams.get(numero_venta);
      };

    
    const VentaID = getQueryParam('numero_venta'); // Extraemos el parámetro "numero_venta" de la URL

    const{data:ventaDetail,loading:loading_data_detail,error}=useFetch("/api/fetch_detalle_venta.php","POST",{numero_operacion:VentaID},triggerdetail)

    
    useEffect(() => {
        setTriggerDetail(true);   
        
    }, []);
   
    return (
        {
            ventaDetail, 
            loading_data_detail,     
        }
    )
}
