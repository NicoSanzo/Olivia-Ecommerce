import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";




export const usePublicacionCard = ({itemKey,titulo,ActualizarPublicaciones}) => {
    
    const navigate = useNavigate();
    
    
    const mostrarDetalleProducto = () =>{
     
      navigate(`/productos/productoDetail?${titulo}&ID=${itemKey}`);
    }
    
 
    return ({
        
            mostrarDetalleProducto,
            
    })
};