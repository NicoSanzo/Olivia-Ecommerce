import "./RegistrarseStyle.css";
import React, { useEffect, useState } from "react";
import { useFetch } from "../../../../hooks/PedidoFetchGenerico";
import { GenericExitoso } from "../../../../components/GenericExitoso/GenericExitoso";
import { LoadingComponente } from "../../../../components/GenericLoadingComponent/LoadingComponent";

export const Registrarse = ({ Logueate }) => {
  // Expresiones regulares
  const ExpresionMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const ExpresionUsuario = /^[a-zA-Z0-9_-]{3,50}$/;
  const ExpresionPassword = /^(?=(.*[A-Z]))(?=(.*[0-9]))(?=(.*[!@#$%^&*(),.?":{}|<>]))(?!.*\s).{8,}$/;
  const ExpresionDni = /^\d{7,8}$/;

  const [errors, setErrors] = useState({});
  const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [FORMDATA, setFORMDATA] = useState(false);
  const [triggerFetch, setTriggerFetch] = useState(false);

  const [formValues, setFormValues] = useState({
    nombre: "",
    apellido: "",
    email: "",
    usuario: "",
    dni: "",
    celular: "",
    contraseña: "",
    repetirContraseña: "",
  });

  // Función de validación
  const validate = () => {
    const newErrors = {};

    // Validaciones para cada campo
    if (!formValues.nombre) {
      newErrors.nombre = "Debe ingresar un nombre";
    } else if (formValues.nombre.length > 60) {
      newErrors.nombre = "* Hasta 60 caracteres";
    }

    if (!formValues.apellido) {
      newErrors.apellido = "Debe ingresar un apellido";
    } else if (formValues.apellido.length > 60) {
      newErrors.apellido = "* Hasta 60 caracteres";
    }

    if (!ExpresionMail.test(formValues.email)) {
      newErrors.email = "* Ingrese un mail válido";
    } else if (formValues.email.length > 150) {
      newErrors.email = "* Hasta 150 caracteres";
    } else if (!formValues.email) {
      newErrors.email = "* Debe ingresar un mail";
    }

    if (!formValues.dni) {
      newErrors.dni = "* Debe ingresar un DNI (sin puntos)";
    } else if (!ExpresionDni.test(formValues.dni)) {
      newErrors.dni = "* DNI inválido";
    }

    if (!formValues.celular) {
      newErrors.celular = "* Debe ingresar un celular (sin guiones)";
    } else if (formValues.celular.length > 15) {
      newErrors.celular = "* Hasta 15 caracteres";
    }

    if (!ExpresionUsuario.test(formValues.usuario)) {
      newErrors.usuario = "* El usuario debe tener entre 3 y 50 caracteres, y puede contener letras, números, guiones y guiones bajos.";
    }

    if (!ExpresionPassword.test(formValues.contraseña)) {
      newErrors.contraseña = "* La contraseña debe tener al menos 8 caracteres, una letra mayúscula, un número y un carácter especial. No debe contener espacios.";
    }

    if (!formValues.repetirContraseña) {
      newErrors.repetirContraseña = "* Debe repetir la contraseña";
    } else if (formValues.repetirContraseña !== formValues.contraseña) {
      newErrors.repetirContraseña = "* Las contraseñas no coinciden";
    }

    return newErrors;
  };



  // Manejo de cambios en los inputs
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  // Efecto para validar cuando hay cambios
  useEffect(() => {
    if (isSubmittedSuccessfully==true) return;

    if (submitted) {
      const validationErrors = validate();
      setErrors(validationErrors);
    }
  }, [formValues]);


  // Manejo del envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const validationErrors = validate();

    if (Object.keys(validationErrors).length === 0) {
      // Enviar datos si no hay errores
      const formData = new FormData();
      Object.keys(formValues).forEach((key) => {
        formData.append(key, formValues[key]);
      });

      setFORMDATA(formData);
      setTriggerFetch(true);
      

    } else {
      setErrors(validationErrors);
    }
  };


const {data,loading,error} = useFetch ("api/alta_cliente_NUEVO.php","POST", FORMDATA , triggerFetch)



useEffect(() => {
  if (data)
  {
    if(data.data==true){ 
      setFormValues({
        nombre: "",
        apellido: "",
        email: "",
        usuario: "",
        dni: "",
        celular: "",
        contraseña: "",
        repetirContraseña: "",
      });
      setIsSubmittedSuccessfully(true);
    }
  }


  setTriggerFetch(false);
}, [data])



  // Regresar a la pantalla de login
  const backToLogin = () => {
    Logueate();
  };

  const handleCloseModal = () => {
    setIsSubmittedSuccessfully(false); // Cierra el modal cuando se presiona "OK"
    setSubmitted(false);
    
  };



  return (
    <>

    {isSubmittedSuccessfully && <GenericExitoso isSuccess={isSubmittedSuccessfully}  onClose={handleCloseModal} Leyenda={"¡Registro Exitoso!"}/>}

    <div className="registro-container">    
      <h2 className="title">¡Regístrate!</h2>
      <form onSubmit={handleSubmit}>
        <div className="Entradas">
          <input
            type="text"
            name="nombre"
            value={formValues.nombre}
            placeholder="Nombre"
            onChange={handleChange}
          />
          <div className="error-msg">{errors.nombre}</div>
        </div>

        <div className="Entradas">
          <input
            type="text"
            name="apellido"
            value={formValues.apellido}
            placeholder="Apellido"
            onChange={handleChange}
          />
          <div className="error-msg">{errors.apellido}</div>
        </div>

        <div className="Entradas">
          <input
            type="email"
            name="email"
            value={formValues.email}
            placeholder="Mail"
            onChange={handleChange}
          />
          <div className="error-msg">{errors.email}</div>
        </div>

        <div className="Entradas">
          <input
            type="text"
            name="usuario"
            value={formValues.usuario}
            placeholder="Usuario"
            onChange={handleChange}
          />
          <div className="error-msg">{errors.usuario}</div>
        </div>

        <div className="Entradas">
          <input
            type="number"
            name="dni"
            value={formValues.dni}
            placeholder="DNI"
            onChange={handleChange}
          />
          <div className="error-msg">{errors.dni}</div>
        </div>

        <div className="Entradas">
          <input
            type="number"
            name="celular"
            value={formValues.celular}
            placeholder="Celular (sin guiones)"
            onChange={handleChange}
          />
          <div className="error-msg">{errors.celular}</div>
        </div>

        <div className="Entradas">
          <input
            type="password"
            name="contraseña"
            value={formValues.contraseña}
            placeholder="Contraseña"
            onChange={handleChange}
          />
          <div className="error-msg">{errors.contraseña}</div>
        </div>

        <div className="Entradas">
          <input
            type="password"
            name="repetirContraseña"
            value={formValues.repetirContraseña}
            placeholder="Repetir Contraseña"
            onChange={handleChange}
          />
          <div className="error-msg">{errors.repetirContraseña}</div>
        </div>

        <button type="submit">Registrarse</button>
        
      </form>
      {loading && <LoadingComponente width={15} height={15}/>}
      <h3 className="registro">
        ¿Ya tenés cuenta? Inicia sesión{" "}
        <div className="Registrarse" onClick={backToLogin}>
          aquí
        </div>
      </h3>
    </div>
    </>
  );
};
