import React from "react";
import "./ringStyle.css";


export const Ring = () =>{


    return(
        <div className="Ring"> 
            <div className="RingTop"></div>
            <div className="leafy-right  leafy"></div>
            <div className="leafy-left  leafy"></div>
            <div className="RingFront ring-element" > </div>
            <div className="corner-left-front ring-element"> </div>
            <div className="RingLeft ring-element"> </div>
            <div className="corner-front-right ring-element"> </div>
            <div className="RingRight ring-element"> </div>
            <div className="corner-left-back ring-element" > </div>
            <div className="RingBack ring-element"> </div>
            <div className="corner-right-back ring-element "> </div>
            <div className="RingBottom"></div>
        </div>


    )
}