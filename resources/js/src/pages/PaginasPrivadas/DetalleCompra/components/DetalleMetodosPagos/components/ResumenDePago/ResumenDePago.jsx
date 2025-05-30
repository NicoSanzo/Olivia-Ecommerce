import { UseResumenDePago } from "./useResumenDePago"
import "./ResumenDePagoStyle.css";



export function ResumenDePago({compraDetail}) {

    const {fecha_compra,subtotalProductos,MontodeDescuento,total,opciones}=UseResumenDePago(compraDetail)


    return (

        <div className="resumen-de-pago" >
            <p><strong>Detalle de la compra</strong></p>
             <div className="fecha-numero">
                <p>{fecha_compra} |</p>
                <p> ID: # {compraDetail.data[0].numero}</p>     
             </div>
             <hr />
             <div className="total-productos">
                <p>Productos</p>
                <p>$ {subtotalProductos.toFixed(2)}</p>     
             </div>
             {compraDetail.data[0].det_oper[0].descuento_aplicado > 0 && 
             <div className="descuento">
                <p>Descuento ({compraDetail.data[0].det_oper[0].descuento_aplicado}%)</p>
                <p>$ -{MontodeDescuento.toFixed(2)}</p>     
             </div>
             }
             {compraDetail.data[0].monto_envio > 0 && 
             <div className="total-productos">
                <p>Envío</p>
                <p>$ {compraDetail.data[0].monto_envio}</p>     
             </div>
             }
             <hr />
             <div className="total-final">
                <p><strong>Total</strong></p>
                <p><strong>$ {total}</strong></p>     
             </div>
             <hr />
        </div>
    )
}
