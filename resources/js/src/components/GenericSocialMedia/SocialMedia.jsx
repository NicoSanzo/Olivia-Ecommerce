import React, { useEffect, useRef } from "react";
import "./socialMediaStyle.css"

export const SocialMedia = ({width,height,gap,margin_rigth})=>{


    const Networks = useRef(null);
    const instagram = useRef(null);
    const facebook = useRef(null);

    useEffect(()=>{
        if(Networks.current){
            instagram.current.style.width= typeof(width)==="number"? `${width}px`: "25px";
            instagram.current.style.height= typeof(height)==="number"? `${height}px`: "25px";
            facebook.current.style.width= typeof(width)==="number"? `${width}px`: "25px";
            facebook.current.style.height= typeof(height)==="number"? `${height}px`: "25px";
            Networks.current.style.gap= typeof(gap)==="number"? `${gap}px`: "9px";
            Networks.current.style.marginRight= typeof(margin_rigth)==="number"? `${margin_rigth}%`: "0";
        }
    },[width,height,gap,margin_rigth])


        return(
               <div className="networks" ref={Networks} >
                    <a href="https://www.instagram.com/disenos.oliviaok/?igsh=M2E5aXdrcHB3N3V4" target="blank" className="instagram" ref={instagram}></a>
                    <a href="https://www.facebook.com/Disenos.oliviaok?mibextid=ZbWKwL" target="blank" className="facebook"ref={facebook}></a>
                </div>
                )
}