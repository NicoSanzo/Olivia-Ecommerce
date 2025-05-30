import React, { createContext, useContext, useEffect, useState } from 'react';



const productDetailContext = createContext();

export const ContextProductProvider = ({ children }) => {

const [dataProduct, setDataProducto] = useState(null);

    
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
export const useProductContent = () => useContext(productDetailContext); // Hook que retorno 