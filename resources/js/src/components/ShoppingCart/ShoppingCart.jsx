import "./ShoppingCartStyle.css"
import React from "react"


export const ShoppingCart = () =>{
    return(
    <>
           <div className="shopping-cart">
                <input type="text" name="shopping-cart-count" className="shopping-cart-count" value="0" readOnly />
           </div>
    
    </>

    )
}


