import { useValidarCompra } from "../../../../../Context/validarComprar";
import { useFetch } from "../../../../../hooks/PedidoFetchGenerico";
import React, { useEffect, useState } from "react";

export function UseFacturacion() {

    
    const {isSubmitted,errors ,Validate,setDatosFacturacion } = useValidarCompra()
    const [ Abrir_Mod_DomFis_User,  set_Abrir_Mod_DomFis_User]= useState(false);
    const[triggerFetch,setTriggerFetch]=useState(false);


    const AbrirEditableDomFis = () => {
        set_Abrir_Mod_DomFis_User(true); 
    };

    useEffect(() => {
        setTriggerFetch(true);
    }, []);

    const {data, loading, error} = useFetch("./api/fetch_dom_fiscal.php","POST", null , triggerFetch);

    useEffect(() => {
        if(data && data.data)
        setTriggerFetch(false);
        setDatosFacturacion(false)
    }, [data]);

    
    const onClose=()=>{
        set_Abrir_Mod_DomFis_User(false);
        
    }


    return { 
        data, 
        loading,
        error,
        Abrir_Mod_DomFis_User,
        onClose,
        AbrirEditableDomFis,
        setTriggerFetch,
        isSubmitted,
        errors,
       

    }
    
}
