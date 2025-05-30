import React from "react";
import "./EntregaStyle.css";
import { UseEntrega } from "./useEntrega";
import { useValidarCompra } from "../../../../../Context/validarComprar";


export function Entrega() {

const {handleEntrega}= UseEntrega()
const {isSubmitted,errors } = useValidarCompra()

const style = isSubmitted && errors && errors.entrega ? { border: "1px solid red" } : {};

    return (
        <>
             <div style= {style} className="entrega-container">
                    <h2 className="titulo">Entrega</h2>

                    <div className="container-metodos-entrega">
                    <div className="metodos-entrega"> 
                        <input 
                            type="radio"
                            name="metodo_entrega" 
                            value="Acordar" 
                            onChange={handleEntrega}
                            
                            />
                        <h2 className="entrega">Acordar con el vendedor</h2>       
                    </div>

                    <div className="metodos-entrega"> 
                        <input 
                            type="radio"
                            name="metodo_entrega" 
                            value="Envio" 
                            onChange={handleEntrega}
                            />
                        <h2 className="entrega"> Envio a domicilio</h2>
                    </div>
                    
                </div>
                {isSubmitted==true && errors && errors.entrega &&
                <span style={{"color":"red"}}>  {errors.entrega} </span>
                }
             </div>
        </>
    )
}
