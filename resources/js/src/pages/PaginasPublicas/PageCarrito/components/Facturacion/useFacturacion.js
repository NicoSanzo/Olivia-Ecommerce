import { useQuery } from "@tanstack/react-query";
import { useValidarCompra } from "../../../../../Context/validarComprar";
import  { useEffect, useState } from "react";
import { fetchGenerico } from "../../../../../utils/fetchGenerico";

export function UseFacturacion() {

    
    const {isSubmitted,errors,setDatosFacturacion } = useValidarCompra()
    const [ Abrir_Mod_DomFis_User,  set_Abrir_Mod_DomFis_User]= useState(false);
    const[triggerFetch,setTriggerFetch]=useState(false);


    const AbrirEditableDomFis = () => {
        set_Abrir_Mod_DomFis_User(true); 
    };

    useEffect(() => {
        setTriggerFetch(true);
    }, []);


    const {data, isLoading,error}=useQuery(({
        queryKey:['getDataFiscal'],
        queryFn:()=>fetchGenerico("/api/getDataFiscal","POST", null),
    }))
 
    
    const onClose=()=>{
        set_Abrir_Mod_DomFis_User(false);
        
    }


    return { 
        data, 
        isLoading,
        error,
        Abrir_Mod_DomFis_User,
        onClose,
        AbrirEditableDomFis,
        setTriggerFetch,
        isSubmitted,
        errors,
       

    }
    
}
