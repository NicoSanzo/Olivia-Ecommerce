import "./EstadoDeCompraStyle.css";
import { UseEstadoDeCompra } from "./useEstadoDeCompra";


export function EstadoDeCompra({compraDetail}) {

    if(!compraDetail || !compraDetail.data)
    {return null;}

    const {fecha_entrega, SetEstilo} =UseEstadoDeCompra(compraDetail);

    return (
        <div className="Estado-container">
            <p><strong>Estado de compra</strong></p>    
            <div className="estado-card" >             
                <p className="estado-entrega" style={SetEstilo()} >
                    {compraDetail.data[0].estado_compra}
                </p>
                {fecha_entrega &&
                    <p className="estado-entrega">
                        <strong>Entregado el {fecha_entrega} </strong>
                    </p>
                }     
             </div>     
        </div>   
    )
}
