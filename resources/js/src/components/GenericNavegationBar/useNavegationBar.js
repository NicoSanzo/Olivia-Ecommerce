import { useSearch } from "../../Context/searchContext";
import { useNavigate } from 'react-router-dom';



export function UseNavegationBar() {

    const navigate = useNavigate();
    const {setSearchData,inputSearchValue, setInputSearchValue} =useSearch();
    
    const visualizarContenido = (event) => {
        setInputSearchValue(event.target.value);
    };

    const realizarConsulta = () => {   
            setSearchData(inputSearchValue); // el valor con el que va a realizar la consulta
            navigate(`/Productos?search=${inputSearchValue}`);
    };

    const ApretarEnter = (event) => {
        if (event.key === 'Enter') { // Verifica que no esté vacío
            realizarConsulta();    
        }
    };

    
    return { inputSearchValue, 
            visualizarContenido,
            ApretarEnter,
            realizarConsulta
    }
      
}
