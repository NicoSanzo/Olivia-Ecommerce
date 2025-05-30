import { useSearch } from "../../Context/searchContext";
import { useNavigate } from 'react-router-dom';



export function UseNavegationBar() {

    const navigate = useNavigate();
    const {setSearchData,inputSearchValue, setInputSearchValue,setRealizarBusqueda} =useSearch();
    
    const visualizarContenido = (event) => {
        setInputSearchValue(event.target.value);
    };

    const realizarConsulta = () => {   
            setSearchData(inputSearchValue); // el valor con el que va a realizar la consulta
            navigate(`/Productos?search=${inputSearchValue}`);
    };


    const ApretarEnter = (event) => {
        if (event.key === 'Enter') { // Verifica que no esté vacío
            setRealizarBusqueda(true)
            realizarConsulta(); // Ejecuta la consulta al presionar Enter        
        }
    };

    
    return { inputSearchValue, 
            visualizarContenido,
            ApretarEnter,
            realizarConsulta
    }
      
    
}
