import React, { useEffect, useState } from "react";
import "./LoginStyle.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../../Context/authContext";
import { useFetch } from "../../../hooks/PedidoFetchGenerico";
import { LoadingComponente } from "../../../components/GenericLoadingComponent/LoadingComponent";

export const Login = ({ onClose, Registrate }) => {
    const { setCheckSession } = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [Error, setError] = useState("");
    const [enviar, setEnviar] = useState(false);
    const [Loading, setLoading] = useState(false);
    

    const iniciarSesion = (e) => {
        e.preventDefault();
        setError("");
       
        if (!username || !password) {
            setError("Por favor, completa todos los campos.");
            setTimeout(() => setError(""), 3000);
            return;
        }
        setLoading(true);
        setEnviar(true);    
    };


    const { data, loading, error:fetchError } = useFetch("/api/login", 'POST', { username, password }, enviar);

    console.log(data)

    useEffect(() => {
             
         if (data?.status === "success" ) {
            setCheckSession(true);
            onClose();    //cierra el modal    
        }
        if (data?.error) {
            setError(data.error);      
        } 
        if (fetchError) {
            setError("Error de inicio de sesión. Intenta de nuevo.");
        }

        setEnviar(false);
        setLoading(false);
        const timer = setTimeout(() => setError(null), 3000);
        return () => clearTimeout(timer);
    }, [data]);


    const efectRegistro =()=>{
        Registrate();
    }


    return (
        <>
            <div className="Container-Principal">
                <h2 className="title">Iniciar Sesion</h2>
                <h3 className="registro">
                    ¿Es tu Primera Vez? <div  className="Registrarse" onClick={efectRegistro} >Regístrate</div>
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
                    {Loading && <LoadingComponente width={25} height={25} />}
                    {Error && <span>{Error}</span>}
                    </div>                   
                    <button type="submit">Iniciar Sesion</button>              
                </form>
                
            </div>
        </>
    );
};
