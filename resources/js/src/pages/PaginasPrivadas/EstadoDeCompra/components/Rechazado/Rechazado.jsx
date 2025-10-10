import { useEstadoCompra } from "../../useEstadoCompra";
import './RechazadoStyle.css';

export function Rechazado() {

  const { visible, checkedVisible } = useEstadoCompra();

  return (
    <>
      <div className={`compra-error-container ${visible ? 'visible' : ''}`}>
        <div className='compra-error-logo-container'>
          <div className="checkbox-wrapper-31 danger">
            <input checked={checkedVisible} type="checkbox" readOnly />
            <svg viewBox="0 0 35.6 35.6" aria-hidden="true">
              <circle className="background" cx="17.8" cy="17.8" r="17.8"></circle>
              <circle className="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
              {/* dos lineas para formar la X */}
              <line className="x-line" x1="11" y1="11" x2="24.6" y2="24.6" />
              <line className="x-line" x1="24.6" y1="11" x2="11" y2="24.6" />
            </svg>
          </div>
        </div>
      </div>

      <div className={`data-payment-status-error-container ${visible ? 'visible' : ''}`}>
        <p className='text-payment-status error'>Pago rechazado</p>
        <p className='additional-text-payment-status-error'>
          * Para más información consulte el detalle de su compra
        </p>
      </div>
    </>
  );
}

