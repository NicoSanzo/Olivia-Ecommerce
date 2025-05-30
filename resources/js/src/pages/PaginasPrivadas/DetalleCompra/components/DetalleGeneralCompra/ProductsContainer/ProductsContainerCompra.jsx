
import "./ProductsContainerStyle.css";

export function ProductsContainerCompra({compraDetail}) {

    if(!compraDetail || !compraDetail.data ){
        return null;
    }
    
    return (
        <div className="products-container-detalle-compra">
             <p><strong>Productos</strong></p>
              {compraDetail && compraDetail.data[0].det_oper.map((detalle,index)=>{
              return(
                  <div className="compra-product-card" key={index} >
                     <div className="image-container">
                         <img className="product-image" src={detalle.publicacion.imagen} alt="imagen-producto" loading="lazy" />
                     </div>
                     <div className="product-description">
                         <h2 className="titulo-publicacion">{detalle.publicacion.titulo}</h2>
                         <h2 className="stock-producto"> {detalle.cantidad} unidades</h2>
                     </div>  
                  </div>
                  )
              })}
        </div>
                    
    )
}
