import React, { useEffect, useRef } from "react";
import "./ProductBoxStyle.css";


export const Productbox = ({childrenCard,EffectInicialPoint,effectEndPoint}) =>{
        
        const Contenedor=useRef(null);
        
        

        const efectoinicial = ()=>{        
                if(scrollY<EffectInicialPoint){ 
                  Contenedor.current.style.transform="translateY(30px)"; 
                  Contenedor.current.style.transition="none" ;
                 }              
        }

        const efectofinal = ()=>{ 
                if(scrollY>effectEndPoint){ 
                 Contenedor.current.style.transform="translateY(0px)"; 
                 Contenedor.current.style.transition="transform 1s ease-out";    
                }
        }

        useEffect(()=>{
                window.addEventListener("scroll",efectoinicial)      
                return ()=>{
                window.removeEventListener("scroll",efectoinicial)  
                }
            },[EffectInicialPoint])

            useEffect(()=>{
                window.addEventListener("scroll",efectofinal)        
                return ()=>{
                window.removeEventListener("scroll",efectofinal)  
                }
            },[effectEndPoint])

    return(
        <>
          <div className="contenedorDeProductos" ref={Contenedor} >
                {
                        childrenCard.map((childrens)=>(
                                childrens
                        ))   
                }
          </div>
        </>
        
    )}



