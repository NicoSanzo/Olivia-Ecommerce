import React, { createContext, useContext, useEffect, useState } from 'react';

/*

const productDetailContext = createContext();

export const ContextProductProvider = ({ children }) => {

const [dataProduct, setDataProducto] = useState(null);


    const normalizarDatosDetail = (data) => {
            
          const datosNormalizados = data.map((item) => ({
            id: item.id,
            titulo: item.titulo,
            precio: item.precio,
            stock: item.stock,
            imagen: item.imagen.image_url,
            eliminada: item.deleted,
            pausada: item.paused,
          }));      

          return datosNormalizados
    };

    

    
    return (
        <productDetailContext.Provider 
            value={{ 
                dataProduct, 
                setDataProducto,
            }}>
            {children}
        </productDetailContext.Provider>
    );
};
export const useProductContent = () => useContext(productDetailContext); // Hook que retorno */