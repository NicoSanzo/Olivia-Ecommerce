import "./MenuStyle.css"
import { Link, useLocation } from "react-router-dom";
import { UseMenu } from "./useMenu";
import { useState } from "react";





export const Menu = ({placeOrientation,itemsDistance}) =>{


const {inicio,settings} = UseMenu ({placeOrientation,itemsDistance})

  const location = useLocation(); //toma la ruta actual

const menuItems = [
    { label: 'INICIO', url: '/' },
    { label: 'PRODUCTOS', url: '/productos' },
    { label: 'INFO DE COMPRA', url: '/infoCompra' },
    { label: 'CONTACTO', url: '/contacto' },
    { label: 'NUESTRAS POLÍTICAS', url: '/politicas' },
  ];

    return(
    <>
           <ul className="menu" ref={settings}>
            {menuItems.map((item)=>{
            return(
              <Link key={item.url}  onClick={inicio} to={item.url} className={`item ${location.pathname === item.url ? 'active' : ''}`}> {item.label} </Link>
                )

            })}
                
             
               
            </ul>
    </>

    )
}