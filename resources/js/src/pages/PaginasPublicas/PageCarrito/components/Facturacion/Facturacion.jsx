import React from "react"
import "./FacturacionStyle.css";
import { UseFacturacion } from "./useFacturacion";
import { LoadingComponente } from "../../../../../components/GenericLoadingComponent/LoadingComponent";
import { ModalDatosFis } from "./ModalDatosFiscales/ModalDatosFis";


export function Facturacion() {
    
    const { data, isLoading, Abrir_Mod_DomFis_User, onClose, AbrirEditableDomFis, setTriggerFetch,isSubmitted,errors } = UseFacturacion();
   

    const style = errors && errors.datosFacturacion ? { border: "1px solid red" } : {};

    return (
        <div style={style} className="facturacion-container">
            <h2 className="titulo">Facturación</h2>
            
            {/* Indicador de carga */}
            {isLoading ? (
                <LoadingComponente width={20} height={20} />
            ) : (
                data && data.fiscal_data && (
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
                            <p>{data.cliente_data.nombre} {data.cliente_data.apellido}</p>
                        </div>

                        <div className="Datos">
                            <h2>DNI:</h2>
                            <p>{data.cliente_data.dni}</p>
                        </div>

                        <div className="Datos">
                            <h2>Domicilio de facturación:</h2>
                            {data.fiscal_data.direccion ? (
                                <>
                                    <p>{data.fiscal_data.direccion},</p>
                                    <p>CP: {data.fiscal_data.codigo_postal},</p>
                                    <p>{data.fiscal_data.localidad},</p>
                                    <p>{data.fiscal_data.provincia}</p>
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
