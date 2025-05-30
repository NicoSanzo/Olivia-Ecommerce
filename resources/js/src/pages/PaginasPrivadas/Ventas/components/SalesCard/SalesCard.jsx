import "./SalesCardStyle.css";
import { UseSalesCard } from "./useSalesCard";

export function SalesCard({venta}) {
    
    const{fecha,opciones,setEsiloEstadoEntrega,AbrirDetalleVenta,fecha_entrega}=UseSalesCard(venta)

    return (
        <>
       
            <div className="venta-container">
                <div className="venta-container-head">
                    <div className="fecha-id-venta-container">
                        <h2 className="data-fecha-id-venta"> {fecha.toLocaleDateString('es-ES', opciones)}</h2> |
                        <h2 className="data-fecha-id-venta"> Venta: # {venta.numero}</h2> |
                        <h2 className="data-fecha-id-venta"> Metodo: <strong>{venta.forma_envio}</strong></h2>
                    </div>
                    <div className="nombre-user-venta-container">
                        <h2 className="data-user-nombre-venta"> {venta.cliente.nombre} {venta.cliente.apellido}</h2> |
                        <h2 className="data-user-nombre-venta"> {venta.cliente.username}</h2>
                    </div>     
                </div>

                <div className="venta-second-container-head">
                    <div className="estado-entrega-container-venta">   
                        <h2 className="estado-entrega-venta" style={setEsiloEstadoEntrega()}>
                            {venta.estado_compra}
                        </h2>
                        {fecha_entrega &&
                        <h2 className="estado-entrega-fecha-venta">
                          Entregado el {fecha_entrega.toLocaleDateString('es-ES', opciones)}  
                        </h2>}
                        
                    </div>
                    <div className="buton-container-venta">
                        <button onClick={AbrirDetalleVenta}>Ver detalle</button>    
                    </div>
                      
                </div>
               
                <div className="products-venta-container">  
                    {venta.det_oper.map((detalle,index)=>{
                    return(                     

                        <div className="venta-product-card" key={index} >
                            <div className="product-description-venta">   
                                <div className="image-container-venta">
                                   <img className="product-image-venta" src={detalle.publicacion.imagen} alt="imagen-producto"    loading="lazy"/>
                                </div>

                                <h2 className="titulo-publicacion-venta">{detalle.publicacion.titulo} </h2>
                            </div>
                                
                            <div className="product-price-venta">    
                               <h2 className="price-producto-venta"> $ {detalle.publicacion.precio} </h2>
                            </div> 
                            <div className="product-stock-venta">    
                               <h2 className="stock-producto-venta"> {detalle.cantidad} unidades</h2>
                            </div>  
                            <div className="product-sku-venta">    
                               <h2 className="sku-product-venta"> SKU: {detalle.publicacion.id} </h2>
                            </div>
                                                          
                        </div>     
                        )
                    })}
                </div>
            </div>
        </>
    )
}
