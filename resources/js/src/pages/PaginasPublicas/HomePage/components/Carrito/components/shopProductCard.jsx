import React from "react";
import "./shopProductCardStyle.css";
import { useAddCarrito } from "../../../../../../Context/addCarritoContext";

export function ShopProductCard({dataProducto}) {


    const {EliminarProductoCarrito} =useAddCarrito();

    const handleClick = () => {  
        EliminarProductoCarrito(dataProducto.data.data.itemKey)
    };

    return (
        <>
             <div className="shop-product-card"  >
                    <div className="image-container">
                      <img className="product-image" src={dataProducto.data.data.imagen} loading="lazy" />
                    </div>
                    <h2 className="tituloStyle">{dataProducto.data.data.titulo} </h2>
                    <h2 className="stylePrice" > $ {dataProducto.data.data.price}</h2>
                    <h2 className="stockStyle"> {dataProducto.stock}</h2>       
                    <button type="button" className="delete-button" onClick={handleClick}> x</button>    
                </div>
        </>
    )
}
