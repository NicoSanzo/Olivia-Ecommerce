import "./ComprasStyle.css";
import { BuyCard } from "./components/buyCard/BuyCard";
import { UseCompras } from "./UseCompras";
import { LoadingComponente } from "../../../components/GenericLoadingComponent/LoadingComponent";



export function Compras() {

  const {DataCompras,loading}=UseCompras();

    return (
        <>
        
        <div className="father-container">
            
             { loading? <LoadingComponente width={50} height={50}/>:
                
                 <div className="pagecompras-principal-container">
                     <h2 className="compras-titulo">Compras</h2>
                
                 {DataCompras && DataCompras.data ?
                     DataCompras.data.map((compra)=>{
                     return(
                         <BuyCard compraData= {compra} key={compra.numero}/>
                    )}):
                    
                    <p>No se realizaron Compras</p>
                 }
                 </div>
             }    
        
        </div>
         
        </>
        
    )
    
}
