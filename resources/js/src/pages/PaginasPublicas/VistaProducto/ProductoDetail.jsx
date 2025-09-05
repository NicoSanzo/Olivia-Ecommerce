import { Link } from "react-router-dom";
import Stock_icon from "../../../assets/Stock_icon.svg";
import shipping_icon from "../../../assets/Shipping_Icon.svg";
import Shield_icon from "../../../assets/Shield_icon.svg";
import "./ProductoDetailStyle.css";
import { Carrousel } from "../../../components/GenericCarrousel/Carrousel";
import { FichaTecnica } from "./Components/FichaTecnica/FichaTecnica";
import { UseProductoDetail } from "./useProductoDetail";
import { LoadingComponente } from "../../../components/GenericLoadingComponent/LoadingComponent";
import { BotonAgregarAlCarritoDetail } from "./Components/BotonAgregarAlCarritoDetail/BotonAgregarAlCarritoDetail";
import { BotonComprar } from "./Components/BotonComprar/BotonComprar";

export const ProductoDetail = () => {
  const { dataPublicacion, imagenes, detalleMutation } = UseProductoDetail();


  return (
    <div className="general-product-container">
      {detalleMutation.isPending && (
        <div className="container-carga">
          <LoadingComponente height={60} width={60} />
        </div>
      )}

      {dataPublicacion && (
        <div className="product-container">
          <div className="imagen-container">
            {imagenes && (
              <Carrousel ImagenesCarrousel={imagenes} autoslide={false} />
            )}
          </div>

          <div className="features-container Responsive">
            <h2 className="categorias Responsive">
              Categoria: {dataPublicacion.categoria}
            </h2>
            <h2 className="titulo-detail Responsive">{dataPublicacion.titulo}</h2>
            <h2 className="id-Producto Responsive">ID: {dataPublicacion.id}</h2>
            <hr />
            <h2 className="Precio Responsive">${dataPublicacion.precio}</h2>
            <hr />

            <div className="buy-conditions">
              <h2 className="Stock">
                <img src={Stock_icon} alt="disponibilidad" /> Stock Disponible:{" "}
                <strong>{dataPublicacion.stock}</strong>
              </h2>
              <h2 className="Envio">
                <img src={shipping_icon} alt="envios" /> Envío a todo el país
              </h2>
              <h2 className="garantia">
                <img src={Shield_icon} alt="garantia" /> Compra Protegida{" "}
                <Link to="/InfoCompra">Ver Términos y Condiciones</Link>
              </h2>
            </div>

            <div className="container-button-agregar-carrito-detail">
              <BotonComprar
                data={{
                  imagen: dataPublicacion.imagen,
                  titulo: dataPublicacion.titulo,
                  price: dataPublicacion.precio,
                  itemKey: dataPublicacion.id,
                  stock: dataPublicacion.stock,
                }}
              />

              <BotonAgregarAlCarritoDetail
                data={{
                  imagen: dataPublicacion.imagen,
                  titulo: dataPublicacion.titulo,
                  price: dataPublicacion.precio,
                  itemKey: dataPublicacion.id,
                  stock: dataPublicacion.stock,
                }}
              />
            </div>
          </div>

          <div className="Especificaciones">
            <FichaTecnica Datos={dataPublicacion} />
          </div>

          {dataPublicacion.descripcion && (
            <div className="Description">
              <h2>Descripción</h2>
              <p className="texto">{dataPublicacion.descripcion}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};