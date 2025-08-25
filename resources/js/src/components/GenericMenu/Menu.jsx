import "./MenuStyle.css"
import { Link } from "react-router-dom";
import { UseMenu } from "./useMenu";





export const Menu = ({placeOrientation,itemsDistance}) =>{


    const {inicio,settings} = UseMenu ({placeOrientation,itemsDistance})
        

    return(
    <>
           <ul className="menu" ref={settings}>
                <Link to={"/"} className="item" id="home" onClick={inicio}> inicio </Link>
                <Link to={"/Productos"} onClick ={inicio} className="item">productos</Link>
                <Link to={"/infoCompra"}  className="item">info de compra</Link>
                <Link to={"/Contacto"} className="item">contacto</Link>
                <Link className="item"  >nuestras politicas</Link>
               
            </ul>
    </>

    )
}