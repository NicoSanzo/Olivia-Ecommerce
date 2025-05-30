import React, { useEffect, useState } from "react";
import  { useFetch } from "../../../../hooks/PedidoFetchGenerico";
import "./MiPerfilStyle.css"; 
import { ModalDatoUsuario } from "./ModalDatosUsuario/ModalDatoUsuario";
import { ModalDomFis } from "./ModalDatosFiscal/ModalDatosFiscal";
import { ModalDomEnv } from "./ModalDatosDomEnv/ModalDatosDomEnvio";
import { VentanaModal } from "../../../../components/GenericModal/VentanaModal";
import { LoadingComponente } from "../../../../components/GenericLoadingComponent/LoadingComponent";
import { ModalCambioPass } from "./ModalCambioPass/ModalCambioPass";


export const MiPerfil = () => {


    const[triggerFetch, setTriggerFectch]=useState(false);
    const{data,loading,error}= useFetch("api/fetch_cliente_datos.php","POST",null,triggerFetch);

    const[abir_Modal_Mod_Data_user,set_Abrir_Mod_Data_User]=useState(false);
    const[abir_Modal_DomFis_user,set_Abrir_Mod_DomFis_User]=useState(false);
    const[abir_Modal_DomEnv_user,set_Abrir_Mod_DomEnv_User]=useState(false);
    const[abir_Modal_Cambio_pass,set_Abrir_Mod_Cambio_Pass]=useState(false);
    

    useEffect(() => {
        setTriggerFectch(true);
    
    }, [])
    
    useEffect(() => {
        if(data && data.data)
        {
            setTriggerFectch(false);
        } 
    
    }, [data])



        const AbrirModalUsuarioMod=()=>{
            set_Abrir_Mod_Data_User(true);
        }

        const AbrirModalDomFisMod=()=>{
            set_Abrir_Mod_DomFis_User(true);
        }

        const AbrirModalDomEnvMod=()=>{
            set_Abrir_Mod_DomEnv_User(true);
        }

        const AbrirModalCambioPass=()=>{
            set_Abrir_Mod_Cambio_Pass(true);
        }

        const onClose=()=>{
            set_Abrir_Mod_Data_User(false);
            set_Abrir_Mod_DomFis_User(false);
            set_Abrir_Mod_DomEnv_User(false);
            set_Abrir_Mod_Cambio_Pass(false);
        }
        

    return (

    <>
    
    {loading && <VentanaModal Abierto={true}>
                    <LoadingComponente width={35} height={35}/>
                </VentanaModal> 
    }
    <div className="Principal-Client-Container">

    <h2 className="titulo"> Contraseña </h2>
    
        <div className="Datos-Container">           
            <button className="Modificar-datos-button" onClick={AbrirModalCambioPass}> </button>

            <div className="dato">
                <h2 className="data-label">Contraseña</h2> <h2 className="Data">**************</h2>
            </div>
        </div>

    {<ModalCambioPass isOpen={abir_Modal_Cambio_pass} onClose={onClose} data={data?.data} ActualizarPagina={setTriggerFectch}/>}
    
    {/**************************DATOS DE USUARIO******************************/ }
        <h2 className="titulo"> Datos De usuario </h2>

        <div className="Datos-Container">
            <button className="Modificar-datos-button" onClick={AbrirModalUsuarioMod}></button>

            <div className="Columna-datauser">
                <div className="dato">
                    <h2 className="data-label">NOMBRE</h2> <h2 className="Data">{data? data.data[0].nombre: "" }</h2>
                </div>
                <div className="dato">
                    <h2 className="data-label">APELLIDO</h2> <h2 className="Data">{data? data.data[0].apellido: ""}</h2>
                </div>
                <div className="dato">
                    <h2 className="data-label">MAIL</h2> <h2 className="Data">{data? data.data[0].mail: ""}</h2>
                </div>
                <div className="dato">
                    <h2 className="data-label">USUARIO</h2> <h2 className="Data">{data? data.data[0].username: ""}</h2>
                </div>
            </div>
            
            <div className="Columna-datauser">
                <div className="dato">
                    <h2 className="data-label">DNI</h2> <h2 className="Data">{data? data.data[0].dni: ""}</h2>
                </div>
                <div className="dato">
                    <h2 className="data-label">CELULAR </h2> <h2 className="Data">{data? data.data[0].celular: ""}</h2>
                </div>
                <div className="dato">
                    <h2 className="data-label">FECHA DE ALTA</h2> <h2 className="Data">{data? data.data[0].fecha_alta: ""}</h2>
                </div>
                <div className="dato">
                    <h2 className="data-label">FECHA DE NACIMIENTO</h2> <h2 className="Data">{data? data.data[0].fecha_nacimiento: ""}</h2>
                </div>
            </div>        
        </div>
        {<ModalDatoUsuario isOpen={abir_Modal_Mod_Data_user} onClose={onClose} data={data?.data} ActualizarPagina={setTriggerFectch}/>}

            {/**************************DOMICILIO FISCAL******************************/ }

        <h2 className="titulo"> Domicilio de Facturacion/Fiscal </h2>
        <div className="Datos-Container">    

                <button className="Modificar-datos-button" onClick={AbrirModalDomFisMod}> </button>

                <div className="Columna-datauser">
                    <div className="dato">
                        <h2 className="data-label">DOMICILIO</h2> <h2 className="Data">{data? data.data[0].direccion_fis: ""}</h2>
                    </div>
                    <div className="dato">
                        <h2 className="data-label">LOCALIDAD</h2> <h2 className="Data">{data? data.data[0].localidad_fis: ""}</h2>
                    </div>
                </div>              

                <div className="Columna-datauser">
                    <div className="dato">
                        <h2 className="data-label">PROVINCIA</h2> <h2 className="Data">{data? data.data[0].provincia_fis: ""}</h2>
                    </div>
                    <div className="dato">
                        <h2 className="data-label">CODIGO POSTAL </h2> <h2 className="Data">{data? data.data[0].codigo_postal_fis: ""}</h2>
                    </div>
                    
                </div>         
        </div>
        {<ModalDomFis isOpen={abir_Modal_DomFis_user} onClose={onClose} data={data?.data} ActualizarPagina={setTriggerFectch}/>}
        {/**************************DOMICILIO DE ENVIO******************************/ }

        <h2 className="titulo"> Domicilio de Envio </h2>

        <div className="Datos-Container">       

            <button className="Modificar-datos-button" onClick={AbrirModalDomEnvMod}></button>        

            <div className="Columna-datauser">
                <div className="dato">
                    <h2 className="data-label">DOMICILIO</h2> <h2 className="Data">{data? data.data[0].direccion_env: ""}</h2>
                </div>
                <div className="dato">
                    <h2 className="data-label">LOCALIDAD</h2> <h2 className="Data">{data? data.data[0].localidad_env: ""}</h2>
                </div>
            </div>                          

            <div className="Columna-datauser">
                <div className="dato">
                    <h2 className="data-label">PROVINCIA</h2> <h2 className="Data">{data? data.data[0].provincia_env: ""}</h2>
                </div>
                <div className="dato">
                    <h2 className="data-label">CODIGO POSTAL </h2> <h2 className="Data">{data? data.data[0].codigo_postal_env: ""}</h2>
                </div>

            </div>         
        </div>

        {<ModalDomEnv isOpen={abir_Modal_DomEnv_user} onClose={onClose} data={data?.data} ActualizarPagina={setTriggerFectch}/>}

    
    
    </div>
    </>
  )
}
