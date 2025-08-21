import React, { use, useEffect, useRef, useState } from "react";
import "./OrdenMenuStyle.css";

import { useSearch } from "../../../../../Context/searchContext";
import useClickOutside from "../../../../../hooks/useCerrarAlClickAfuera";


export const useOrdenMenu = () =>{    //recibe como argumento una funcion de la pagina PRODUCTOS con el fin de obtener de pasarle los datos de la consulta



     const [abierto, setAbierto] = useState(false); // controla si esta desplagado el MENU//
     const {setinputOrder,inputOrder} = useSearch(); //estados globales utilizados en un contexto(Componente:searchContext) 
     const desplegableContainer= useRef();
     const cerrarClickAfuera= useRef(null);

     useClickOutside(cerrarClickAfuera,()=>setAbierto(false));

    
    
     const opciones = [    //OPCIONES DEL MENU DESPLEGABLE DE FILTROS//
         "Todos",
         "Menor Precio",
         "Mayor Precio",
         "Nombre: de A a Z",
         "Nombre: de Z a A"
     ];    
     
     
     useEffect(() => {
        if (!desplegableContainer.current) return; 
    
        setTimeout(() => {
            if (abierto) {
                desplegableContainer.current.classList.remove('items-container');
                desplegableContainer.current.classList.add('items-container-abierto');
                
                
            } else {
                desplegableContainer.current.classList.remove('items-container-abierto');
                desplegableContainer.current.classList.add('items-container');
            }
        }, 0);
    }, [abierto]);
    

     const cambiarOpcion = (opcion) => {    //recibe como argumento una de las opciones de la lista del filtro y se la setea a "inputFiltrado" a traves de la funcion, con el objetivo de mostrar esa opcion en el input y cambiarle el valor//
         setinputOrder(opcion);  
         setAbierto(false);            // al elegir una opcion lo transformo en falso para que se cierra la ventana
     };
   
    
    return {
        cambiarOpcion,
        opciones,
        abierto,
        setAbierto, 
        inputOrder,
        cerrarClickAfuera,
        desplegableContainer
    }

}