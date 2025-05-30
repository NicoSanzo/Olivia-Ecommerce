import "./BuyCardStyle.css";
import WppImage from "../../../../../assets/Whatsapp_icon.svg"
import { UseBuyCard } from "./useBuyCard";

export function BuyCard({compraData}) {

  
    const{fecha,opciones,EstadoPagoStyle,EstadoEntregaStyle,AbrirDetalleCompra}=UseBuyCard(compraData)

    return (
        <>
       
            <div className="compra-container">
                <div className="compra-container-head">
                    <h2 className="fecha"> {fecha.toLocaleDateString('es-ES', opciones)}</h2>
                    <h2 className="ID"> ID: <span className="id">{compraData.numero}</span></h2>
                    
                </div>
            {compraData.det_oper.map((detalle,index)=>{
                return(
                    <div className="compra-product-card" key={index} >
                       <div className="image-container">
                           <img className="product-image" src={detalle.publicacion.imagen} alt="imagen-producto" loading="lazy"/>
                       </div>
                       <div className="product-description">
                           <h2 className="estado-entrega"
                                style={
                                    compraData.estado_compra === "Pendiente de entrega"
                                        ? EstadoEntregaStyle.StylePendiente
                                        : compraData.estado_compra === "Entregado"
                                        ? EstadoEntregaStyle.StyleEntregado
                                        : ""
                                }
                            >
                                {compraData.estado_compra}
                           </h2>
                           <h2 className="titulo-publicacion">{detalle.publicacion.titulo}</h2>
                           <h2 className="stock-producto"> {detalle.cantidad} unidades</h2>
                       </div>
                        <div className="buttons">
                           <a className="contacto" href="https://wa.me/5491138024906"  target="blank">
                                   <h2> Enviar Mensaje</h2>  
                                   <img src={WppImage} alt="imagen whasts app" loading="lazy" />  
                           </a>     
                            <button onClick={AbrirDetalleCompra}>Ver compra</button>   
                        </div>
                    </div>
                )
            })}
               
                <div className="compra-container-footer">                   

                    <h2 className="estado-pago">
                    Estado del Pago:
                        <span  style={
                            compraData.estado_pago === "Pendiente de pago"
                                ? EstadoPagoStyle.StylePendiente
                                : compraData.estado_pago === "Aprobado"
                                ? EstadoPagoStyle.StyleAprobado
                                : EstadoPagoStyle.StyleCancelado
                        }>
                         
                        {compraData.estado_pago}
                        </span>
                    </h2>
                      
                    <h2 className="metodo-pago"> Metodo de Pago:
                        <span>{compraData.metodo_pago}</span>
                    </h2>  
                </div>
            </div>
            
        
        </>
    )
}
