import "./DetalleMetodosPagosStyle.css";
import { EstadoDePagoVenta } from "./components/EstadoDePagoVenta/EstadoDePagoVenta";
import { ResumenDePagoVenta } from "./components/ResumenDePagoVenta/ResumenDePagoVenta";

export function DetalleMetodosPagos({ventaDetail}) {

    
    return (
        <>
        
        {ventaDetail &&  ventaDetail.data &&
            <div className="detalle-compra">
                <ResumenDePagoVenta ventaDetail={ventaDetail}/>
                <EstadoDePagoVenta ventaDetail={ventaDetail} />
            </div>
        }
        </>
    )
}

