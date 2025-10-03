import  { createContext, useContext, useEffect, useState } from 'react';
import { useAddCarrito } from './addCarritoContext';
import { useAuth } from './authContext';
import { Navigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchGenerico } from '../utils/fetchGenerico';




const validarComprar = createContext();

export const ContextvalidarAndComprar = ({ children }) => {
    //const navigate = useNavigate(); // hook para manejar la navegación

const  {arrayProductsCarrito,Envio,porcentajeDescuento,CarritoStateReset} = useAddCarrito(); 


const {autenticado, logout}=useAuth();

   
const [tipoEntrega,setTipoEntrega]=useState(null);
const [terminosCondiciones,setTerminosCondiciones]=useState(false)
const [metodo_pago,setMetodoPago]= useState(null);
const [isSubmitted,setIsSubbmited] = useState(false);
const [datosFacturacion, setDatosFacturacion]=useState(false);
const [publisEnviadas,setPublisEnviadas]=useState({})
const [validacionExitosa,setValidacionExitosa]=useState(false);
const [errors, setErrors] = useState({});
const [abrirCompraExitosa,setCompraExitosa]=useState(false);




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
        setIsSubbmited(false);
        CarritoStateReset()
    }, [logout,Navigate]); 
    

/************  Se valida todo el carrito cada vez que cambia alguna de las opciones elegidas por los compradores *******************/ 

    useEffect(() => {
        Validate();
        setValidacionExitosa(false)      
    }, [tipoEntrega,terminosCondiciones,metodo_pago,datosFacturacion]);
    

/************  Armo el Json de productos que le voy a enviar al completarse la compra *******************/ 

    //console.log(arrayProductsCarrito)
/*
    useEffect(() => {
        const productos = arrayProductsCarrito.map(({ data: { data }, stock }) => ({
            id: data.itemKey,
            imagen:data.imagen,
            precio: data.price,
            titulo:data.titulo,
            stock: stock
        }));
        
        setPublisEnviadas(JSON.stringify(productos));

    }, [arrayProductsCarrito]);*/

   // console.log(arrayProductsCarrito)

    //const {data:data_transfer,loading:loading_transfer,error:error_transfer} = useFetch("api/operacion_transferencia.php","POST" ,{publisEnviadas, subtotalConDescuento,Envio, tipoEntrega,porcentajeDescuento,metodo_pago} , triggerCompraTransfer);
    
    


const MutateCatchPaymentID = useMutation({
  mutationKey: ['createPreferenceId'],
  mutationFn: async () => {
    return await fetchGenerico("api/process_payment","POST", {arrayProductsCarrito,porcentajeDescuento,Envio});
  },
  onSuccess: (data) => {
   console.log(data)
  },
  onError: (error) => {
    console.error(error);
  }
  
});


const handleFinalizarCompra = () => {
    if(!autenticado){
        return;
    }
    if (Object.keys(errors).length > 0  ) {
        setIsSubbmited(true);
        setValidacionExitosa(false)
        return;
    }
    if (Object.keys(errors).length === 0) {
        setValidacionExitosa(true);
        if(metodo_pago=="Transferencia"){
            setTriggerCompraTransfer(true);
        }
        if(metodo_pago=="Mercadopago"){
                
                MutateCatchPaymentID.mutate();
            }
    }   
};

 



    return (
        <validarComprar.Provider 
        value={{ 

            setTipoEntrega,
            setTerminosCondiciones,
            setMetodoPago,
            handleFinalizarCompra,
            isSubmitted,
            errors,
            setErrors,
            Validate,
            setDatosFacturacion,
            metodo_pago,
            validacionExitosa,
            MutateCatchPaymentID,
            abrirCompraExitosa,
            setCompraExitosa,
            
           }}>
            
        {children}
        </validarComprar.Provider>
    );
};

export const useValidarCompra = () => useContext(validarComprar); // Hook que retorno 

