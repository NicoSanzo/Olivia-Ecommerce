
import "./BotonAgregarAlCarritoDetailStyle.css";
import AgregarAlcarrito from "../../../../../assets/shopping_cart_button.svg"
import { useAddCarrito } from "../../../../../Context/addCarritoContext.jsx";


export const BotonAgregarAlCarritoDetail=({data}) => {
  

    const {agregarProductoAlCarrito,arrayProductsCarrito}= useAddCarrito();
  
    return (

        <div className="Container-Agrega-Carrito-Button-detail">
         
           {arrayProductsCarrito.map((item)=>{
              if(data.itemKey===item.itemKey && item.stock > 0 ){           
                return <div className="Cantidad-Agregada-detail" key={item.itemKey}>{item.cantidadSeleccionada}</div>
              }
              
          })}

        <button className='AgregarAlCarrito-detail' onClick={()=>{agregarProductoAlCarrito(data)}}>
          <p>Agregar al carrito</p>
          <img src={AgregarAlcarrito} alt="" />
        </button>
        
        </div>
  )
}