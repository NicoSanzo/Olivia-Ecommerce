import  { createContext, useContext, useEffect, useState } from 'react';
import { useAddCarrito } from './addCarritoContext';
import { useAuth } from './authContext';
import { Navigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { fetchGenerico } from '../utils/fetchGenerico';




const validarComprar = createContext();

export const ContextvalidarAndComprar = ({ children }) => {
    //const navigate = useNavigate(); // hook para manejar la navegación

const  {arrayProductsCarrito,Envio,porcentajeDescuento,CarritoStateReset,total,subtotal} = useAddCarrito(); 
const {autenticado, logout}=useAuth();

   
const [tipoEntrega,setTipoEntrega]=useState(null);
const [terminosCondiciones,setTerminosCondiciones]=useState(false)
const [metodo_pago,setMetodoPago]= useState(null);
const [isSubmitted,setIsSubbmited] = useState(false);
const [showTransferButton,setShowTransferButton]=useState(false);
const [datosFacturacion, setDatosFacturacion]=useState(false);
const [validacionExitosa,setValidacionExitosa]=useState(false);
const [errors, setErrors] = useState({});
const [paymentError, setPaymentError]= useState(null);



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
        setShowTransferButton(false)
    }, [logout,Navigate]); 
    

/************  Se valida todo el carrito cada vez que cambia alguna de las opciones elegidas por los compradores *******************/ 

    useEffect(() => {
        Validate();
        setValidacionExitosa(false)  
        setPaymentError(null)    
    }, [tipoEntrega,terminosCondiciones,metodo_pago,datosFacturacion]);
    

//creacion De pago Por transferencia//

const MutateTrasnsferPayment=useMutation({
    mutationKey:['TransferPayment'],
    mutationFn: ()=>{ return fetchGenerico("/api/transferProcessPayment","POST",{arrayProductsCarrito,porcentajeDescuento,Envio,total,subtotal})},
    onSuccess:(data) =>{
        console.log(data)
    },
    onError:(error)=>{
        console.log(error)
    }

})


    
//Creacion de pago a traves de Mercadopago//
const MutateCatchPaymentID = useMutation({
  mutationKey: ['createPreferenceId'],
  mutationFn: async () => {
    return await fetchGenerico("api/process_payment","POST", {arrayProductsCarrito,porcentajeDescuento,Envio});
  },
  onSuccess: (data) => {
  },
  onError: (error) => {
    setPaymentError('Ocurrió un error al intentar pagar con Mercadopago, inténtelo nuevamente más tarde')
  },
  
});

const handleFinalizarTransfer=()=>{

    MutateTrasnsferPayment.mutate();

}


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
        if(metodo_pago==="Transferencia"){
            setShowTransferButton(true);
        }
        if(metodo_pago==="Mercadopago"){
                
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
            handleFinalizarTransfer,
            showTransferButton,
            isSubmitted,
            errors,
            setErrors,
            Validate,
            setDatosFacturacion,
            metodo_pago,
            validacionExitosa,
            MutateCatchPaymentID,
            paymentError,
            setPaymentError,
            setShowTransferButton
           }}>
            
        {children}
        </validarComprar.Provider>
    );
};

export const useValidarCompra = () => useContext(validarComprar); // Hook que retorno 

