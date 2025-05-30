import React from "react"
import "./DetalleVentaStyle.css";
import { UseDetalleVenta } from "./useDetalleVenta";
import { LoadingComponente } from "../../../components/GenericLoadingComponent/LoadingComponent.jsx"
import { DetalleMetodosPagos } from "./components/DetalleMetodosPagos/DetalleMetodosPagos.jsx";
import { DetalleGeneralVenta } from "./components/DetalleGeneralVenta/DetalleGeneralVenta.jsx";


export function DetalleVenta() {

    const {ventaDetail,loading_data_detail}=UseDetalleVenta(); 
    
    return (
        
        <div className="principal-page-ventas">
            { 
                loading_data_detail ?
                     <LoadingComponente width={60} height={60} />
                :      
                ventaDetail && ventaDetail.data?   
                <div className="principal-detalle-ventas-container"> 
                   {<DetalleGeneralVenta ventaDetail={ventaDetail} />}
                   {<DetalleMetodosPagos ventaDetail={ventaDetail}/>}
                </div>
                :
                <p>Error, No se pudo mostrar el detalle de su venta</p>
                
            } 
            
        </div>
  )
}
