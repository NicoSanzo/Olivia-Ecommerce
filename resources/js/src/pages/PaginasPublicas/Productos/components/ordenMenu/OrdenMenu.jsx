import React from "react";
import "./OrdenMenuStyle.css";
import { useOrdenMenu } from "./useOrdenMenu";



export const OrdenMenu = () =>{    


    const {cambiarOpcion,opciones, abierto,setAbierto,inputOrder,cerrarClickAfuera,desplegableContainer}= useOrdenMenu();


    return (
        <>      
            <div className="order-container" ref={cerrarClickAfuera}onClick={() => setAbierto(prev => !prev)} >   
                    <input 
                        className="input-busqueda"     
                        type="text"
                        placeholder="Ordenar por:"
                        value={inputOrder} 
                        readOnly
                    />
                    {abierto && (                    
                        <div className="items-container" ref={desplegableContainer}>
                            <ul className="Desplegable"  >
                                {opciones.map(opcion => (
                                <li key={opcion} onClick={() => cambiarOpcion(opcion)} >
                                    {opcion}
                                </li>
                            ))}                     
                            </ul>
                        </div>
                    )}
                    <span className="flecha-container" >
                        <span className={`flecha ${abierto ? 'flecha-hacia-arriba' : "flecha"}`}> &#9660;</span> {/* &#9660 = unicode de flecha hacia abajo*/}
                    </span>
            </div>                 
        </>
    )

    
}