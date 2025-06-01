import "./LoginStyle.css";
import { Link } from "react-router-dom";
import { LoadingComponente } from "../../../components/GenericLoadingComponent/LoadingComponent";
import { useLogin } from "./useLogin";


export const Login = ({ onClose, Registrate }) => {

  const {
        efectRegistro,
        iniciarSesion,
        setUsername,
        username,
        password,
        setPassword,
        loginMutation,
        loginError
  } = useLogin({ onClose, Registrate })


  return (
    <div className="Container-Principal">
      <h2 className="title">Iniciar Sesión</h2>

      <h3 className="registro">
        ¿Es tu Primera Vez?{" "}
        <button type="button" className="Registrarse" onClick={efectRegistro}>
          Regístrate
        </button>
      </h3>

      <form className="loginform" onSubmit={iniciarSesion}>
        <input
          type="text"
          placeholder="Usuario o Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Link to="/forgot-password">¿Olvidaste tu Contraseña?</Link>

        <div className="error-msg">
          {loginMutation.isPending && <LoadingComponente width={25} height={25} />}
          {loginError && <span>{loginError}</span>}
        </div>

        <button type="submit" disabled={loginMutation.isPending}>
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};