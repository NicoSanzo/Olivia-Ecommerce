import React from "react";
import "./SkeletonLoaderStyle.css";

export const SkeletonLoader = ({ width = "100%", height = "100%", borderRadius = "8px"}) => {
  return (
    <div
      className="skeleton-loader"
      style={{ width, height, borderRadius }}
      
    />
      
  );
};