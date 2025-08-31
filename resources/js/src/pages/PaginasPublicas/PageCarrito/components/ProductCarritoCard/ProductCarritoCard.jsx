import { useAddCarrito } from "../../../../../Context/addCarritoContext";
import "./ProductCarritoCardStyle.css";


export function ProductCarritoCard({item}) {

    const {eliminarProductoCarrito,AgregarStock,RestarStock} = useAddCarrito();
    


    return (
        <>
            <div className="product-carrito-card">
                <div className="image-container-product-carrito-card">
                    <img className="product-image-product-carrito-card" src={item.imagen} loading="lazy" />
                </div>
                <h2 className="tituloStyle-product-carrito-card"> {item.titulo}</h2>
                <h2 className="stylePrice-product-carrito-card" > $ {item.precio} </h2>

                <div className="container-spin-button-product-carrito-card">
                    <div className="custom-spin-button-product-carrito-card">
                        <button 
                            type="button" 
                            className="decrement-product-carrito-card" 
                            onClick={()=>RestarStock(item.itemKey)}>
                            -
                        </button>
                            <input type="number" value={item.cantidadSeleccionada} disabled  />
                        <button 
                            type="button" 
                            className="increment-product-carrito-card" 
                            disabled={item.stock == item.cantidadSeleccionada }
                            style={{backgroundColor: item.stock == item.cantidadSeleccionada  ? "#dddddd" : "#FDC7E8"} } 
                            onClick={()=>AgregarStock(item.itemKey)}>
                            +
                        </button> 
                    </div>
                    <h2 className="stock-disponble-product-carrito-card"> Stock disponible: {item.stock}</h2>
                </div>

                <button type="button" className="delete-button-product-carrito-card" onClick={()=>eliminarProductoCarrito(item.itemKey)} > x</button>   


            </div>
            
        </>
    )
}
