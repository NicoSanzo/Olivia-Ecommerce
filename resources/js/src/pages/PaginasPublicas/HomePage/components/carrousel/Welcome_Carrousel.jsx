
import React from "react";
import {Carrousel} from "../../../../../components/GenericCarrousel/Carrousel.jsx";
import "./style.css";
import {images} from "./imagenes.js"


export const Welcome_Carrousel =()=>{
   return (
       <>
         <section className="welcome">
            <Carrousel ImagenesCarrousel= {images} autoslide={true} />
         </section>
       </>
      
   )
}

   