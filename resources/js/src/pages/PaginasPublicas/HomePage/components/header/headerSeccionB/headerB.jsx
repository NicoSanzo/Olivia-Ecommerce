import "./styleHeaderB.css"
import { Link } from "react-router-dom";
import { NavegationBar } from "../../../../../../components/GenericNavegationBar/NavegationBar";
import { Menu } from "../../../../../../components/GenericMenu/Menu";
import { UserAccount } from "../../../../../../components/User/User";
import { Carrito } from "../../Carrito/Carrito";
import { useHeaderB } from "./useHeaderB";
import { scrolltoStart } from '../../../../../../utils/scroolToStart';

export const HeaderB = () => {
  const {  Logo, NavBar, shrunk } = useHeaderB();

  return (
    <header
      className={`header-section-b ${shrunk ? "shrunk" : ""}`}
    >
      <div className="logo-container">
        <Link
          className={`headerLogo ${shrunk ? "shrunk" : ""}`}
          to={"/"}
          onClick={scrolltoStart}
          ref={Logo}
        >
          <div className="logo"></div>
        </Link>
      </div>
      <nav className={`navigation ${shrunk ? "shrunk" : ""}`} ref={NavBar}>
        <NavegationBar />
        <Menu placeOrientation={"horizontal"} itemsDistance={25} />
      </nav>
      <div className="user-icons">
        <UserAccount />
        <Carrito />
      </div>
    </header>
  );
};