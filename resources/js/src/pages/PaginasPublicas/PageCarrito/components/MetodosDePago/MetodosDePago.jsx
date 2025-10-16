import "./MetodosDePagoStyle.css";
import { LoadingComponente } from "../../../../../components/GenericLoadingComponent/LoadingComponent.jsx";
import { UseMetodosDePago } from "./useMetodosDePago";
import { Link } from "react-router-dom";
import { CustomCheckbox } from "../../../../../components/GenericCheckbox/CheckBox";

import { MercadopagoPaymentBrick } from "../../../../../components/MercadopagoPaymentBrick/MercadopagoPaymentBrick.jsx";
import { useValidarCompra } from "../../../../../Context/validarComprar.jsx";

export function MetodosDePago() {

  const { handleChangeOpcionesPago, metodo_pago, handleFinalizarCompra } = UseMetodosDePago();

  const {
    MutateCatchPaymentID,
    isSubmitted,
    errors,
    setTerminosCondiciones,
    validacionExitosa,
    paymentError,
    handleFinalizarTransfer,
    showTransferButton
  } = useValidarCompra();

  const style =
    isSubmitted && errors && (errors.metodo_pago || errors.terminos)
      ? { border: "1px solid red" }
      : {};

  return (
    <div style={style} className="metodos-pago-container">
      <h2 className="titulo">Metodos De Pago</h2>

      <div className="container-metodos-pago">
        <div className="Metodos-Pago">
          <input
            type="radio"
            name="metodo_pago"
            value="Transferencia"
            onChange={handleChangeOpcionesPago}
          />
          <h2 className="pago">Paga con transferencia bancaria (10% OFF)</h2>
        </div>

        <div className="Metodos-Pago">
          <input
            type="radio"
            name="metodo_pago"
            value="Mercadopago"
            onChange={handleChangeOpcionesPago}
          />
          <h2 className="pago">Mercadopago</h2>
        </div>

        {isSubmitted && errors?.metodo_pago && (
          <span style={{ color: "red" }}>{errors.metodo_pago}</span>
        )}
      </div>

      <div className="checkbox">
        <CustomCheckbox label="He leído y acepto los" value={setTerminosCondiciones} />
        <Link>Términos y Condiciones</Link>
      </div>

      {isSubmitted && errors?.terminos && (
        <span style={{ color: "red" }}>{errors.terminos}</span>
      )}
    <div className="wallet-container">
          {/* Botón finalizar compra */}
          {!validacionExitosa || !metodo_pago ? (
            <button className="terminar-comprar-button" onClick={handleFinalizarCompra}>
              Finalizar compra
            </button>
          ) : metodo_pago === "Transferencia" && showTransferButton ? (
            <button className="pagar-transfer-button" onClick={handleFinalizarTransfer}>
              Pagar con Transferencia
            </button>
          ) : metodo_pago === "Mercadopago" ? (
            <>
              {MutateCatchPaymentID.isPending && (
                <LoadingComponente width={30} height={30} />
              )}
              {MutateCatchPaymentID.data?.id && (
                <MercadopagoPaymentBrick />
              )}
            </>
          ) : null}
    </div>


      
      { paymentError && <span className="Payment-Error">{paymentError}</span>}
     
    </div>
  );
}
