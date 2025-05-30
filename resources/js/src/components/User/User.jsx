import React from "react";
import "./UserStyle.css";
import IconUser from "../../assets/Account_icon.svg";
import { useLoginModal } from "../../Context/LoginPopContext";
import { useAuth } from "../../Context/authContext";
import { AdminMenu } from "./Components/AdminUserMenu/ordenMenu/AdminMenu";
import { ClientMenu } from "./Components/ClientUserMenu/ClientMenu";

export const UserAccount = () => {
    const { publicData, autenticado , loading} = useAuth();
    const { openModal } = useLoginModal(); 


    if(autenticado===false && loading ===false){
        return (
            <div className="userLogin" onClick={openModal}>
                <div className="container-login">
                    <img src={IconUser} alt="Icono usuario" />
                    <h2>Iniciar Sesión</h2>
                </div>
            </div>
        );

    }

    if (publicData) {
        const isAdmin = publicData?.tipo_usuario  ;
        const username = publicData?.username || publicData?.nombre;


        return (
            <div className="userLogin">
                <div className="container-login">
                    
                    {isAdmin==="Administrador" && autenticado ?(

                        <AdminMenu user={username} />
                    ) : (
                        <ClientMenu user={username} />
                    )}
                </div>
            </div>
        );
    }

    // Caso en el que `publicData` no esté presente pero el usuario esté autenticado
   return null;
};