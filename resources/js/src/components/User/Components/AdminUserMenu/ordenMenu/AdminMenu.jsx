import "./AdminMenuStyle.css";
import downArrow from "../../../../../assets/down_arrow.svg";
import IconUser from "../../../../../assets/Account_icon.svg"
import { useAuth } from "../../../../../Context/authContext";
import { Link } from "react-router-dom";

export const AdminMenu = ({ user }) => {
    
    const { logout } = useAuth();

    if (!user) return null;

    return (
        <div className="admin-container">
            <div className="items-admin-container">
                <div className="items-container-admin-menu">
                    <img src={IconUser} alt="Icono usuario" />
                    <h2> Bienvenido {user} </h2>
                    <div className="down-arrow-container-admin-menu">
                        <img src={downArrow} alt="Flecha desplegable" />
                    </div>
                </div>
                <ul className="desplegable-admin">
                    <li><Link to="/Ventas">Ventas</Link></li>
                    <li>Resumen</li>
                    <li><Link to="/AgregarProducto">Agregar Producto</Link></li>
                    <li><Link to="/Publicaciones">Publicaciones</Link></li>
                    <li onClick={logout}>Salir</li>
                </ul>
            </div>
        </div>
    );
}