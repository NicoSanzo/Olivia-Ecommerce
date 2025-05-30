
import "./DetalleMetodosPagosStyle.css";

import { ResumenDePago } from "./components/ResumenDePago/ResumenDePago";
import { DetallePagoCompra } from "./components/DetallePagoCompra/DetallePagoCompra";
import { EstadoDeEntregaCompra } from "./components/EstadoDeEntregaCompra/EstadoDeEntregaCompra";


export function DetalleMetodosPagos({compraDetail}) {

    
    return (
        <>
        
        {compraDetail &&  compraDetail.data &&
            <div className="detalle-compra">
                <ResumenDePago compraDetail={compraDetail}/>
                <DetallePagoCompra compraDetail={compraDetail}/>
                <EstadoDeEntregaCompra compraDetail={compraDetail}/>
            </div>
        }
        </>
    )
}
