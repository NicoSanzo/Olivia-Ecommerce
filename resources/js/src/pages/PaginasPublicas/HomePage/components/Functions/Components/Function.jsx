import React from "react"
import "./Function/FunctionStyle.css"


export const Function = ({descripcion,imagen})=> {

    return(
        <div className="function">
            <div className="icon">
                <img src={imagen} alt="loading..." loading="lazy" />
            </div>
            <h2>{descripcion}</h2>
        </div>
    )


}
