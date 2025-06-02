
import "./UserStyle.css";
import IconUser from "../../assets/Account_icon.svg";
import { useLoginModal } from "../../Context/LoginPopContext";
import { useAuth } from "../../Context/authContext";
import { AdminMenu } from "./Components/AdminUserMenu/ordenMenu/AdminMenu";
import { ClientMenu } from "./Components/ClientUserMenu/ClientMenu";
import { LoadingComponente } from "../GenericLoadingComponent/LoadingComponent";
import { SkeletonLoader } from "../SkeletonLoader/SkeletonLoader";

export const UserAccount = () => {
  const { publicData, autenticado, loading} = useAuth();
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

  if (autenticado && publicData) {
    return (
      <div className="userLogin">
        <div className="container-login">
          {publicData.tipo_usuario === "Administrador" && (
            <AdminMenu user={publicData.nombre} />
          )}
          {publicData.tipo_usuario === "Cliente" && (
            <ClientMenu user={publicData.nombre} />
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