import React, { useRef, useEffect } from "react";
import "./LoadingComponentStyle.css";


export const LoadingComponente = ({ height , width}) => {
  const loadingRef = useRef(null);

  useEffect(() => {
    if (loadingRef.current) {
        loadingRef.current.style.height = `${height}px`; 
        loadingRef.current.style.width = `${width}px`;
    }
  }, [height, width]); 

  return (
    <div className="charging" ref={loadingRef}>
      
    </div>
  );
};