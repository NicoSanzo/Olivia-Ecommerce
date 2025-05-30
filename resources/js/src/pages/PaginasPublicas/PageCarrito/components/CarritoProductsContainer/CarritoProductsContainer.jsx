import React from "react";
import "./CarritoProductsContainerStyle.css";
import { UseCarritoProductsContainer } from "./useCarritoProductsContainer";
import { ProductCarritoCard } from "../ProductCarritoCard/ProductCarritoCard";
import emptyShoppingCart from "../../../../../assets/empty_shopping_cart.svg"
import { Link } from "react-router-dom";


export function CarritoProductsContainer() {


    const {arrayProductsCarrito,EliminarTodoElCarrito} = UseCarritoProductsContainer();

    return (
        <>

         <div className="products-carrito-container">
                 <h2 className="titulo"> Productos</h2>
                <div className="Products-container">
                    {arrayProductsCarrito.length > 0 ? (
                        arrayProductsCarrito.map((item) => (
                            <ProductCarritoCard 
                                datosProducto={item} 
                                key={item.data.data.itemKey}
                            />
                        ))
                    ) : (
                        <div className="empty-container">
                             <img src={emptyShoppingCart} alt="No hay Productos" />
                             <h2> Su carrito esta vacio</h2>
                             <Link to="/Productos"><button>Descubrir Productos</button></Link>
                        </div>
                    )}
                </div>
                 <div className="carrito-page-footer">
                     <button 
                        className="vaciar-carrito-page-button"
                        onClick={EliminarTodoElCarrito}
                        disabled={arrayProductsCarrito.length === 0 }
                        style={{backgroundColor:arrayProductsCarrito.length === 0 ? "#dddddd": "#FDC7E8 "}}
                        >
                        Vaciar Carrito
                    </button>
                 </div>
            </div>
            
        </>
    )
}
