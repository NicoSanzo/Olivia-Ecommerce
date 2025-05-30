import React, { useEffect, useState } from "react";
import "./ProductosStyle.css";
import { ProductCard } from "../.././../components/GenericProductCard/ProductCard";
import { OrdenMenu } from "./components/ordenMenu/OrdenMenu";
import { FilterCategorias } from "./components/FilterMenu/FilterCategorias";
import { LoadingComponente } from "../../../components/GenericLoadingComponent/LoadingComponent";
import { FilterModelo } from "./components/FilterModelos/FilterModelos";
import { useSearch } from "../../../Context/searchContext";
import { usePublicaciones } from "./usePublicaciones";


export const Productos = () =>{
    

    const { FoundData, loading, Error } = useSearch();
    
    usePublicaciones();

    return (
        <>
            <div className="principal-container">

                <div className="container-menu-order">
                   {<OrdenMenu />}      {/*Este componente ejecuta la consulta de busqueda de productos, no se ejecuta al montar el componentem. es util para evitar 2 consultas a la base de datos*/}
                </div>
                {/*<div className="filter-menu-container">
                    {<FilterCategorias/>}
                    <FilterModelo/>  
                </div>*/}
              
                {loading?  (
                    <div className="carga-container-productos">
                        <LoadingComponente height={70} width={70}/>
                    </div>
                
                ) :
                <div className="products-container"> {
                FoundData?.length > 0 ? (
                    FoundData.map((publicacion) => (  
                        <ProductCard 
                            key={publicacion.id} 
                            imagen={publicacion.imagenes[0].image_url} 
                            titulo={publicacion.titulo} 
                            price={publicacion.precio} 
                            stock={publicacion.stock} 
                            itemKey={publicacion.id}
                        />                
                    ))
                ): 
                 <div> {Error} </div>
                }
                
                </div>}
            </div>
        </>
    )
}