
import { LoadingComponente } from "../../../components/GenericLoadingComponent/LoadingComponent";
import { Aprobado } from "./components/Aprobado/Aprobado";
import { EnProceso } from "./components/EnProceso/EnProceso";
import { Rechazado } from "./components/Rechazado/Rechazado";
import "./EstadoCompraStyle.css";
import { useEstadoCompra } from "./useEstadoCompra";


export function EstadoCompra() {
  

const {visible,data,productos,query,pago,error,MPPaymentId}=useEstadoCompra();


window.scrollTo({ top: 0, behavior: 'smooth' });


if(!query || !MPPaymentId){
  return(
   <div>'no existe la pagina buscada'</div> 
  )
}

if(error){
  return(
   <div>{error.message}</div> 
  )
}

if (!pago) return <LoadingComponente width={50} height={50}/>

  return (
  <>
   {
    
    <div className={`compra-container-opaco ${visible ? 'visible' : ''}`}>
     
      {data[0].Estado==='Aprobado'?
        <Aprobado/>
      : data[0].Estado==='En proceso'?
         <EnProceso/>
      :
        <Rechazado/>
      }
      
      {data[0].Estado==='Aprobado' && <p className='compra-text-mail-container'> El detalle de la orden ha sido enviado a {data[0].Email}</p> }
      <div className={`data-compra-container ${data[0].Estado==='Aprobado'? 'success': data[0].Estado==='En proceso'?'in-process': 'rejected'}`}>
        <div className="products-data-compra-container">
          {productos?.map((producto,index)=>{
            return(
              <div key={index} className="products-data-compra-container-card"  >
                <div className="products-data-compra-container-image">
                  <img className="product-image" src={producto.imagen_publicacion}  loading="lazy" />
                  </div>
                  <h2 className="products-data-compra-title"> {producto.titulo_publicacion} </h2>
                  <h2 className="products-data-compra-price" > {producto.precio_unitario} </h2>
                  <h2 className="products-data-compra-title-stock">{producto.cantidad}  </h2>               
              </div>
            )
          })}
          <hr className="separation-line" />     
          {data.map((dato, index) => (
            <div key={index} className="payment-resumen-box">
              {Object.entries(dato).map(([key, value]) => (
                key !== 'Total' && key !== 'Email' && !(key==='Envio' && value===null) &&
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
              <span className="payment-resumen-dato-total-value"> {data[0]?.Total} </span>
          </div>
        </div>
      </div>    


    </div>   
  }
  </>
  );
}