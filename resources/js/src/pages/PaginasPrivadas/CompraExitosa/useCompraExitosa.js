import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useValidarCompra } from "../../../Context/validarComprar";
import { useAddCarrito } from "../../../Context/addCarritoContext";



export function UseCompraExitosa() {

  const {setCompraExitosa}=useValidarCompra();
  const {EliminarTodoElCarrito}=useAddCarrito();
  const [visible, setVisible] = useState(false);
  const [checkedVisible, setCheckedVisible] = useState(false);
  const navigate = useNavigate();




  const query = new URLSearchParams(useLocation().search);
const id = query.get("id");
const status = query.get("status");

const data = [
    {
    'Fecha de compra': 2,
    'Metodo de Pago': 'Mercadopago',
    'Metodo de Envio': 'Envio',
    'Subtotal': '$ 6000',
    'Envio': '$ 50'
    }
];
  
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
        data
        }
            
        
    )
}
