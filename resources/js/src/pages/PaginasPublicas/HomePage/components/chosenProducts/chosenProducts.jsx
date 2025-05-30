import React from "react";
import "./chosenProductsStyle.css"
import {Productbox} from "../../../../../components/GenericProductBox/ProductBox";
import {ProductCard} from "../../../../../components/GenericProductCard/ProductCard";
import { CategoriesCard } from "./components/categoriesCard/categoriesCard";
import { categoryImages } from "./Imagenes";
import {productos} from "./Imagenes-prueba/prueba";




export const ChosenProducts =()=>{
    
  
return(
    <section className="chosenProducts">
        <h2 className="productsTitle">Los Mas Elegidos:</h2> 
        <Productbox  
            childrenCard={productos.map((producto, index) => (
                <ProductCard 
                    key={index} 
                    imagen={producto.foto} 
                    titulo={producto.descripcion} 
                    price={producto.precio}
                />
            ))}
            EffectInicialPoint={1600}
            effectEndPoint={1650}
        />

        <div className="productsType">
            {categoryImages.map((categories)=>{
                    return(
                    <CategoriesCard
                        image={categories.src}
                        description={categories.description}
                        key={categories.id}
                    />
            )})}
        </div>
    </section>
    )
}

