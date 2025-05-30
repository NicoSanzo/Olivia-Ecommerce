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
        if (arrayProductsCarrito.length == 0){
          setMostrarMetodosDePago(false);
        }

      }, [arrayProductsCarrito]);

 /********************AGREGA LOS PRODUCTOS AL CARRITO SI ES NUEVO, SINO LE AGREGA UNO A LA CANTIDAD DE ELEGIDOS ***********************/
    const agregarProductoAlCarrito = (producto) => {  
        SetproductosToCarrito((prevCarrito) => {
            // Verificar si el producto ya existe en el carrito
            const productoExistente = prevCarrito.find(item => item.data.data.itemKey === producto.data.itemKey);
            
            if (productoExistente) {
                // Si ya existe, incrementar la cantidad
                return prevCarrito.map(item => 
                   ( item.data.data.itemKey === producto.data.itemKey && item.stock< item.data.data.stock)   
                        ? { ...item, stock: item.stock + 1 }  // Aumentar la cantidad
                        : item
                );
            } else {
                // Si no existe, agregar el producto con cantidad 1
                return [...prevCarrito, { data: producto, stock: 1 }];
            }
        });
    };

      
 /********************CALCULA EL SUBTOTAL DE LOS PRODUCTOS, ES UNA PROPIEDAD QUE CUENTA UN DETERMINADO CAMPO DEL ARRAY Y LO GUARDA EN UNA CONSTANTE ***********************/
    useEffect(() => {
      const subtotal = arrayProductsCarrito.reduce(
          (total, item) => total + item.data.data.price * item.stock,0);
      
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
            setCantidadItemsCarrito(arrayProductsCarrito.reduce((cantidad, items) => cantidad + (items.stock),0));
        }
    }, [arrayProductsCarrito]);

     
/********************FUNCION DEL SPIN  BUTTON DE SUMAR UNO EN CANTIDAD DE PRODUCTO EN EL CARRITO (TARJETA DE PRODUCTO DE CARRITO) ***********************/

    const AgregarStock = (itemKey) => {
        const updatedProducts = arrayProductsCarrito.map(item => 
          ((item.data.data.itemKey === itemKey) && (item.stock < item.data.data.stock))
            ? { ...item, stock: item.stock + 1 }  
            : item
        );
        SetproductosToCarrito(updatedProducts);
      };

/********************FUNCION DEL SPIN  BUTTON DE RESTAR UNO EN CANTIDAD DE PRODUCTO EN EL CARRITO (TARJETA DE PRODUCTO DE CARRITO) ***********************/
      const RestarStock = (itemKey) => {
        const updatedProducts = arrayProductsCarrito.map(item => 
          (item.data.data.itemKey === itemKey && item.stock>1)
            ? { ...item, stock: item.stock - 1 }  
            : item
        );
        SetproductosToCarrito(updatedProducts);
      };

    
/********************ELIMINAR UN TIPO DE PRODUCTO DEL CARRITO(X que aparece en el costadod de la tarjeta de producto) ***********************/
    const EliminarProductoCarrito=(productoId)=>{ 
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const nuevoCarrito = carrito.filter(item => item.data.data.itemKey !== productoId);
        localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
        SetproductosToCarrito(nuevoCarrito);
    };




/******************** FUNCION PARA VACIAR TODO EL CARRITO  ***********************/
    const EliminarTodoElCarrito = () => {
        localStorage.removeItem('carrito');
        SetproductosToCarrito([]);   
    }


    return (
        <AddCarritoContext.Provider 
            value={{ 

                agregarProductoAlCarrito, 
                arrayProductsCarrito, 
                total, 
                cantidaditemsCarrito,
                EliminarProductoCarrito,
                EliminarTodoElCarrito,
                AgregarStock,
                RestarStock,
                setMostrarDescuento,
                MostrarDescuento,
                cantidadDescuento,
                MostrarMetodosDepago, 
                setMostrarMetodosDePago,
                Envio,
                setPrecioEnvio,
                setPorcentajeDescuento,
                subtotal,
                subtotalConDescuento,
                porcentajeDescuento,
                

            }}>
            {children}
        </AddCarritoContext.Provider>
    );
};
export const useAddCarrito = () => useContext(AddCarritoContext); // Hook que retorno 