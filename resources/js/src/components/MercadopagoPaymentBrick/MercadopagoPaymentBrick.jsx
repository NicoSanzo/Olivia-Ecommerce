import { Payment } from "@mercadopago/sdk-react";
import { useValidarCompra } from "../../Context/validarComprar";
import { useAddCarrito } from "../../Context/addCarritoContext";
import { useNavigate } from "react-router-dom";



export function MercadopagoPaymentBrick() {

    const{arrayProductsCarrito,subtotal,total,Envio} =useAddCarrito()
    const{MutateCatchPaymentID}=useValidarCompra()
      const navigate = useNavigate();
    
    const initialization = {
     amount: subtotal.toFixed(2),
     preferenceId: MutateCatchPaymentID.data?.id,

    };
    
    const customization = {
         visual: {
           style: {
             theme: "default",
          },
         },
        paymentMethods: {
           creditCard: "all",
           debitCard: "all",
           mercadoPago: "all",
           maxInstallments: 1
         },
    }
 
const onSubmit = async (
 { selectedPaymentMethod, formData }
) => {

   if (selectedPaymentMethod === "wallet_purchase") {
    return Promise.resolve();
  }

   const fd = new FormData();
  // renombre el token por posible incompatibilidad con el JWT del backend


  // campos principales (dejamos nombres que leeremos en el back)
fd.append("cardToken", formData.token);
fd.append("issuer_id", formData.issuer_id);
fd.append("payment_method_id", formData.payment_method_id);
fd.append("transaction_amount", formData.transaction_amount);
fd.append("installments", formData.installments);
fd.append("email", formData?.payer?.email ?? "");
fd.append("identificationType", formData?.payer?.identification?.type ?? "");
fd.append("number", formData?.payer?.identification?.number ?? "");
fd.append("envio", Envio);
fd.append("arrayProductsCarrito",JSON.stringify(arrayProductsCarrito));
//fd.append("total",total);
 // callback llamado al hacer clic en el botón enviar datos
 return new Promise((resolve, reject) => {
   fetch("/api/cards_process_payment", {
     method: "POST",
     credentials:'include',
     body: fd,
   })
     .then((response) => response.json())

     .then((response) => {
       // recibir el resultado del pago
       navigate(response.responseUrl);
       resolve();
     })
     .catch((error) => {
       // manejar la respuesta de error al intentar crear el pago
       reject();
     });
 });
};

    
    const onError = async (error) => {
     // callback llamado para todos los casos de error de Brick
     console.log(error);
    };
    const onReady = async () => {
    
     /*
       Callback llamado cuando el Brick está listo.
       Aquí puede ocultar cargamentos de su sitio, por ejemplo.
     */
    };


    
    return (
       

        <Payment
           initialization={initialization}
           customization={customization}
           onSubmit={onSubmit}
           onReady={onReady}
           onError={onError}
           locale="es-AR"
           
        />
    )
}
