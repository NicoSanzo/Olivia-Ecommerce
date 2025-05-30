import WppImage from "../../../../../../assets/whatsApp_logo_colorful.svg"
import FcbookImage from "../../../../../../assets/facebook_logo_colorful.svg"
import InstagramImage from "../../../../../../assets/Instagram_logo_colorful.svg"
import "./ContactoContainerStyle.css";

export function ContactoContainer() {
    return (
        
        <div className="contacto-container">
            <p><strong>Contacto con el vendedor</strong></p>       
            <div className="contacto-card" >
                <a className="contacto-wpp" href="https://wa.me/5491138024906"  target="blank">
                       <h2> Enviar Mensaje</h2>  
                       <img src={WppImage} alt="" />  
                </a>  
                <a className="contacto-instagram" href="https://www.instagram.com/direct/t/17846911391850288"  target="blank">
                       <h2> Enviar Mensaje</h2>  
                       <img src={InstagramImage} alt="" />  
                </a> 
                <a className="contacto-facebook" href="https://www.facebook.com/messages/t/108744675339595"  target="blank">
                       <h2> Enviar Mensaje</h2>  
                       <img src={FcbookImage} alt="" />  
                </a> 
            </div>     
        </div> 
    )
}
