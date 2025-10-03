import React, { createContext, useContext, useEffect, useState } from 'react';



const AddCarritoContext = createContext();

export const ContextCarritoProvider = ({ children }) => {

   
    const [arrayProductsCarrito, SetproductosToCarrito] = useState([]);
    const [cantidaditemsCarrito,setCantidadItemsCarrito] =useState(0);
    const [MostrarDescuento,setMostrarDescuento]=useState(false);
    const [total,SetTotal] =useState(0);
    const [subtotal,setSubtotal] =useState(0);
    const [subtotalConDescuento,setsubTotalConDescuento] =useState(0);
    const [porcentajeDescuento,setPorcentajeDescuento]=useState(0);
    const [cantidadDescuento,setCantidadDescuento]= useState(0);
    const [MostrarMetodosDepago, setMostrarMetodosDePago]= useState(false);
    const [Envio, setPrecioEnvio] = useState(null);

 

      /********************GUARDA EL CARRITO PARA QUE AL RECARGAR LA PAGINA NO SE BORRE ***********************/

    useEffect(() => {

        const carritoGuardado = localStorage.getItem('carrito');
        if (carritoGuardado) {
          SetproductosToCarrito(JSON.parse(carritoGuardado));
        }
      }, []);
    
      // Guardar el carrito en localStorage cada vez que cambie
      useEffect(() => {
        if (arrayProductsCarrito.length > 0) {
          localStorage.setItem('carrito', JSON.stringify(arrayProductsCarrito));
        }
        if (arrayProductsCarrito.length === 0){
          setMostrarMetodosDePago(false);
        }

      }, [arrayProductsCarrito]);


 /********************AGREGA LOS PRODUCTOS AL CARRITO SI ES NUEVO, SINO LE AGREGA UNO A LA CANTIDAD DE ELEGIDOS ***********************/

 
const agregarProductoAlCarrito = (producto) => {
  if (producto.stock === 0) {
    return;
  }
  SetproductosToCarrito((prevCarrito) => {
    // Buscar si ya existe en el carrito
    const index = prevCarrito.findIndex(
      (item) => item.itemKey === producto.itemKey
    );

    /* Normalizo el objeto producto para que siempre tenga la misma estructura sin importar de qué componente o función lo invoque. Si cambia algo en el futuro, solo debo actualizarlo acá. */
    if (index === -1) {
      return [
        ...prevCarrito,
        {
          itemKey: producto.itemKey,
          titulo: producto.titulo,
          precio: producto.price,
          imagen: producto.imagen,
          stock: producto.stock,
          cantidadSeleccionada: 1,
        },
      ];
    }
    return prevCarrito.map((item, i) =>
      i === index && item.stock > item.cantidadSeleccionada
        ? { ...item, cantidadSeleccionada: item.cantidadSeleccionada + 1 }
        : item
    );
  });
};



/********************CALCULA EL SUBTOTAL DE LOS PRODUCTOS, ES UNA PROPIEDAD QUE CUENTA UN DETERMINADO CAMPO DEL ARRAY Y LO GUARDA EN UNA CONSTANTE ***********************/
    useEffect(() => {

      const subtotal = arrayProductsCarrito.reduce(
          (total, item) => total + item.precio * item.cantidadSeleccionada,0);
       
      
/********************CALCULA EL DESCUENTO AL ELEGIR TRANSFERENCIA BANCARIA + ENVIO ***********************/
      const totalConDescuento = subtotal - (subtotal * porcentajeDescuento) / 100;
      const descuentoTotal= subtotal * porcentajeDescuento/ 100;
      setCantidadDescuento(descuentoTotal);
      setSubtotal(subtotal);
      setsubTotalConDescuento(totalConDescuento)
      SetTotal(totalConDescuento + Envio);
  }, [arrayProductsCarrito, porcentajeDescuento,Envio ]);


   
/********************CUENTA LA CANTIDAD DE ITEMS QUE SE ENCUENTRAN EN EL CARRITO INCLUYENDO LOS REPETIDOS PARA PARA QUE SE VISUALICE EN EL ICONO DEL CARRITO DEL HOME ***********************/
    useEffect(() => {
        if(arrayProductsCarrito ){
            setCantidadItemsCarrito(arrayProductsCarrito.reduce((cantidadSeleccionada, items) => cantidadSeleccionada + (items.cantidadSeleccionada),0));
        }
    }, [arrayProductsCarrito]);

     
/********************FUNCION DEL SPIN  BUTTON DE SUMAR UNO EN CANTIDAD DE PRODUCTO EN EL CARRITO (TARJETA DE PRODUCTO DE CARRITO) ***********************/

    const AgregarStock = (itemKey) => {
        const updatedProducts = arrayProductsCarrito.map(item => 
          ((item.itemKey === itemKey) && (item.stock > item.cantidadSeleccionada))
            ? { ...item, cantidadSeleccionada: item.cantidadSeleccionada + 1 }  
            : item
        );
        SetproductosToCarrito(updatedProducts);
      };

/********************FUNCION DEL SPIN  BUTTON DE RESTAR UNO EN CANTIDAD DE PRODUCTO EN EL CARRITO (TARJETA DE PRODUCTO DE CARRITO) ***********************/
      const RestarStock = (itemKey) => {
        const updatedProducts = arrayProductsCarrito.map(item => 
          (item.itemKey === itemKey && item.cantidadSeleccionada > 1)
            ? { ...item, cantidadSeleccionada: item.cantidadSeleccionada - 1 }  
            : item
        );
        SetproductosToCarrito(updatedProducts);
      };

    
/********************ELIMINAR UN TIPO DE PRODUCTO DEL CARRITO(X que aparece en el costadod de la tarjeta de producto) ***********************/
    const eliminarProductoCarrito=(productoId)=>{ 
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const nuevoCarrito = carrito.filter(item => item.itemKey !== productoId);
        localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
        SetproductosToCarrito(nuevoCarrito);
    };



    /******************** FUNCION PARA VACIAR TODO EL CARRITO  ***********************/

    const EliminarTodoElCarrito = () => {
        localStorage.removeItem('carrito');
        SetproductosToCarrito([]);   
    }


    const CarritoStateReset = ()=>{

      setMostrarMetodosDePago,setPrecioEnvio,setMostrarDescuento
        setMostrarMetodosDePago(false);
        setPrecioEnvio(0);
        setPorcentajeDescuento(0);
        setMostrarDescuento(null);
    }





    return (
        <AddCarritoContext.Provider 
            value={{ 

                agregarProductoAlCarrito, 
                arrayProductsCarrito, 
                total, 
                cantidaditemsCarrito,
                eliminarProductoCarrito,
                EliminarTodoElCarrito,
                AgregarStock,
                RestarStock,                
                MostrarDescuento,
                cantidadDescuento,
                MostrarMetodosDepago,
                setMostrarMetodosDePago,
                setMostrarDescuento,
                setPorcentajeDescuento,
                setPrecioEnvio,
                Envio,   
                subtotal,
                subtotalConDescuento,
                porcentajeDescuento,
                CarritoStateReset,
              
                

            }}>
            {children}
        </AddCarritoContext.Provider>
    );
};
export const useAddCarrito = () => useContext(AddCarritoContext); // Hook que retorno 