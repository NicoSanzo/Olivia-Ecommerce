
import { LoadingComponente } from "../../../../../../components/GenericLoadingComponent/LoadingComponent";
import { ConfirmationModal } from "./ConfirmationModal/ConfirmaticonModal";
import { DatosEntregaDetalleVenta } from "./DatosEntregaVentaDetalle/DatosEntregaVentaDetalle";
import "./ProductsAndStateContainerVentaStyle.css";
import { useProductsAndState } from "./useProductsAndState";

export function ProductsAndStateContainerVenta({ventaDetail}) {

    const {fecha_entrega,
            SetEstilo,
            EntregarVenta,
            cerrarModalConfirmar,
            abrirModalConfirmarEntrega,
            abrirModalConfirmar,
            data_estado_venta,
            loading_estado_venta} = useProductsAndState(ventaDetail)

    if(!ventaDetail || !ventaDetail.data ){
        return null;
    }
    
    
    return (

        <div className="products-container-detalle-venta">
            <div className="estado-card-venta" >   
            {loading_estado_venta &&  <LoadingComponente width={20} height={20}/>}
            { data_estado_venta && data_estado_venta.data &&
                <p className="estado-entrega-venta" style={SetEstilo()} >            
                    {data_estado_venta.data.estado_compra}
                </p>    
            }
            {
                data_estado_venta && data_estado_venta.data.estado_compra==="Pendiente de entrega" &&
                <button className="boton-entregado" onClick={abrirModalConfirmar}> Entregar </button> 
            }
            {fecha_entrega && data_estado_venta && data_estado_venta.data.estado_compra==="Entregado" &&
                <p className="estado-entrega-venta">
                    <strong>Entregado el {fecha_entrega} </strong>
                </p>                        
            }      
            {
                 <p className="metodo-entrega-detalle" >         
                 Metodo: <strong>{ventaDetail.data.forma_envio}</strong>
                </p> 
            }  
               <ConfirmationModal Abierto={abrirModalConfirmarEntrega} Cerrado={cerrarModalConfirmar} onConfirm={EntregarVenta}/>
             </div> 
                
              {ventaDetail && ventaDetail.data.det_oper.map((detalle,index)=>{
              return(
                    <div className="venta-product-card-detalle" key={index} >
                            <div className="product-description-venta-detalle">   
                                <div className="image-container-venta-detalle">
                                   <img className="product-image-venta-detalle" src={detalle.imagen} alt="imagen-producto" loading="lazy"/>
                                </div>

                                <h2 className="titulo-publicacion-venta-detalle">{detalle.titulo} </h2>
                            </div>
                                
                            <div className="product-price-venta-detalle">    
                               <h2 className="price-producto-venta-detalle"> $ {detalle.precio_unitario} </h2>
                            </div> 
                            <div className="product-stock-venta-detalle">    
                               <h2 className="stock-producto-venta-detalle"> {detalle.cantidad} unidades</h2>
                            </div>  
                            <div className="product-sku-venta-detalle">    
                               <h2 className="sku-product-venta-detalle"> SKU: {detalle.publicacion_id} </h2>
                            </div>
                                                          
                    </div>   
                  )
              })}
              
             {ventaDetail.data.forma_envio ==="Envio" &&           
             <DatosEntregaDetalleVenta ventaDetail={ventaDetail}/>}
              
        </div>
                    
    )
}
