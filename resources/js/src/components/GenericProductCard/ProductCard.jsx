import React, { useState } from "react";
import "./ProductCardStyle.css";
import { ButtonVer } from "../GenericButtonVer/ButtonVer";
import { AgregarAlCarrito } from "../BotonAgregarAlCarrito/AgregarAlCarrito";
import LogoOlivia from "../../assets/LogoOlivia.png";
import Placeholder from "../../assets/LogoOlivia.png"; // Tu imagen de placeholder
import { useProductCard } from "./useProductCard";

export const ProductCard = ({ imagen, titulo, price, itemKey, stock }) => {




  const [isImageLoaded, setIsImageLoaded] = useState(false); // Estado para saber si la imagen se ha cargado

  const handleImageLoad = () => {
    setIsImageLoaded(true); // Marca como cargada cuando la imagen se haya cargado
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = LogoOlivia; // Si la imagen no se carga correctamente, mostrar LogoOlivia
    e.target.classList.add("imagen-cargando"); // Agrega clase para efectos si deseas
  };


  const producto = { imagen, titulo, price, itemKey, stock };

  const {ClickMostrarDetalle} = useProductCard({itemKey,titulo})

  return (
    <div className="producto" onClick={ClickMostrarDetalle}>
      <div className="image-container">
        {/* Mostrar el placeholder si la imagen no está cargada */}
        <img
          src={isImageLoaded ? imagen : Placeholder} // Muestra la imagen de placeholder hasta que la imagen real se cargue
          className={isImageLoaded ? "img-load" : "imagen-cargando"} // Aplica la clase de imagen cargada o cargando
          alt="imagen-producto"
          loading="lazy"
          onError={handleImageError} // Maneja el error de la imagen
          onLoad={handleImageLoad} // Marca como cargada cuando la imagen se haya cargado
        />
      </div>
      <h2 className="tituloStyle">{titulo}</h2>
      <h2 className="stylePrice">{price}</h2>
      <h2 className="transferStyle">10% off con Transferencia</h2>
      <div className="Botonera">
        <ButtonVer />
        <AgregarAlCarrito producto={producto} />
      </div>
    </div>
  );
};