import { LoadingComponente } from "../../../../../../../../components/GenericLoadingComponent/LoadingComponent";
import "./domicilioEnvioCompraStyle.css";
import { UseDomicilioEnvioCompra } from "./useDomicilioEnvioCompra";




export function DomicilioEnvioCompra() {

    const {data_dom,loading_data_dom}= UseDomicilioEnvioCompra();



    return (
        <>
    {loading_data_dom && <LoadingComponente width={20} height={20}/>}
    {data_dom && data_dom.data &&
        
        <div className="Datos-Envio">
            <h2>Datos</h2>
            <div className="datos-dom">
                <p className="label">Dirección: </p>
                <p>{data_dom.data.direccion}</p> 
            </div>
            <div className="datos-dom">
                <p className="label">Localidad: </p>
                <p>{data_dom.data.localidad}</p> 
            </div>
            <div className="datos-dom">
                <p className="label">Provincia: </p>
                <p>{data_dom.data.provincia}</p> 
            </div>
            <div className="datos-dom">
                <p className="label">Código Postal: </p>
                <p>{data_dom.data.codigo_postal}</p> 
            </div>
            
           
        </div>
    }
    </>
    )
}
