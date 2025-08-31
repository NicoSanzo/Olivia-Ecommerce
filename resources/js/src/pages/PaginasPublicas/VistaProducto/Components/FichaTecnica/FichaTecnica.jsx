import React, { useState } from "react";
import "./FichaTecnicaStyle.css"
import {Agenda3d} from "../../../../../components/Generic3dImage/Agenda3d"
import { Agenda3dModal } from "../Agenda3dModal/Agenda3dModal";

export const FichaTecnica = ({Datos})=>{

    
    const [isModificationModalOpen, setIsModificationModalOpen] = useState(false);

    
    const AbrirAgenda3d=()=>{
        setIsModificationModalOpen(true);
    }
 
    const closeModal =()=>{
    setIsModificationModalOpen(false);
   }
    return(

        <>
            <div className="specifications">
                   <h2 className="titulo">Características Principales</h2>
                   <ul className="specs-box">
                       {[
                           {titulo:'codigo:' , value:Datos.codigoProducto},
                           {titulo:'modelo:' , value:Datos.modelo},
                           {titulo:'Categoria:' , value:Datos.categoria},
                           {titulo:'Marca:' , value:Datos.marca}
                           ].map((carc_generales,index)=> (
                            carc_generales && (
                            <li className="item-box" key={index}>
                            <h2 className="item-title">{carc_generales.titulo}</h2>
                            <h2>{carc_generales.value}</h2>
                           </li> 
                           )
                       ))}        
                   </ul>
            </div>
            {(Datos.alto || Datos.ancho || Datos.profundidad || Datos.peso || Datos.color)&&       
            <div className="specifications">
                <h2 className="titulo">Especificaciones</h2>
                        <ul className="specs-box">
                            {[
                                {titulo:'alto:' , value: Datos.alto},
                                {titulo:'ancho:' , value: Datos.ancho},
                                {titulo:'profundidad:' , value: Datos.profundidad},
                                {titulo:'color:' , value: Datos.color},
                                {titulo:'peso:' , value: Datos.peso}
                            ].map((spec,index)=>(
                                spec.value && (
                                 <li className="item-box" key={index}>
                                    <h2 className="item-title">{spec.titulo}</h2>
                                    <h2>{spec.value}</h2>
                                </li> 
                                )
                            ))}      
                        </ul>
                    
            </div>   
            }
            <div className="contendor-boton-agenda">    
                <button className="DiseñarAgenda" onClick={AbrirAgenda3d}></button>
                <h2>Diseñá Tu Agenda</h2>
            </div> 

            <Agenda3dModal isOpen={isModificationModalOpen} onClose={closeModal}>
                    <Agenda3d/> 
            </Agenda3dModal>
         
        </>
    )
}
