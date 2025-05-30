import { useNavigate } from "react-router-dom";
import { useAddCarrito } from "../../../../../Context/addCarritoContext";


export const useBotonComprar = ({data}) => {
     
  
    const {agregarProductoAlCarrito }=useAddCarrito();
    
    const navigate = useNavigate();

    const handleComprarClick = (event) => {
        event.stopPropagation();   /*Provoca que funcione individualmenet el boton*/
        agregarProductoAlCarrito({data});
        navigate("/carrito");
        
    };
  

    return { handleComprarClick }    
};
