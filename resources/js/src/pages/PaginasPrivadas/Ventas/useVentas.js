import React, { useEffect, useState } from "react"
import { useFetch } from "../../../hooks/PedidoFetchGenerico";


export function UseVentas() {

const [triggerFetchVentas,setTriggerFetchVentas]=useState(false);

    const {data: ventaData, loading, error: errorCompras}=useFetch('/api/fetch_ventas.php', 'POST' , null, triggerFetchVentas);

    useEffect(() => {
        setTriggerFetchVentas(true)
    }, []);

    return (
        {
            ventaData,
            loading
        }

            
    )
}
