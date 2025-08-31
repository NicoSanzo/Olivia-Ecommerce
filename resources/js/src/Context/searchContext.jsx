import React, { createContext, useContext, useEffect, useState } from 'react';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {


    const [foundData, setFoundData] = useState(null);
    const [searchData, setSearchData] = useState('');
    const [loading,setLoading]= useState(false);
    const [inputOrder,setinputOrder]=useState("");  // se utliza para realizar la busqueda al entrar a productos,desde el componenten de Ordenaminto y para el componente de la barra de busqueda
    const [Error,setError]=useState(null);
    const [inputSearchValue, setInputSearchValue] = useState('');
    

    

    const normalizarDatos = (data) => {
            
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
        <SearchContext.Provider 
        value={{ 
            foundData, setFoundData,
            searchData,setSearchData,
            inputOrder,setinputOrder,
            loading,setLoading,
            Error,setError,
            inputSearchValue, setInputSearchValue, 
            normalizarDatos,
           }}>

        {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => useContext(SearchContext); // Hook que retorno 

