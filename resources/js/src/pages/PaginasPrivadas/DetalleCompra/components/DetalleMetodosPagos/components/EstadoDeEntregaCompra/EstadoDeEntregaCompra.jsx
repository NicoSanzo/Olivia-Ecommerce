import { DomicilioEnvioCompra } from "./domicilioEnvioCompra/domicilioEnvioCompra";
import "./EstadoDeEntregaCompraStyle.css";


export function EstadoDeEntregaCompra({compraDetail}) {


    return (
        <div className="detalle-entrega-container" >
            <p><strong>Entrega</strong></p>
            <div className="detalle-entrega">
                { compraDetail &&
                <>
                     <p> Método: 
                        {compraDetail.data[0].forma_envio ==="Acordar" ?
                        <span> Acordar con el vendedor </span>
                        : compraDetail.data[0].forma_envio ==="Envio" ?
                        <span> Envío</span>           
                        :
                        <span>No se encontraron registros</span>
                        }  
                    </p>
                    {compraDetail.data[0].forma_envio ==="Envio" &&  
                     <DomicilioEnvioCompra/>
                    }   
                </>  
                }          
            </div>    
        </div>
    )
}
