import FacturaIcon from "../../../../../../assets/factura_icon.svg"
import downloadIcon from "../../../../../../assets/download_icon_pink.svg"
import { Tooltip } from "../../../../../../components/GenericTooltip/Tooltip"
import { UseInformacionDeCompras } from "./useInformacionDeCompras"
import "./InformacionDeComprasStyle.css";


export function InformacionDeCompras({compraDetail}) {

    const {factura}=UseInformacionDeCompras(compraDetail);

    return (
        
        <div className="factura-container">
             <p><strong>Informacion de compras</strong></p>  

             <div className="factura-card" >
             {factura?
                 <div className="data-factura">
                     <div className="img-container">   
                         <img src={FacturaIcon}></img>
                     </div>
                     <p> Factura disponible</p>  
                     <a className="button-descargar" href={factura} download="factura.pdf">
                         <img src={downloadIcon} alt="Descargar factura" />
                         <Tooltip descripcion="descargar"/>
                    </a>
                 </div>
                 :
                 <p>No se cargaron Facturas</p> 
             }
              </div>     
        </div>   
    )
}
