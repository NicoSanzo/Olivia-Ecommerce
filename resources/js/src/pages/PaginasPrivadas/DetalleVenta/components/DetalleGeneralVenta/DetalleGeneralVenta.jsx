


import { ProductsAndStateContainerVenta } from "./ProductsContainer/ProductsAndStateContainerVenta";
import "./DetalleGeneralVentaStyle.css";
import { ProductAndUser } from "./ProductAndUser/ProductAndUser";
import { DatosParaFacturaDetalleVenta } from "./DatosParaFacturaDetalleVenta/DatosParaFacturaDetalleVenta";
import { AdjuntarFacturaDetalleVenta } from "./AdjuntarFacturaDetalleVenta/AdjuntarFacturaDetalleVenta";



export function DetalleGeneralVenta({ventaDetail}) {
    //console.log(ventaDetail)

    if(!ventaDetail && !ventaDetail.data)
    {return null}

    return (
        
       
        <div className="detalle-general-venta">  
               
            <ProductAndUser ventaDetail={ventaDetail} />
            <ProductsAndStateContainerVenta ventaDetail={ventaDetail}/>
            <DatosParaFacturaDetalleVenta ventaDetail={ventaDetail}/>
            <AdjuntarFacturaDetalleVenta ventaDetail={ventaDetail}/>
            
        </div>
    )
}

/*<EstadoDeCompra compraDetail={compraDetail} />                 
             <InformacionDeCompras compraDetail={compraDetail} />
             <ContactoContainer/>   */ 