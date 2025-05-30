import { useAddCarrito } from "../../Context/addCarritoContext";


export const UseAgregarAlCarrito = ({data}) => {
     
  
    const {agregarProductoAlCarrito }=useAddCarrito();
    const {arrayProductsCarrito} =useAddCarrito();

    const handleCarritoClick = (event) => {
        event.stopPropagation();   /*Provoca que funcione individualmenet el boton*/
        agregarProductoAlCarrito({data});
    };
  
    return { handleCarritoClick,arrayProductsCarrito }    
};
