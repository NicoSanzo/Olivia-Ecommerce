import React from "react";
import "./PublicacionesCardStyle.css"
import { usePublicacionCard } from "./usePublicacionesCard";
import { ModifyPublicationButton } from "../ModifyPublicationButton/ModifyPublicationButton";
import { DeletePublicationButton } from "../DeletePublicationButton/DeletePublicationButton";
import { PausePublicationButton } from "../PausePublicationButton/PausePublicationButton";
import { ActivePublicationButton } from "../ActivePublicationButton/ActivePublicationButton";



export const PublicacionesCard = ({imagen,titulo,price,itemKey,stock,paused,ActualizarPublicaciones}) =>{


  const {
    mostrarDetalleProducto,
   
   } = usePublicacionCard	({itemKey,titulo,ActualizarPublicaciones});



 return(
        <>
            
                <div className={`publicacion-card ${paused === '1'? 'paused' : ''}`} onClick={mostrarDetalleProducto} >
                    <div className="image-container">
                      <img className="product-image" src={imagen} loading="lazy" />
                    </div>
                    <div className="tituloStyle">{titulo}</div>
                    <div className="stylePrice" > $ {price}</div>
                    <div className="stockStyle">Stock: {stock}</div>  
                    <div className="buttons-container" >
                  
                      <ModifyPublicationButton itemKey={itemKey} ActualizarPublicaciones={ActualizarPublicaciones}/>  
                      
                      {paused==='1' ? 
                          <ActivePublicationButton itemKey={itemKey} ActualizarPublicaciones= {ActualizarPublicaciones} /> :
                          <PausePublicationButton itemKey={itemKey} ActualizarPublicaciones= {ActualizarPublicaciones}/> 
                      }
                      <DeletePublicationButton itemKey={itemKey} ActualizarPublicaciones={ActualizarPublicaciones}/>

                  </div>
                  {paused === '1' && stock === '0' && <p className="pause-text"> Publicación pausada: SIN STOCK  </p>}
                  {paused === '1' && stock > '0' && <p className="pause-text"> Publicación pausada: POR USUARIO  </p>}
                </div>
                
            
        </>

 )

}