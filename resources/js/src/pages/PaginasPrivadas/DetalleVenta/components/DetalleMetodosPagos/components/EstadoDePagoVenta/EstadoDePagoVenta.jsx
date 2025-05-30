import { MostrarComprobante } from "./MostrarComprobante/MostrarComprobante.jsx";
import { useEstadoDePagoVenta } from "./useEstadoPagoVenta.js";
import BillChecked from "../../../../../../../assets/bill_payment_icon.svg";
import CancelIcon from "../../../../../../../assets/cancel_icon.svg";
import "./EstadoDePagoVentaStyle.css";
import { LoadingComponente } from "../../../../../../../components/GenericLoadingComponent/LoadingComponent.jsx";
import { ConfirmationModal } from "./ConfirmationModal/ConfirmaticonModal.jsx";

export function EstadoDePagoVenta({ ventaDetail }) {
    const { setEstadoPagoStyle, 
            fecha_pago,
             estado_pago_data, 
             loading_estado_pago_data,
             AbrirModalConfirmacion,
             ValidarComprobante,
             abrirConfirmacionModal,CerrarModalConfirmacion} = useEstadoDePagoVenta(ventaDetail);

           
 
    if (loading_estado_pago_data) {
        return (
            <div className="detalle-pago-container">
                <p><strong>Pago</strong></p>
                <div className="detalle-pago">
                    <div className="carga-estado-pago">
                        <LoadingComponente width={25} height={25} />
                    </div>
                </div>
            </div>
        );
    }

    if (!estado_pago_data) {
        return null;
    }

    const { metodo_pago, estado_pago, fecha_pago: fechaPago, comprobante } = estado_pago_data;

    return (
        <div className="detalle-pago-container">
            <p><strong>Pago</strong></p>
            <div className="detalle-pago">
                <p>Método: <span>{metodo_pago}</span></p>
                <p>Estado: <span style={setEstadoPagoStyle()}>{estado_pago}</span></p>

                {fechaPago && (
                    <p className="Fecha-Pago">
                        Fecha: <strong>{fecha_pago}</strong>
                    </p>
                )}

                {/* Comprobantes de pago según el estado */}
                {estado_pago === "Aprobado" && metodo_pago === "Transferencia" && (
                    <div className='comprobante-validado'>
                        <img src={BillChecked} alt="upload icon" className='image' />
                        <span><strong> Comprobante Validado </strong></span>
                    </div>
                )}

                {estado_pago === "Cancelado" && metodo_pago === "Transferencia" && (
                    <div className='comprobante-validado'>
                        <img src={CancelIcon} alt="upload icon" className='image' />
                        <span><strong>El pago fue cancelado</strong></span>
                    </div>
                )}

                <ConfirmationModal Abierto={abrirConfirmacionModal} Cerrado={CerrarModalConfirmacion} onConfirm={ValidarComprobante} />

                
                {estado_pago_data && <MostrarComprobante ventaDetail={ventaDetail} comprobante={comprobante} />}
                { estado_pago_data.estado_pago==="Pendiente de pago" && comprobante &&
                <button className='boton-validar-comprobante-pago' onClick={AbrirModalConfirmacion}> Validar Comprobante </button>  }

            </div>
        </div>
    );
}
