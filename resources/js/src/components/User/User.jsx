
import "./UserStyle.css";
import IconUser from "../../assets/Account_icon.svg";
import { useLoginModal } from "../../Context/LoginPopContext";
import { useAuth } from "../../Context/authContext";
import { SkeletonLoader } from "../SkeletonLoader/SkeletonLoader";
import { UserMenu } from "./Components/UserMenu/UserMenu";
import { Link } from "react-router-dom";

export const UserAccount = () => {
  const { userPublicData, autenticado, loading, logout} = useAuth();
  const { openModal } = useLoginModal();

  if (loading) {
    return (
      <div className="userLogin">
        <div className="container-login">
          <SkeletonLoader/>
        </div>
      </div>
    );
  }

  if (autenticado && userPublicData) {
    return (
      <div className="userLogin">
        <div className="container-login">
          {userPublicData.tipo_usuario === "Administrador" && 
           
            <UserMenu user= {userPublicData}>
               <Link to="/Ventas">Ventas</Link>
               <Link to="/AgregarProducto">Agregar Producto</Link>
               <Link to="/Publicaciones">Publicaciones</Link>    
            </UserMenu>
           

          }
          {userPublicData.tipo_usuario === "Cliente" && (
             <UserMenu user= {userPublicData}>
               <Link to="/MiPerfil"> Mi perfil </Link>
               <Link to="/compras">Compras</Link>
             </UserMenu>
          )}
        </div>
      </div>
    );
  }


  return (
    <div className="userLogin">
      <div className="container-login" onClick={openModal}>
        <img src={IconUser} alt="Icono usuario" />
        <h2>Iniciar Sesión</h2>
      </div>
    </div>
  );

};