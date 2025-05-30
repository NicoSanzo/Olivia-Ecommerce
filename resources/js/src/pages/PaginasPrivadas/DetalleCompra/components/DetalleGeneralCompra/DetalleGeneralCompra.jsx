import { ContactoContainer } from "./ContactoContainer/ContactoContainer";
import { EstadoDeCompra } from "./EstadoDeCompra/EstadoDeCompra";
import { InformacionDeCompras } from "./InformacionDeCompras/InformacionDeCompras";
import { ProductsContainerCompra } from "./ProductsContainer/ProductsContainerCompra";
import "./DetalleGeneralCompraStyle.css";



export function DetalleGeneralCompra({compraDetail}) {
    return (
       
        
        <div className="detalle-general-compra">   
             <ProductsContainerCompra compraDetail={compraDetail} />             
             <EstadoDeCompra compraDetail={compraDetail} />                 
             <InformacionDeCompras compraDetail={compraDetail} />
             <ContactoContainer/>      
        </div>
    )
}


