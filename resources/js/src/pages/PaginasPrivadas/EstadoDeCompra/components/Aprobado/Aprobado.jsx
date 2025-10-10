import { useEstadoCompra } from "../../useEstadoCompra"
import './AprobadoStyle.css'

export function Aprobado() {

    const {visible,checkedVisible}= useEstadoCompra()
    return (
        <>
            <div className={`compra-success-container ${visible ? 'visible' : ''}`}>
                <div className='compra-success-logo-container'>
                    <div className="checkbox-wrapper-31">
                        <input checked={checkedVisible} type="checkbox" readOnly/>
                            <svg viewBox="0 0 35.6 35.6">
                              <circle className="background" cx="17.8" cy="17.8" r="17.8"></circle>
                              <circle className="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
                              <polyline className="check" points="11.79 18.12 15.55 22.23 25.17 12.87"></polyline>
                            </svg>
                        </div>
                    </div> 
                </div>
            <div className={`data-payment-status-container ${visible ? 'visible' : ''}`}>
                <p className='text-payment-status'>Pago realizado con éxito</p>
            </div>

             
        </>

    )
}



