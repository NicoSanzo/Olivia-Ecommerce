import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useValidarCompra } from "../../../Context/validarComprar";
import { useAddCarrito } from "../../../Context/addCarritoContext";



export function UseCompraExitosa() {

  const {setCompraExitosa}=useValidarCompra();
  const {EliminarTodoElCarrito}=useAddCarrito();
  const [visible, setVisible] = useState(false);
  const [checkedVisible, setCheckedVisible] = useState(false);
  const navigate = useNavigate();

  
  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 200);

    setTimeout(() => {
      setCheckedVisible(true);
    }, 500);


    setTimeout(() => {
        setVisible(false);
        EliminarTodoElCarrito()
        setCompraExitosa(false)
        navigate("/compras");
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
        handleClose
        }
            
        
    )
}
