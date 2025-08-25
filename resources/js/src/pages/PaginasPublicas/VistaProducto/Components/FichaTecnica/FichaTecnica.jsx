import React, { useState } from "react";
import "./FichaTecnicaStyle.css"
import {Agenda3d} from "../../../../../components/Generic3dImage/Agenda3d"
import { Agenda3dModal } from "../Agenda3dModal/Agenda3dModal";

export const FichaTecnica = ({Datos})=>{

    const datos= Datos;
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
                           {titulo:'codigo:' , value:datos.codigo},
                           {titulo:'modelo:' , value:datos.modelo},
                           {titulo:'Categoria:' , value:datos.categoria.nombre},
                           {titulo:'Marca:' , value:datos.marca.nombre}
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
            {(datos.alto || datos.ancho || datos.profundidad || datos.peso || datos.color)&&       
            <div className="specifications">
                <h2 className="titulo">Especificaciones</h2>
                        <ul className="specs-box">
                            {[
                                {titulo:'alto:' , value: datos.alto},
                                {titulo:'ancho:' , value: datos.ancho},
                                {titulo:'profundidad:' , value: datos.profundidad},
                                {titulo:'color:' , value: datos.color},
                                {titulo:'peso:' , value: datos.peso}
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
