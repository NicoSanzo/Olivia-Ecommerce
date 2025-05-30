
import "./CarritoStyle.css";
import { ShopProductCard } from "./components/shopProductCard";
import { useAddCarrito } from "../../../../../Context/addCarritoContext";
import { useEffect, useState } from "react";
import {Link} from "react-router-dom";





export function Carrito() {


    const{arrayProductsCarrito} = useAddCarrito()
    const {total}= useAddCarrito()
    const {cantidaditemsCarrito} =useAddCarrito();
    const {EliminarTodoElCarrito} =useAddCarrito();

    


    return (
        <>
        <div className="Carrito-principal-Container">

        <Link to="/carrito">
            <div className="shopping-cart">
                <input type="text" name="shopping-cart-count" className="shopping-cart-count" value={cantidaditemsCarrito} readOnly />
            </div>
        </Link>  
            <div className="Products-Container"> 
            <div className="punta"></div> 
                 {arrayProductsCarrito.length>0?  arrayProductsCarrito.map((itemProducto)=>{
                   
                  return(
                    <ShopProductCard dataProducto={itemProducto} key={itemProducto.data.data.itemKey}/>
                  )
                  
                 }):<h2 className="empty-cart">Su carrito esta vacio</h2>}
                
                <div className="footer-container">
                    <button className="vaciar-carrito" onClick={EliminarTodoElCarrito}>Vaciar carrito</button>
                    <h2 className="total">Total: ${total.toFixed(2)}</h2>  {/* Calula el total del carrito (Tofixed() limita la cantidad de decimales) */}
                </div>
            </div> 
            
        </div>
             

        </>
    )
}
