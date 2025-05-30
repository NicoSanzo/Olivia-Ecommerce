import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Context/authContext';

export const PrivateRouteAdmin = () => {
  
  const {publicData, autenticado} = useAuth();


  if (!autenticado) {
    return  <Navigate to="/home" replace /> ;
  }

  // Si hay sessionData y el usuario es admin, renderiza las paginas privadas
  if (autenticado){
    if( publicData?.tipo_usuario==="Administrador") {
    return  <Outlet />;
  }}

return  <Navigate to="/home" replace /> ;

};