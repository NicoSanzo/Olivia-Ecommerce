import {SubirArchivo} from "./SubirArchivo/SubirArchivo.jsx"
import { UseDetallePagoCompra } from "./useDetallePagoCompra.js"
import BillChecked from "../../../../../../../assets/bill_payment_icon.svg"
import CancelIcon from "../../../../../../../assets/cancel_icon.svg"
import "./DetallePagoCompraStyle.css";

export function DetallePagoCompra({compraDetail}) {


    const {setEstadoPagoStyle,fecha_pago} =UseDetallePagoCompra(compraDetail)

    return (
        <div className="detalle-pago-container" >
            <p><strong>Pago</strong></p>
            <div className="detalle-pago">
                <p>Método:
                     <span>
                        {compraDetail.data[0].metodo_pago}
                    </span>
                </p>
                
                <p>Estado:  
                    <span  style={setEstadoPagoStyle()}>
                        {compraDetail.data[0].estado_pago}
                    </span>
                </p>
                {compraDetail && compraDetail.data[0].fecha_pago && compraDetail.data &&
                    <p className="Fecha-Pago">
                        Fecha: <strong>{fecha_pago}</strong>
                    </p>
                }
                {compraDetail.data[0].estado_pago === "Pendiente de pago" &&  compraDetail.data[0].metodo_pago === "Transferencia" &&
                     <div className="comprobante-container">
                        <SubirArchivo  numero_operacion={compraDetail.data[0].numero}/>
                     </div>
                }
                {compraDetail.data[0].estado_pago === "Aprobado" &&  compraDetail.data[0].metodo_pago === "Transferencia" &&
                    <div className='comprobante-validado'>
                        <img src={BillChecked} alt="upload icon" className='image' />
                        <span><strong> Su comprobante fue validado con exito</strong></span>    
                    </div>  
                }
                {compraDetail.data[0].estado_pago === "Cancelado" &&  compraDetail.data[0].metodo_pago === "Transferencia" &&
                    <div className='comprobante-validado'>
                        <img src={CancelIcon} alt="upload icon" className='image' />
                        <span> <strong>El pago fue cancelado</strong></span>    
                    </div>  
                }
            </div>    
         </div>
    )
}
