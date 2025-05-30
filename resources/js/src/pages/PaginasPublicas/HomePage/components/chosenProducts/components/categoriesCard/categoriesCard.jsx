import React from "react";
import "./categoriesCardStyle.css"

export const CategoriesCard = ({image,description}) =>{

return (
    <>   
         <div className="categoryType">
             <a href="">
                 <img src={image} loading="lazy" /> 
                 <h2>{description}</h2>
             </a>
         </div>          
    </>



)


}