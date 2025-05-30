import { useAddCarrito } from "../../../../../Context/addCarritoContext";
import "./ProductCarritoCardStyle.css";


export function ProductCarritoCard({datosProducto}) {

    const {EliminarProductoCarrito} = useAddCarrito();
    const {AgregarStock} = useAddCarrito();
    const {RestarStock} = useAddCarrito();

    return (
        <>
            <div className="Product-Carrito-card">
                <div className="image-container">
                    <img className="product-image" src={datosProducto.data.data.imagen} loading="lazy" />
                </div>
                <h2 className="tituloStyle"> {datosProducto.data.data.titulo}</h2>
                <h2 className="stylePrice" > $ {datosProducto.data.data.price} </h2>

                <div className="container-spin-button">
                    <div className="custom-spin-button">
                        <button 
                            type="button" 
                            className="decrement" 
                            onClick={()=>RestarStock(datosProducto.data.data.itemKey)}>
                            -
                        </button>
                            <input type="number" value={datosProducto.stock} disabled  />
                        <button 
                            type="button" 
                            className="increment" 
                            disabled={datosProducto.data.data.stock == datosProducto.stock }
                            style={{backgroundColor: datosProducto.data.data.stock == datosProducto.stock  ? "#dddddd" : "#FDC7E8"} } 
                            onClick={()=>AgregarStock(datosProducto.data.data.itemKey)}>
                            +
                        </button> 
                    </div>
                    <h2 className="stock-disponble">Stock disponible: {datosProducto.data.data.stock}</h2>
                </div>
               
                <button type="button" className="delete-button" onClick={()=>EliminarProductoCarrito(datosProducto.data.data.itemKey)} > x</button>   
                

            </div>
            
        </>
    )
}
