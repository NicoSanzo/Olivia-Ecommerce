import React from "react";
import "./styleHeaderB.css"
import { Link } from "react-router-dom";
import { NavegationBar } from "../../../../../../components/GenericNavegationBar/NavegationBar";
import { ShoppingCart } from "../../../../../../components/ShoppingCart/ShoppingCart";
import { Menu } from "../../../../../../components/GenericMenu/Menu";
import { UserAccount } from "../../../../../../components/User/User";
import { Carrito } from "../../Carrito/Carrito";
import {useHeaderB} from "./useHeaderB"


export const HeaderB = () =>{


    const {stickyheader,inicio,Logo,NavBar } = useHeaderB();


   
    return(
    <>
        <section className="header-section-b" ref={stickyheader} >

                <div className="logo-container">
                    <Link className="headerLogo" to={"/"} onClick={inicio} ref={Logo} > <div className="logo" > </div> </Link>
                </div>
                <nav className="navigation" ref={NavBar}>
                    <NavegationBar/>
                    <Menu
                        placeOrientation={"horizontal"} 
                        itemsDistance={25}
                    />
                </nav>
                <div className="user-icons">
                    <UserAccount/>
                    <Carrito/>
                    {/*<ShoppingCart/>*/}
                </div>
        </section>   
    
    </>

    )
}