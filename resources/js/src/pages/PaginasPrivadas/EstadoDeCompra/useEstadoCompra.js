import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useValidarCompra } from "../../../Context/validarComprar";
import { useAddCarrito } from "../../../Context/addCarritoContext";
import { useQuery } from "@tanstack/react-query";
import { fetchGenerico } from "../../../utils/fetchGenerico";



export function useEstadoCompra() {

  const {setCompraExitosa}=useValidarCompra();
  const {EliminarTodoElCarrito}=useAddCarrito();
  const [visible, setVisible] = useState(false);
  const [checkedVisible, setCheckedVisible] = useState(false);
  const navigate = useNavigate()

  
const query = new URLSearchParams(useLocation().search);
const MPPaymentId=query.get('payment_id') ;

const {data:pago,isFetching,error}= useQuery(({
queryKey: ['pago', MPPaymentId],
queryFn: ()=>fetchGenerico("api/OperacionStatusMP","POST", {'MPPaymentId':MPPaymentId}),
enabled: !!MPPaymentId,
retry:2,
refetchOnWindowFocus: false,
refetchOnMount: false,
refetchOnReconnect: false,
}))

  const data = [{
    'Estado': pago?.datosPago?.estado_pago === 'approved' ? 'Aprobado' : pago?.datosPago?.estado_pago === 'in_process'? 'En proceso' : pago?.datosPago?.estado_pago === 'rejected'? 'Rechazado' : null ,
    'Fecha de compra' : new Date(pago?.datosPago?.fecha_creacion_mp).toLocaleDateString() || null,
    'Metodo de pago': pago?.datosPago?.tipo_pago=== 'credit_card'? 'Tarjeta de crédito': pago?.datosPago?.tipo_pago=== 'debit_card'? 'Tarjeta de débito': pago?.datosPago?.tipo_pago==='account_money'? 'Dinero en cuenta' : null,
    'Metodo de entrega':  pago?.datosPago?.forma_envio || null,
    'Subtotal': "$ "+ pago?.datosPago?.subtotal || null,
    'Envio':   pago?.datosPago?.monto_envio !== '0' ? "$ " + pago?.datosPago?.monto_envio :null ,
    'Total': "$ " +  pago?.datosPago?.total || null,
    'Email': pago?.datosPago?.user.mail || null
    }
];

const productos = pago?.datosPago?.detalle_operacion
  
  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 100);

    setTimeout(() => {
      setCheckedVisible(true);
    }, 500);
    
    setTimeout(() => {
       // setVisible(false);
        EliminarTodoElCarrito()
        //setCompraExitosa(false)
        //navigate("/compras");
    }, 4000);
      
  }, []);

  const handleClose = () => {
    setVisible(false);
    EliminarTodoElCarrito()
    setCompraExitosa(false)
    navigate("/compras");
};

    return (
        {visible,
        checkedVisible,
        handleClose,
        data,
        productos,
        query,
        isFetching,
        pago,
        error,
        MPPaymentId
        }
            
        
    )
}
