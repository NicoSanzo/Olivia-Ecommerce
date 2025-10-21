import { useEffect, useRef } from "react";

/**
 * Hook personalizado que configura un menú con orientación y espaciado dinámico.
 * 
 * @param {string} placeOrientation - Define la orientación del menú: "vertical" o "horizontal".
 * @param {number} itemsDistance - Define el espacio (gap) entre los elementos del menú en píxeles.
 * @returns {Object} - Retorna funciones y una referencia para manipular el menú desde el componente padre.
 */

export function UseMenu({ placeOrientation, itemsDistance }) {
    // Referencia al contenedor del menú para modificar estilos dinámicamente
    const settings = useRef(null);
     

    // Función que lleva el scroll al inicio de la página con una animación suave
    const inicio = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    
    };

    // Efecto que se ejecuta cada vez que cambia la orientación o distancia entre ítems
    useEffect(() => {
        if (settings.current) {
            // Establece la dirección del flexbox según el valor de placeOrientation
            if (placeOrientation === "vertical") {
                settings.current.style.flexDirection = "column";
            }
            if (placeOrientation === "horizontal") {
                settings.current.style.flexDirection = "row";
            }
            // Establece el espacio (gap) entre elementos 
            if (typeof itemsDistance === "number") {
                settings.current.style.gap = `${itemsDistance}px`;
            }
        }
    }, [placeOrientation, itemsDistance]);

    // Devolucion de funciones y referencias como objeto
    return {
        inicio,
        settings,
       
    };
}