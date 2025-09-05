import "./AgregarAlCarritoStyle.css";
import { useAddCarrito } from "../../Context/addCarritoContext";

export const AgregarAlCarrito = ({ producto }) => {
  
  const { agregarProductoAlCarrito, arrayProductsCarrito } = useAddCarrito();

  return (
    <div className="Container-Agrega-Carrito-Button">
      {arrayProductsCarrito.map((item) => {
        if (producto.itemKey === item.itemKey && item.stock > 0) {
          return (
            <div className="Cantidad-Agregada" key={item.itemKey}>
              {item.cantidadSeleccionada}
            </div>
          );
        }
        return null; // importante para no romper el map
      })}

      <button
        className="AgregarAlCarrito"
        onClick={(e) => {
          e.stopPropagation(); // evita que el click se propague al padre
          agregarProductoAlCarrito(producto);
        }}
      ></button>
    </div>
  );
};