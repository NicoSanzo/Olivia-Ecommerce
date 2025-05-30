import React from "react";
import "./footerStyle.css"
import { Menu } from "../../../../../components/GenericMenu/Menu";
import { SocialMedia } from "../../../../../components/GenericSocialMedia/SocialMedia";
import Logo from "../../../../../assets/LogoOlivia.png"
import mailIcon from "../../../../../assets/Email_icon.svg"
import whatsAppIcon from "../../../../../assets/Whatsapp_icon.svg"

export const Footer = ()=>{


    const inicio =()=>{
        window.scrollTo({top:0,behavior:'smooth'});
}


return(
    <>
        <footer>
            <div className="columns">
              <h2 className="title ">Contactanos</h2>
                <a className="contact" href="https://wa.me/5491138024906" target="blank">
                    <img src= {whatsAppIcon}/>
                    <h2>11-3802-4906</h2>
                </a>
                <a className="contact" href="mailto:olivia_design@outlook.com">
                    <img src= {mailIcon}/>
                    <h2>olivia_design@outlook.com</h2>
                </a>
            </div>
            <div className="columns">
                <h2 className="title ">categorias</h2>
                <Menu placeOrientation="vertical" 
                itemsDistance={30}
                />
            </div> 
            <div className="columns" id="redes">
                <h2 className="title ">seguinos</h2>
                <SocialMedia width={35} height={35} gap={45}/>
                <a className="methods" href="">Medios de Pago</a>
                <a className="methods" href="">Medios de Envio</a>
            </div>
            <div className="logoContainer">
                <hr/>
                <img src={Logo} alt="Logo" onClick={inicio} />
                <hr/>
            </div>
        
        </footer>

     </>
)
}