import React from "react";
import "./styleHeaderA.css"
import { SocialMedia } from "../../../../../../components/GenericSocialMedia/SocialMedia";

export const HeaderA = () =>{
    

    return(
    <>
          <section className="header-section-a">
                <SocialMedia gap={15} margin_rigth={0}/>
                <h2>10% DE DESCUENTO PAGANDO CON TRANSFERENCIA</h2>
          </section>
    </>

    )
}