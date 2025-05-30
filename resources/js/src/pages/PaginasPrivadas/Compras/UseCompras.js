
import React, { useEffect, useState } from "react"
import { useFetch } from "../../../hooks/PedidoFetchGenerico";



export function UseCompras() {

const [triggerFetchCompras,setTriggerFetchCompras]=useState(false);

    const {data: DataCompras, loading, error: errorCompras}=useFetch('./api/fetch_compras.php', 'POST' , null, triggerFetchCompras);

    console.log(DataCompras)

    useEffect(() => {
        setTriggerFetchCompras(true)
    }, []);


    return (
        {
            DataCompras,
            loading
        }

            
        
    )
}
