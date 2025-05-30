import {useResumenDePagoVenta} from "./useResumenDePagoVenta"
import "./ResumenDePagoVentaStyle.css";


export function ResumenDePagoVenta({ventaDetail}) {

    const {subtotalProductos,MontodeDescuento,total,AbrirDesplegable,desplegableAbierto,flecha_desplegable}=useResumenDePagoVenta(ventaDetail)

    console.log(ventaDetail)

    return (

        <div className="resumen-de-pago" >
            <p><strong>Resumen de venta</strong></p>
             <hr />
             <div className="total-productos"> 
                <p>Productos</p> 
                <p>$ {subtotalProductos.toFixed(2)}</p>   
                <div className="flecha-abajo" ref={flecha_desplegable} onClick={AbrirDesplegable}></div>
             </div>
             
             {desplegableAbierto &&
                <div className="desplegable-resumen-productos">
                {ventaDetail.data.det_oper.map((producto,index) =>{
                  return(
                  <div  className="tarjeta-producto-resumen" key={index}> 
                     <p className="nombre-producto">{producto.titulo}</p> 
                     <p className="precio-producto"> $ {producto.precio_unitario * producto.cantidad}</p> 
                  </div>
                  )
                  })}
                  <hr />
                </div>
             }
             {ventaDetail.data.det_oper[0].descuento_aplicado > 0 && 
             <div className="descuento">
                <p>Descuento ({ventaDetail.data.det_oper.descuento_aplicado}%)</p>
                <p>$ -{MontodeDescuento.toFixed(2)}</p>     
             </div>
             }
             {ventaDetail.data.monto_envio > 0 && 
             <div className="total-productos">
                <p>Envío</p>
                <p>$ {ventaDetail.data.monto_envio}</p>     
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
