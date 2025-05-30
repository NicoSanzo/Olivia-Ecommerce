import { useEffect, useState } from "react";
import { useFetch } from "../../../hooks/PedidoFetchGenerico";


export function UseContacto() {


    const [isDisabled, setIsDisabled] = useState(true);
    const [triggerEnviarMail, setTriggerEnviarMail] = useState(false);
    const [datosEnviados, setDatosEnviados] = useState(null);
    const [isMail, setIsMail] = useState(false);
    const expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const [datosMensaje, setDatosMensaje] = useState({
        nombre: "",
        apellido: "",
        email: "",
        mensaje: "",
      });
    
    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
    
        setDatosMensaje((prev) => ({
          ...prev,
          [name]: value,
        }));
    
        if (name === "email") {
          setIsMail(expresion.test(value));
        }
    };
    
    useEffect(() => {
        if(datosMensaje.nombre === "" ||  datosMensaje.apellido === "" ||  datosMensaje.mensaje === "" | datosMensaje.email === "" || !isMail){
            setIsDisabled(true);
        }else{
            setIsDisabled(false)
        }
    }, [datosMensaje, isMail]);
      
    
    const sendEmail = (event) => {
        event.preventDefault();
        const formData = new FormData();

        Object.entries(datosMensaje).forEach(([key, value]) => {
          formData.append(key, value);
        });
    
        setDatosEnviados(formData);
        setTriggerEnviarMail(true);
    };
    
    const { data, loading, error } = useFetch("/api/contacto","POST",datosEnviados,triggerEnviarMail);
      
    useEffect(() => {
        if (data?.success === true){
            setDatosMensaje({
                nombre: "",
                apellido: "",
                email: "",
                mensaje: "",
            });
            setIsMail(false);
        }
        setTriggerEnviarMail(false);
        setIsDisabled(true)
    }, [data,loading,error]);


    return {

        handleInputChange,
        sendEmail, 
        isDisabled,
        datosMensaje,
        loading,
        data,
        error

    }
       
    
}
