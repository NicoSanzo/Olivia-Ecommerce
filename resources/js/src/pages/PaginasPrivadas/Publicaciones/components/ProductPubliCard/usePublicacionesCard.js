
import { useNavigate } from "react-router-dom";




export const usePublicacionCard = ({itemKey,titulo}) => {
    
    const navigate = useNavigate();
    
    
    const mostrarDetalleProducto = () =>{
     
      navigate(`/productos/productoDetail?${titulo}&ID=${itemKey}`);
    }
    
 
    return ({
        
            mostrarDetalleProducto,
            
    })
};