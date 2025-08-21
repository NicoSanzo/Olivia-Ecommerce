import React from "react";
import "./UserMenuStyle.css";
import { useAuth } from "../../../../Context/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser,faCaretDown } from "@fortawesome/free-solid-svg-icons";



export function UserMenu({ children, user }) {

 const {logout} = useAuth();

  if (!user) return null;

  return (
    <div className="user-container">
      <div className="items-user-container">
        <div className="items-container-user-menu">
          <FontAwesomeIcon className="icon-media-class" icon={faUser} style={{color: "#FF5EC0"}} size="xl" border={2} />
          <p className="user-menu-text"> Bienvenido {user.nombre} </p>
          <FontAwesomeIcon className="icon-media-class icon-media-class-faCaretDown" icon={faCaretDown} style={{color: "#FF5EC0"}} size="lg" />
        </div>

        <ul  className="desplegable-user">
          {React.Children.map(children, (child, index) => {
            // Solo renderiza si es un elemento válido
            if (React.isValidElement(child)) {
              return <li key={index}>{child}</li>;
            }
            return null;
          })}
          <li onClick={logout}>Salir</li>
        </ul>
      </div>
    </div>
  );
}