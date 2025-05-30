import { useAddCarrito } from "../../../../../Context/addCarritoContext";


export function UseCarritoProductsContainer() {

    const {arrayProductsCarrito} = useAddCarrito();
    const {EliminarTodoElCarrito} = useAddCarrito();


    return {

        arrayProductsCarrito,
        EliminarTodoElCarrito
    }
       
}
