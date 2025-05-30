import "./MetodosDePagoStyle.css";

import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
initMercadoPago('APP_USR-33489a3f-ad63-4050-817b-cd8f80bc6573');
import {LoadingComponente} from "../../../../../components/GenericLoadingComponent/LoadingComponent.jsx"
import { UseMetodosDePago } from "./useMetodosDePago";
import {Link} from "react-router-dom"
import { CustomCheckbox } from "../../../../../components/GenericCheckbox/CheckBox";
import { CompraExitosa } from "../../../../PaginasPrivadas/CompraExitosa/CompraExitosa";

export function MetodosDePago() {


const {handleChangeOpcionesPago,
       setTerminosCondiciones,
       handleRealizarCompraTransfer, 
       isSubmitted,
       errors,
       metodo_pago,
       handleFinalizarCompra,
       validacionExitosa,
       IDMercadopago,
       isTokenValid,
       loading_MP,
       abrirCompraExitosa}= UseMetodosDePago();

const style = isSubmitted && errors && (errors.metodo_pago || errors.terminos) ? { border: "1px solid red" } : {};


    return (
        <>
    
            <div style={style} className="metodos-pago-container">
                    <h2 className="titulo"> Metodos De Pago</h2>
                <div className="container-metodos-pago">
                    <div className="Metodos-Pago"> 
                        <input 
                            type="radio"
                            name="metodo_pago" 
                            value="Transferencia" 
                            onChange={handleChangeOpcionesPago}
                            />
                        <h2 className="pago">Paga con transferencia bancaria (10% OFF)</h2>
                        
                    </div>
                    <div className="Metodos-Pago"> 
                        <input 
                            type="radio"
                            name="metodo_pago" 
                            value="Mercadopago" 
                            onChange={handleChangeOpcionesPago}
                            />
                        <h2 className="pago">Mercadopago</h2>
                    </div>

                    {isSubmitted==true && errors && errors.metodo_pago &&
                <span style={{"color":"red"}}>  {errors.metodo_pago} </span>
                }
                    
                </div>
                
                <div className="checkbox">
                    <CustomCheckbox 
                        label="He leído y acepto los" 
                        value={setTerminosCondiciones}
                        /> 
                        <Link>Términos y Condiciones</Link>

                </div> 
                    {isSubmitted==true && errors && errors.terminos &&
                            <span style={{"color":"red"}}>  {errors.terminos} </span>
                    }

                {validacionExitosa==true && metodo_pago==="Transferencia" && isTokenValid?
                    <div id="wallet_container">
                        <button 
                            className="pagar-transfer-button"     
                            onClick={handleRealizarCompraTransfer}  
                        >
                        Pagar con Transferencia
                        </button> 
                    </div>:
                loading_MP? <LoadingComponente width={20} height={20} />:
                validacionExitosa==true && metodo_pago==="Mercadopago" && IDMercadopago ? 
                    <div id="wallet_container">  
                        <Wallet 
                            initialization= {{ 
                                            preferenceId: IDMercadopago,
                                            redirectMode: 'modal' }} 
                    
                             customization={{ texts:{ 
                                                    valueProp: 'security_details',
                                                    action:'pay'
                                                    }, 
                                             visual: {
                                                        buttonBackground: 'black',
                                                        valuePropColor:"grey",
                                                        verticalPadding:'8px',                                 
                                                     },
                                                }}                      
                        />
                    </div>  : 
                    <button 
                         className="terminar-comprar-button"     
                          onClick={handleFinalizarCompra}  
                    >
                    Finalizar compra
                    </button> }    
                               
                    {abrirCompraExitosa===true && <CompraExitosa/>}
            </div>
 
        </>
    )
}