import React from "react";
import "./FollowButtonStyle.css";


export const FollowButton= ({Perfilurl}) =>{
return(
        <>    
            <button className="followButton">
                 <a href={Perfilurl} target="blank">seguinos</a>
            </button>    
        </>      
)}

