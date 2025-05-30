

import { useEffect, useState } from "react";


export function useProductAndUser(ventaDetail) {

const [fecha_venta, setFechaVenta] = useState(null);



const opciones = { //  opciones para formatear la fecha
    day: 'numeric', 
    month: 'long',
    year:'numeric',
    timeZone: 'America/Argentina/Buenos_Aires' 
  };

    useEffect(() => {
        if(ventaDetail && ventaDetail.data.fecha)
        {
            const FechaRecibida= new Date(ventaDetail.data.fecha + 'T00:00:00'); 
            setFechaVenta( FechaRecibida.toLocaleDateString('es-ES',opciones))
        }
    }, [ventaDetail]);



    return (
        {
            fecha_venta
        }
    )
}
