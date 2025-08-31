import "./shopProductCardStyle.css";
import { useAddCarrito } from "../../../../../../Context/addCarritoContext";

export function ShopProductCard({item}) {


    const {eliminarProductoCarrito} =useAddCarrito();

    return (
        <>
             <div className="shop-product-card"  >
                    <div className="image-container-shop-product-card">
                      <img className="product-image" src={item.imagen} loading="lazy" />
                    </div>
                    <h2 className="tituloStyle-shop-product-card">{item.titulo} </h2>
                    <h2 className="stylePrice-shop-product-card" > $ {item.precio}</h2>
                    <h2 className="stockStyle-shop-product-card"> {item.cantidadSeleccionada}</h2>       
                    <button type="button" className="delete-button-shop-product-card" onClick={() => eliminarProductoCarrito(item.itemKey)}>x</button>    
                </div>
        </>
    )
}
