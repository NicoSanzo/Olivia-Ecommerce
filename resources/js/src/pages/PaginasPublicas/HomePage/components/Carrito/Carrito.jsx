import "./CarritoStyle.css";
import { ShopProductCard } from "./components/shopProductCard";
import { useAddCarrito } from "../../../../../Context/addCarritoContext";
import { Link } from "react-router-dom";

export function Carrito() {
  const {
    cantidaditemsCarrito,
    EliminarTodoElCarrito,
    total,
    arrayProductsCarrito,
  } = useAddCarrito();

  return (
    <>
      <div className="Carrito-principal-Container">
        <Link to="/carrito">
          <div className="shopping-cart">
            <input
              type="text"
              name="shopping-cart-count"
              className="shopping-cart-count"
              value={cantidaditemsCarrito}
              readOnly
            />
          </div>
        </Link>

        <div className="Products-Container">
          <div className="punta"></div>

          {arrayProductsCarrito.length > 0 ? (
            arrayProductsCarrito.map((item,index) => (
                <ShopProductCard item={item} key={item.itemKey} />
            ))
          ) : (
            <h2 className="empty-cart">Su carrito está vacío</h2>
          )}

          <div className="footer-container">
            <button className="vaciar-carrito" onClick={EliminarTodoElCarrito}>
              Vaciar carrito
            </button>
            {/* Calcula el total del carrito (toFixed() limita los decimales) */}
            <h2 className="total">Total: ${total.toFixed(2)}</h2>
          </div>
        </div>
      </div>
    </>
  );
}