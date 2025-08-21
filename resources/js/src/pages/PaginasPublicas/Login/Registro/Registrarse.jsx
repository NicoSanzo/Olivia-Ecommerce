import "./RegistrarseStyle.css";
import { UseRegistrarse } from "./useRegistrarse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { LoadingComponente } from "../../../../components/GenericLoadingComponent/LoadingComponent";

export function Registrarse({ Logueate }) {
  const {
    register,
    handleSubmit,
    errors,
    watch,
    isPending,
    registroExitoso,
    onSubmit,
    validacionCampos,
    registroError
  } = UseRegistrarse();


  const password = watch("contraseña") || "";
  const repetirPassword = watch("repetirContraseña") || "";

  const campos = [
    { name: "nombre", placeholder: "Nombre", type: "text" },
    { name: "apellido", placeholder: "Apellido", type: "text" },
    { name: "email", placeholder: "Email", type: "email" },
    { name: "usuario", placeholder: "Usuario", type: "text" },
    { name: "dni", placeholder: "DNI", type: "number" },
    { name: "celular", placeholder: "Celular", type: "number" },
    { name: "contraseña", placeholder: "Contraseña", type: "password" },
    { name: "repetirContraseña", placeholder: "Repetir Contraseña", type: "password" },
  ];

  const requerimientosContraseña = (value) => {
  
    return(
      <ul className="password-requisitos">
       
         <li className={value.length >= 8 ? "ok" : "error"}>
           <FontAwesomeIcon
             icon={value.length >= 8 ? faCheckCircle : faTimesCircle}
             className={value.length >= 8 ? "icon success" : "icon-error"}
           />{" "}
           Mínimo 8 caracteres
         </li>
         <li className={/[A-Z]/.test(value) ? "ok" : "error"}>
           <FontAwesomeIcon
             icon={/[A-Z]/.test(value) ? faCheckCircle : faTimesCircle}
             className={/[A-Z]/.test(value) ? "icon success" : "icon-error"}
           />{" "}
           Una mayúscula
         </li>
         <li className={/\d/.test(value) ? "ok" : "error"}>
           <FontAwesomeIcon
             icon={/\d/.test(value) ? faCheckCircle : faTimesCircle}
             className={/\d/.test(value) ? "icon success" : "icon-error"}
           />{" "}
           Un número
         </li>
         <li className={/[@$!%*?&.-]/.test(value) ? "ok" : "error"}>
           <FontAwesomeIcon
             icon={/[@$!%*?&.-]/.test(value) ? faCheckCircle : faTimesCircle}
             className={/[@$!%*?&.-]/.test(value) ? "icon success" : "icon-error"}
           />{" "}
           Un símbolo (@.-$!%*?&)
         </li>
        </ul>
    )
    
  };


  return (
    <div className="registro-container">
      <h2 className="title">Registrarse</h2>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {campos.map(({ name, placeholder, type }) => {

          let rules = { required: `${placeholder} obligatorio` };

          validacionCampos(name,rules)

          return (
            <div className="Entradas" key={name}>

              <input
                type={type}
                {...register(name, rules)}
                placeholder={placeholder}
                autoComplete="off"
                aria-label={placeholder}
              />
              {errors[name] && (
                <span className="error-msg">* {errors[name].message}</span>
              )}
             
              
              {name === "contraseña"  && requerimientosContraseña(password) }
              {name === "repetirContraseña" && requerimientosContraseña(repetirPassword)}   
                   
  
            </div>
          );
        })}

         {registroError && (
                <span className="error-msg">* {registroError}</span>
              )}

        {isPending ?
          <LoadingComponente width={25} height={25}/>:<button type="submit" disabled={isPending}>
           Registrarse
        </button>}

        

   
      </form>

      {registroExitoso && (
        <div className="success-msg">¡Registro exitoso!</div>
      )}

      <div className="registro">
        ¿Ya tienes cuenta?{" "}
        <span className="Registrarse" onClick={Logueate} style={{ cursor: "pointer" }}>
          Inicia sesión
        </span>
      </div>
    </div>
  );
}

