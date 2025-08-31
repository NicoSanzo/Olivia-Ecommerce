import { useForm } from "react-hook-form";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { fetchGenerico } from "../../../../utils/fetchGenerico";

export function UseRegistrarse() {
  const [registroExitoso, setRegistroExitoso] = useState(false);
  const [registroError, setRegistroError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

const password = watch("contraseña");

  const {mutate, isPending} = useMutation({
    mutationFn: (data) => fetchGenerico("/api/registrarCliente", "POST", data),
    onSuccess: (data) => {
      if (data.status === "success") {
        setRegistroExitoso(true);
        reset(); // Limpiar formulario
        setRegistroError(""); // Limpiar errores
      } 
    },
    onError: (error) => {
      setRegistroError(Object.values(error.message).flat()[0]);
    } 
    
  });




  const onSubmit = (formData) => {
    setRegistroExitoso(false);
    setRegistroError(""); 
    mutate(formData);     
  };

  const validacionCampos = (name, rules) => {
    if (name === "email") {
      rules.pattern = {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Formato de email inválido",
      };
      rules.maxLength = { value: 150, message: "Hasta 150 caracteres" };
    }

    if (name === "nombre" || name === "apellido") {
      rules.maxLength = {
        value: 60,
        message: "Máximo 60 caracteres",
      };
    }

    if (name === "usuario") {
      rules.pattern = {
        value: /^[a-zA-Z0-9-_]{3,50}$/,
        message: "3-50 letras, números, guiones",
      };
    }

    if (name === "dni") {
      rules.pattern = {
        value: /^\d{7,8}$/,
        message: "DNI inválido",
      };
    }

    if (name === "celular") {
      rules.maxLength = {
        value: 15,
        message: "Máximo 15 caracteres",
      };
    }

    if (name === "contraseña") {
      rules.pattern = {
        value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.-])[A-Za-z\d@$!%*?&.-]{8,}$/,   
      };
    }

    if (name === "repetirContraseña") {
      rules.validate = (value) =>
        value === password || "Las contraseñas no coinciden";
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    watch,
    onSubmit,
    reset,
    registroExitoso,
    registroError,
    isPending,
    validacionCampos,
  };
}