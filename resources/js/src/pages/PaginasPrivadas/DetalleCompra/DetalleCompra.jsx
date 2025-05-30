import React from "react"
import "./DetalleCompraStyle.css";
import { UseDetalleCompra } from "./useDetalleCompra";
import { LoadingComponente } from "../../../components/GenericLoadingComponent/LoadingComponent"
import { DetalleMetodosPagos } from "./components/DetalleMetodosPagos/DetalleMetodosPagos.jsx";
import { DetalleGeneralCompra } from "./components/DetalleGeneralCompra/DetalleGeneralCompra";


export function DetalleCompra() {

    const {compraDetail,loading_data_detail}=UseDetalleCompra(); 
    
    return (
        
        <div className="principal-page">
            { 
                loading_data_detail ?
                     <LoadingComponente width={60} height={60} />
                :      
                compraDetail && compraDetail.data?   
                <div className="principal-detalle-compras-container"> 
                   <DetalleGeneralCompra compraDetail={compraDetail} />
                   <DetalleMetodosPagos compraDetail={compraDetail}/>
                </div>
                :
                <p>Error, No se pudo mostrar el detalle de su venta</p>
            } 
            
        </div>
  )
}
