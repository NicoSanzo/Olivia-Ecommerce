
import { useEffect, useState } from "react";
import "./LoginStyle.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchGenerico } from "../../../utils/fetchGenerico";


export function useLogin({onClose,Registrate}) {
   
   
    const queryClient = useQueryClient();   

      const [username, setUsername] = useState("");
      const [password, setPassword] = useState("");
      const [loginError, setLoginError] = useState(""); 


      const loginMutation = useMutation({
        mutationFn: ({ username, password }) =>
          fetchGenerico("/api/login", "POST", { username, password }),
        onSuccess: (data) => {      
          if (data.status === "success") {
            queryClient.invalidateQueries({ queryKey: ["session"] });
            onClose();   
          }
        },
        onError: (error) => {
          setLoginError(error.message);
        },
      });   
  
      const iniciarSesion = (e) => {
        e.preventDefault();
        setLoginError("");
        if (!username || !password) {
          setLoginError("Por favor, completa todos los campos.");
          return;
        }   
        loginMutation.mutate({ username, password });
      };    

      useEffect(() => {
        if (loginError) {
          const timer = setTimeout(() => setLoginError(""), 3000);
          return () => clearTimeout(timer);
        }
      }, [loginError]); 

      const efectRegistro = () => {
        Registrate();
      };
   
   
   
   
   
    return {
             efectRegistro,
             iniciarSesion,
             setUsername,
             username,
             password,
             setPassword,
             loginMutation,  // <-- Aquí
             loginError 
    }
}
