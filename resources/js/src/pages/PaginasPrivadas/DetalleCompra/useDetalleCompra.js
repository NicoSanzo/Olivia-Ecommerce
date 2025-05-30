import { useEffect, useState } from "react";

import { useFetch } from "../../../hooks/PedidoFetchGenerico";



export function UseDetalleCompra() {

    const[triggerdetail, setTriggerDetail]=useState(false);

    
    const getQueryParam = (numero_compra) => {  //funcion para extrare un parametro de la URL
        const urlParams = new URLSearchParams(location.search);
        return urlParams.get(numero_compra);
      };

    const CompraID = getQueryParam('numero_compra'); // Extraemos el parámetro "numero_venta" de la URL

    const{data:compraDetail,loading:loading_data_detail,error}=useFetch("/api/fetch_detalle_compra.php","POST",{numero_operacion:CompraID},triggerdetail)
  
    useEffect(() => {
        setTriggerDetail(true);     
    }, []);
   

    return (
        {
            compraDetail, 
            loading_data_detail,     
        }
    )
}
