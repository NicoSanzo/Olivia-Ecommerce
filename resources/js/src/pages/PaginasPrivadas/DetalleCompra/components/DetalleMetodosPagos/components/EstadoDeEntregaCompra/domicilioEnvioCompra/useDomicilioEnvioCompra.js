import { useEffect, useState } from "react"
import { useFetch } from "../../../../../../../../hooks/PedidoFetchGenerico";

export function UseDomicilioEnvioCompra() {

  const[triggerFetchDom,setTriggerFetchDom]=useState(null)

   useEffect(() => {
    setTriggerFetchDom(true);
   }, []);

   const {data:data_dom, loading:loading_data_dom,error} =useFetch("/api/fetch_dom_env.php","POST", null, triggerFetchDom)
   
    return (
       {
        data_dom,
        loading_data_dom
       }
    )
}
