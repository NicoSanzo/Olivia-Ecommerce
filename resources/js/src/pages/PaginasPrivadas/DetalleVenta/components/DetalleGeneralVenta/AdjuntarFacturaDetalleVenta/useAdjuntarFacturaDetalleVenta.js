import { useEffect, useState } from "react";


export function useAdjuntarFacturaDetalleVenta(compraDetail) {


    const [factura,setFactura]=useState(null);

    useEffect(() => {
        if(compraDetail && compraDetail.data && compraDetail.data[0].factura){    
            const facturaPdf=compraDetail.data[0].factura;   
            if(facturaPdf){
                setFactura(`data:application/pdf;base64,${facturaPdf}`) 
            }
        }       
    }, [compraDetail]);



    return (
        {
          factura
        }
    )
}
