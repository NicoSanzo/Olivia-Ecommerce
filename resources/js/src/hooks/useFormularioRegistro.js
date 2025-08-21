// hooks/useFormularioRegistro.js
import { useState } from "react";

const expresiones = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  usuario: /^[a-zA-Z0-9-_]{3,50}$/,
  contraseña: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  dni: /^\d{7,8}$/
};

const valoresIniciales = {
  nombre: "",
  apellido: "",
  email: "",
  usuario: "",
  dni: "",
  celular: "",
  contraseña: "",
  repetirContraseña: ""
};

export const useFormularioRegistro = () => {
  const [formValues, setFormValues] = useState(valoresIniciales);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const resetFormulario = () => {
    setFormValues(valoresIniciales);
    setErrors({});
    setSubmitted(false);
  };

  const validar = () => {
    const newErrors = {};
    const {
      nombre, apellido, email, usuario, dni,
      celular, contraseña, repetirContraseña
    } = formValues;

    if (!nombre.trim()) newErrors.nombre = "Debe ingresar un nombre";
    else if (nombre.length > 60) newErrors.nombre = "Hasta 60 caracteres";

    if (!apellido.trim()) newErrors.apellido = "Debe ingresar un apellido";
    else if (apellido.length > 60) newErrors.apellido = "Hasta 60 caracteres";

    if (!email.trim()) newErrors.email = "Debe ingresar un mail";
    else if (!expresiones.email.test(email)) newErrors.email = "Mail inválido";
    else if (email.length > 150) newErrors.email = "Hasta 150 caracteres";

    if (!dni.trim()) newErrors.dni = "Debe ingresar un DNI";
    else if (!expresiones.dni.test(dni)) newErrors.dni = "DNI inválido";

    if (!celular.trim()) newErrors.celular = "Debe ingresar un celular";
    else if (celular.length > 15) newErrors.celular = "Hasta 15 caracteres";

    if (!expresiones.usuario.test(usuario)) {
      newErrors.usuario = "Usuario inválido (3-50 caracteres, letras, números, guiones)";
    }

    if (!expresiones.contraseña.test(contraseña)) {
      newErrors.contraseña = "Mínimo 8 caracteres, 1 mayúscula, 1 número, 1 símbolo";
    }

    if (!repetirContraseña.trim()) {
      newErrors.repetirContraseña = "Debe repetir la contraseña";
    } else if (repetirContraseña !== contraseña) {
      newErrors.repetirContraseña = "Las contraseñas no coinciden";
    }

    setErrors(newErrors);
    return newErrors;
  };

  return {
    formValues,
    errors,
    handleChange,
    validar,
    resetFormulario,
    setSubmitted,
    submitted
  };
};