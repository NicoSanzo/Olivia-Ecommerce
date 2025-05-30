import FacturaIcon from "../../../../../../assets/factura_icon.svg"
import downloadIcon from "../../../../../../assets/download_icon_pink.svg"
import { Tooltip } from "../../../../../../components/GenericTooltip/Tooltip"
import "./AdjuntarFacturaDetalleVentaStyle.css";
import { useAdjuntarFacturaDetalleVenta } from "./useAdjuntarFacturaDetalleVenta";
import { SubirFactura} from "./SubirFactura/SubirFactura";


export function AdjuntarFacturaDetalleVenta({ventaDetail}) {


    return (
        
        <div className="factura-container">
             <p><strong>Factura</strong></p>  
             <SubirFactura ventaDetail={ventaDetail} />
                
        </div>   
    )
}
