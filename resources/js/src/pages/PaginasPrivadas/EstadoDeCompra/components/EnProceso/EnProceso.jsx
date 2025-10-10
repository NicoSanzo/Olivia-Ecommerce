import { useEstadoCompra } from "../../useEstadoCompra";
import "./EnProcesoStyle.css";

export function EnProceso() {
  const { visible, checkedVisible } = useEstadoCompra();

  return (
    <>
      <div className={`compra-enproceso-container ${visible ? "visible" : ""}`}>
        <div className="compra-enproceso-logo-container">
          <div className="checkbox-wrapper-31 Enproceso">
            <input checked={checkedVisible} type="checkbox" readOnly />
            <svg viewBox="0 0 35.6 35.6" aria-hidden="true">
              <circle className="background" cx="17.8" cy="17.8" r="17.8" />
              <circle className="stroke" cx="17.8" cy="17.8" r="14.37" />
              {/* Signo de exclamación: trazo + punto */}
              <line className="exclam-line" x1="17.8" y1="10.2" x2="17.8" y2="20.8" />
              <circle className="exclam-dot" cx="17.8" cy="25.2" r="1.6" />
            </svg>
          </div>
        </div>
      </div>

      <div className={`data-payment-status-container-en-proceso ${visible ? "visible" : ""}`}>
        <p className="text-payment-status-en-proceso">Pago en proceso</p>
        <p className="additional-text-payment-status-en-proceso">
          * Estamos validando tu pago. Esto puede demorar unos minutos…
        </p>
      </div>
      
    </>
  );
}