import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAddCarrito } from './addCarritoContext';
import { useFetch } from '../hooks/PedidoFetchGenerico';
import { useAuth } from './authContext';
import { Navigate } from 'react-router-dom';


const validarComprar = createContext();

export const ContextvalidarAndComprar = ({ children }) => {
    //const navigate = useNavigate(); // hook para manejar la navegación

const  {arrayProductsCarrito,subtotalConDescuento,Envio,porcentajeDescuento,total,setMostrarMetodosDePago,setPrecioEnvio,setMostrarDescuento,setPorcentajeDescuento} = useAddCarrito(); 
const {isTokenValid,checkAuthStatus,logout}=useAuth();

   
const [tipoEntrega,setTipoEntrega]=useState(null);
const [terminosCondiciones,setTerminosCondiciones]=useState(false)
const [metodo_pago,setMetodoPago]= useState(null);
const [isSubmitted,setIsSubbmited] = useState(false);
const [datosFacturacion, setDatosFacturacion]=useState(false);
const [publisEnviadas,setPublisEnviadas]=useState({})
const [validacionExitosa,setValidacionExitosa]=useState(false);
const [triggerCompraTransfer,setTriggerCompraTransfer]= useState(false)
const [triggerCompraMercadopago,setTriggerCompraMercadopago]= useState(false)
const [errors, setErrors] = useState({});
const [abrirCompraExitosa,setCompraExitosa]=useState(false);
const [IDMercadopago, setIDMercadopago] = useState(null)

    const Validate= ()=>{

        const newErrors= {}
        if(tipoEntrega===null){
            newErrors.entrega="*Seleccione una entrega"
        }
        if(terminosCondiciones===false){
            newErrors.terminos="*Acepte los términos y condiciones"
        }
        if(metodo_pago===null){
            newErrors.metodo_pago="*Elija un metodo de pago"
        }
        if(datosFacturacion===true){
            newErrors.datosFacturacion="*Complete los datos de facturación"
        }

        setErrors(newErrors);
        return newErrors
    }

    useEffect(() => {
        // Resetear los estados cuando se cambie de ruta o se cierre la sesion (son estados de useAuth y useAddCarrito)
        setTipoEntrega(null);
        setTerminosCondiciones(false);
        setMetodoPago(null);
        setIsSubbmited(false)
        setMostrarMetodosDePago(false);
        setPrecioEnvio(0);
        setPorcentajeDescuento(0);
        setMostrarDescuento(null);
    }, [logout,Navigate]); 
    

/************  Se valida todo el carrito cada vez que cambia alguna de las opciones elegidas por los compradores *******************/ 

    useEffect(() => {
        Validate();
        setValidacionExitosa(false)      
    }, [tipoEntrega,terminosCondiciones,metodo_pago,datosFacturacion]);
    

/************  Armo el Json de productos que le voy a enviar al completarse la compra *******************/ 

    useEffect(() => {
        const productos = arrayProductsCarrito.map(({ data: { data }, stock }) => ({
            id: data.itemKey,
            imagen:data.imagen,
            precio: data.price,
            titulo:data.titulo,
            cantidad: stock
        }));
        
        setPublisEnviadas(JSON.stringify(productos));

    }, [arrayProductsCarrito]);


    const {data:data_transfer,loading:loading_transfer,error:error_transfer} = useFetch("api/operacion_transferencia.php","POST" ,{publisEnviadas, subtotalConDescuento,Envio, tipoEntrega,porcentajeDescuento,metodo_pago} , triggerCompraTransfer);
    const {data:data_MP,loading:loading_MP,error:error_MP} = useFetch("api/mercadopago.php","POST" ,{publisEnviadas,total,Envio, tipoEntrega,porcentajeDescuento ,metodo_pago} , triggerCompraMercadopago); 

    useEffect(() => {
        if (data_transfer){   
            if(data_transfer.incompleto===true){
                setDatosFacturacion(true)
            }
            if(data_transfer.success){
                setCompraExitosa(true)
                setValidacionExitosa(false)
                setMetodoPago(null) ;  
                setTipoEntrega(null); 
                setTerminosCondiciones(false); 
                setIsSubbmited(false)
            }
        }
        if(data_MP){
            if(data_MP.PreferenceID){
                setIDMercadopago(data_MP.PreferenceID)
            }   
        }

        setTriggerCompraTransfer(false)
        setTriggerCompraMercadopago(false)

    }, [data_transfer,error_transfer,data_MP,error_MP]);

   
    const handleFinalizarCompra = () => {

        checkAuthStatus()
        
        if(!isTokenValid)
        {return}

        if (Object.keys(errors).length > 0  ) {
            setIsSubbmited(true);
            setValidacionExitosa(false)
            return;
        }

        if (Object.keys(errors).length === 0)
            {
                setValidacionExitosa(true);
                if(metodo_pago=="Mercadopago"){
                    setTriggerCompraMercadopago(true);
                }
            }
           
    };


    const handleRealizarCompraTransfer = () => {       
        checkAuthStatus()
         if(!isTokenValid)
        {return}

        if (Object.keys(errors).length > 0) {
            setIsSubbmited(true);
            return;
        }
        else if (Object.keys(errors).length === 0)
        {
            if(metodo_pago=="Transferencia")
            { setTriggerCompraTransfer(true);}
           
        }         
    };


    return (
        <validarComprar.Provider 
        value={{ 

            setTipoEntrega,
            setTerminosCondiciones,
            setMetodoPago,
            handleRealizarCompraTransfer,
            handleFinalizarCompra,
            isSubmitted,
            errors,
            setErrors,
            Validate,
            setDatosFacturacion,
            metodo_pago,
            validacionExitosa,
            IDMercadopago,
            setIDMercadopago,
            abrirCompraExitosa,
            setCompraExitosa,
            loading_MP,
           
           }}>
            
        {children}
        </validarComprar.Provider>
    );
};

export const useValidarCompra = () => useContext(validarComprar); // Hook que retorno 

