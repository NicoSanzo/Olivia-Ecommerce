import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Context/authContext';

export const PrivateRouteClient = () => {

  const {isTokenValid} = useAuth();
  

  if (!isTokenValid) {
    return  <Navigate to="/home" replace /> ;
  }

  if (dataAdmin){
        if( isTokenValid && dataAdmin==='false') {
    return  <Outlet />;
  }}

   return  <Navigate to="/home" replace /> ;

  

};

