import { Payment } from "@mercadopago/sdk-react";
import { useValidarCompra } from "../../Context/validarComprar";



export function MercadopagoPaymentBrick() {

    const{MutateCatchPaymentID}=useValidarCompra()
    
    const initialization = {
     amount: 15200,
     preferenceId: MutateCatchPaymentID.data?.id,

    };

    console.log(MutateCatchPaymentID.data)
    
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
     // callback llamado al hacer clic en el botón enviar datos
    // console.log(formData)
     return new Promise((resolve, reject) => {
       fetch("/process_payment", {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify(formData),
       })
         .then((response) => response.json())
         .then((response) => {
           // recibir el resultado del pago
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
