
import { ShopProductCard } from "../../PaginasPublicas/HomePage/components/Carrito/components/shopProductCard";
import "./CompraExitosaStyle.css";
import { UseCompraExitosa } from './useCompraExitosa';


export function CompraExitosa() {
  

  const {visible,checkedVisible,data}=UseCompraExitosa();

console.log(data)



  return (
  <>
   {
     <div className={`compra-container-opaco ${visible ? 'visible' : ''}`}>
          <div className={`compra-success-container ${visible ? 'visible' : ''}`}>
         <div className='compra-success-logo-container'>

           <div className="checkbox-wrapper-31">
            
              <input checked={checkedVisible} type="checkbox" readOnly/>
              <svg viewBox="0 0 35.6 35.6">
                <circle className="background" cx="17.8" cy="17.8" r="17.8"></circle>
                <circle className="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
                <polyline className="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
              </svg>
            </div>
            
      </div> 
         {/*<div className='compra-button-container'>
            <button className='compra-close-button-success' onClick={handleClose}>OK</button>
         </div>*/}
       </div>
       <div className={`data-payment-status-container ${visible ? 'visible' : ''}`}>
             <p className='text-payment-status'>Pago realizado con éxito</p>
             <p className='compra-text-success-container'>El detalle de la orden ha sido enviada a test@usuario.com</p>

       </div>
      
        <div className="data-compra-container">
                <div className="products-data-compra-container">
                   <div className="products-data-compra-container-card"  >
                      <div className="products-data-compra-container-image">
                        <img className="product-image"  loading="lazy" />
                      </div>
                      <h2 className="products-data-compra-title"> Lapicera lapicera Lapicera </h2>
                      <h2 className="products-data-compra-price" > $ 3985</h2>
                      <h2 className="products-data-compra-title-stock">2 </h2>               
                    </div>

                <div className={`data-payment-status-container ${visible ? 'visible' : ''}`}>
                
                </div> 

            <hr className="separation-line" />
               
                {data.map((dato, index) => (
                    <div key={index} className="payment-resumen-box">
                      {Object.entries(dato).map(([key, value]) => (
                        <div key={key} className="payment-resumen-dato-linea">
                          <span className="payment-resumen-dato-key">{key}</span>
                          <span className="payment-resumen-dato-value">{value}</span>
                        </div>
                      ))}
                      
                    </div>
                  ))}

               <hr className="separation-line" />    

           <div  className="payment-resumen-dato-linea-total">
                  <span className="payment-resumen-dato-total">Total</span>
                  <span className="payment-resumen-dato-total-value"> $ 80565,65</span>
           </div>

        </div>

      </div>  
      
    </div>   
  }
  </>
  );
}