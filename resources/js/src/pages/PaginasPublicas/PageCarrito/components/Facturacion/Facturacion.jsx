import React from "react"
import "./FacturacionStyle.css";
import { UseFacturacion } from "./useFacturacion";
import { LoadingComponente } from "../../../../../components/GenericLoadingComponent/LoadingComponent";
import { ModalDatosFis } from "./ModalDatosFiscales/ModalDatosFis";
import { useValidarCompra } from "../../../../../Context/validarComprar";

export function Facturacion() {
    
    const { data, loading, error, Abrir_Mod_DomFis_User, onClose, AbrirEditableDomFis, setTriggerFetch,isSubmitted,errors } = UseFacturacion();
   

    const style = errors && errors.datosFacturacion ? { border: "1px solid red" } : {};

    return (
        <div style={style} className="facturacion-container">
            <h2 className="titulo">Facturación</h2>
            
            {/* Indicador de carga */}
            {loading ? (
                <LoadingComponente width={20} height={20} />
            ) : (
                data && data.data && (
                    <div className="domicilio">
                        {/* Modal para los datos fiscales */}
                        <ModalDatosFis 
                            isOpen={Abrir_Mod_DomFis_User} 
                            onClose={onClose} 
                            data={data} 
                            ActualizarPagina={setTriggerFetch} 
                        />
                        
                        {/* Datos del usuario */}
                        <div className="Datos">
                            <h2>Nombre:</h2>
                            <p>{data.data?.nombre} {data.data?.apellido}</p>
                        </div>

                        <div className="Datos">
                            <h2>DNI:</h2>
                            <p>{data.data?.dni}</p>
                        </div>

                        <div className="Datos">
                            <h2>Domicilio de facturación:</h2>
                            {data.data.direccion ? (
                                <>
                                    <p>{data.data.direccion},</p>
                                    <p>CP: {data.data.codigo_postal},</p>
                                    <p>{data.data.localidad},</p>
                                    <p>{data.data.provincia}</p>
                                </>
                            ) : (
                                <span style={{ color: 'red' }}>Incompleto</span>
                            )}
                            <button className="editar-dom-fis" onClick={AbrirEditableDomFis}>Editar</button>
                        </div>
                        { errors && errors.datosFacturacion &&
                             <span style={{"color":"red"}}>  {errors.datosFacturacion} </span>}
                    </div>
                )
            )}
        </div>
    );
}
