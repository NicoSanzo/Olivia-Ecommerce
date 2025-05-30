
import React from 'react'
import { Welcome_Carrousel } from "./components/carrousel/Welcome_Carrousel" 
import { Functions } from "./components/Functions/functions"
import { ProductCombo } from "../HomePage/components/productsCombo/ProductsCombo"
import { ChosenProducts } from "./components/chosenProducts/chosenProducts"


export const Home =()=>{

    return (
        <>    
            <Welcome_Carrousel/>
            <Functions/>
            <ProductCombo/>
            <ChosenProducts/>
        </>
    )   
}