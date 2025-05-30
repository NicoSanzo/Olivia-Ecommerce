import React from "react";
import LogoInstagram from "../../../../../../../assets/Instagram_icon.jpg";
import "./InstagramFollowStyle.css";
import {FollowButton} from "../../../../../../../components/GenericFollowButton/FollowButton"

export const InstagramFollow = () =>{

return (
        <>
            <div className="follow">
                <div> 
                    <img src={LogoInstagram} alt="Logo Instagram" loading="lazy" />
                    <h2>diseños.oliviaok</h2>  
                </div> 
                <h2>Estamos en Instagram</h2>  
                <FollowButton Perfilurl={"https://www.instagram.com/disenos.oliviaok?igsh=M2E5aXdrcHB3N3V4"}/>
            </div>
        </>
)

}