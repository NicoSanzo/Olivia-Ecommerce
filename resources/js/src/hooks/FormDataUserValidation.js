import { useEffect, useState } from 'react';

export const useFormDataUserValidation = (formValues,submitted,onClose) => {
  const [errors, setErrors] = useState({});
  const ExpresionMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const ExpresionUsuario = /^[a-zA-Z0-9_-]{3,50}$/;
  const ExpresionPassword = /^(?=(.*[A-Z]))(?=(.*[0-9]))(?=(.*[!@#$%^&*(),.?":{}|<>]))(?!.*\s).{8,}$/;
  const ExpresionDni = /^\d{6,8}$/;

  const validate = () => {
    const newErrors = {};

    /*VALIDACIONES DE DATOS USUARIO */
    
    if (formValues.nombre !== undefined) {
      if (!formValues.nombre) {
        newErrors.nombre = "*Debe ingresar un nombre";
      } else if (formValues.nombre.length > 60) {
        newErrors.nombre = "* Hasta 60 caracteres";
      }
    }


    if (formValues.apellido !== undefined) {
      if (!formValues.apellido) {
        newErrors.apellido = "*Debe ingresar un apellido";
      } else if (formValues.apellido.length > 60) {
        newErrors.apellido = "* Hasta 60 caracteres";
      }
    }

    if (formValues.mail !== undefined) {
      if (!formValues.mail) {
        newErrors.mail = "* Debe ingresar un mail";
      } else if (!ExpresionMail.test(formValues.mail)) {
        newErrors.mail = "* Ingrese un mail válido";
      } else if (formValues.mail.length > 150) {
        newErrors.mail = "* Hasta 150 caracteres";
      }
    }

    if (formValues.dni !== undefined) {
      if (!formValues.dni) {
        newErrors.dni = "* Debe ingresar un DNI (sin puntos)";
      } else if (!ExpresionDni.test(formValues.dni)) {
        newErrors.dni = "* DNI inválido";
      }
    }

    if (formValues.celular !== undefined) {
      if (!formValues.celular) {
        newErrors.celular = "* Debe ingresar un celular (sin guiones)";
      } else if (formValues.celular.length > 15) {
        newErrors.celular = "* Hasta 15 caracteres";
      }
    }

    if (formValues.usuario !== undefined) {
      if (!ExpresionUsuario.test(formValues.usuario)) {
        newErrors.usuario = "* El usuario debe tener entre 3 y 50 caracteres, y puede contener letras, números, guiones y guiones bajos.";
      }
    }


    if (formValues.contraseña_nueva !== undefined ) {
      if (!formValues.contraseña_nueva) {
        newErrors.contraseña_nueva = "* Debe ingresar una contraseña";
      }else if (!ExpresionPassword.test(formValues.contraseña_nueva)) {
        newErrors.contraseña_nueva = "* La contraseña debe tener al menos 8 caracteres, una letra mayúscula, un número y un carácter especial. No debe contener espacios.";
      }
    }


    if (formValues.contraseña !== undefined ) {
      if (!formValues.contraseña) {
        if (!ExpresionPassword.test(formValues.contraseña)) {
          newErrors.contraseña = "* La contraseña debe tener al menos 8 caracteres, una letra mayúscula, un número y un carácter especial. No debe contener espacios.";
        }
      }
    }


    if (formValues.repetirContraseñaNueva !== undefined) {
      if (!formValues.repetirContraseñaNueva) {
        newErrors.repetirContraseñaNueva = "* Debe repetir la contraseña";
      } else if (formValues.repetirContraseñaNueva !== formValues.contraseña_nueva ) {
        newErrors.repetirContraseñaNueva = "* Las contraseñas no coinciden";
      }
    }


    if (formValues.repetirContraseña !== undefined) {
      if (!formValues.repetirContraseña) {
        newErrors.repetirContraseña = "* Debe repetir la contraseña";
      } else if (formValues.repetirContraseña !== formValues.contraseña ) {
        newErrors.repetirContraseña = "* Las contraseñas no coinciden";
      }
    }

    if (formValues.fecha_nacimiento !== undefined) {
      if (!formValues.fecha_nacimiento) {
        newErrors.fecha_nacimiento = "*Ingrese una fecha de nacimiento";
      }
    }

    /* VALIDACION DE DATOS DE DOMICILIO FISCAL*/

    if (formValues.direccion_fis !== undefined) {
      if (!formValues.direccion_fis) {
        newErrors.direccion_fis = "*Debe ingresar una direccion";
      } else if (formValues.direccion_fis.length > 70){
        newErrors.direccion_fis = "*Hasta 70 caracteres";
      }
    }

    if (formValues.localidad_fis !== undefined) {
      if (!formValues.localidad_fis) {
        newErrors.localidad_fis = "*Debe ingresar una Localidad";
      } else if (formValues.localidad_fis.length > 70){
        newErrors.localidad_fis = "*Hasta 70 caracteres";
      }
    }

    if (formValues.provincia_fis !== undefined) {
      if (!formValues.provincia_fis) {
        newErrors.provincia_fis = "*Debe ingresar una Provincia";
      } else if (formValues.provincia_fis.length > 30){
        newErrors.provincia_fis = "*Hasta 30 caracteres";
      }
    }

    if (formValues.codigo_postal_fis !== undefined) {
      if (!formValues.codigo_postal_fis) {
        newErrors.codigo_postal_fis = "*Debe ingresar un codigo postal";
      }else if (formValues.codigo_postal_fis.length > 6){
        newErrors.codigo_postal_fis = "*Hasta 6 numeros";
      }
    }


 /* VALIDACION DE DATOS DE DOMICILIO DE ENVIO*/

    if (formValues.direccion_env !== undefined) {
      if (!formValues.direccion_env) {
        newErrors.direccion_env = "*Debe ingresar una direccion";
      } else if (formValues.direccion_env.length > 70){
        newErrors.direccion_env = "*Hasta 70 caracteres";
      }
    }

    if (formValues.localidad_env !== undefined) {
      if (!formValues.localidad_env) {
        newErrors.localidad_env = "*Debe ingresar una Localidad";
      } else if (formValues.localidad_env.length > 70){
        newErrors.localidad_env = "*Hasta 70 caracteres";
      }
    }

    if (formValues.provincia_env !== undefined) {
      if (!formValues.provincia_env) {
        newErrors.provincia_env = "*Debe ingresar una Provincia";
      } else if (formValues.provincia_env.length > 30){
        newErrors.provincia_env = "*Hasta 30 caracteres";
      }
    }

    if (formValues.codigo_postal_env !== undefined) {
      if (!formValues.codigo_postal_env) {
        newErrors.codigo_postal_env = "*Debe ingresar un codigo postal";
      }else if (formValues.codigo_postal_env.length > 6){
        newErrors.codigo_postal_env = "*Hasta 6 numeros";
      }
    }


    

    setErrors(newErrors);
    return newErrors;
  };

  useEffect(() => {
    if(submitted===true) 
    {
      validate();
    }
    
    
  }, [formValues]);
  

  useEffect(() => {
    setErrors({});  
    
  }, [onClose]);

  return { errors, validate };
};