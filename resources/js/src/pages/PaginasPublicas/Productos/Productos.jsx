import "./ProductosStyle.css";
import { ProductCard } from "../.././../components/GenericProductCard/ProductCard";
import { OrdenMenu } from "./components/ordenMenu/OrdenMenu";
import { FilterCategorias } from "./components/FilterMenu/FilterCategorias";
import { LoadingComponente } from "../../../components/GenericLoadingComponent/LoadingComponent";
import { FilterModelo } from "./components/FilterModelos/FilterModelos";
import { useSearch } from "../../../Context/searchContext";
import { usePublicaciones } from "./usePublicaciones";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation} from '@fortawesome/free-solid-svg-icons';



export const Productos = () =>{
    

    const { FoundData, loading, Error } = useSearch();

    usePublicaciones();
    
    return (
        <>
            <div className="principal-container">

                <div className="container-menu-order">
                   {<OrdenMenu />}      {/*Este componente ejecuta la consulta de busqueda de productos, no se ejecuta al montar el componentem. es util para evitar 2 consultas a la base de datos*/}
                </div>
                {/*<div className="filter-menu-container">
                    {<FilterCategorias/>}
                    <FilterModelo/>  
                </div>*/}
              
                {loading?  (
                    <div className="carga-container-productos">
                        <LoadingComponente height={70} width={70}/>
                    </div>
                
                ) :
                <div className="products-container"> {
                FoundData?.length > 0 ? (
                    FoundData.map((publicacion) => (  
                        <ProductCard 
                            key={publicacion.id} 
                            imagen={publicacion.imagen.image_url} 
                            titulo={publicacion.titulo} 
                            price={publicacion.precio} 
                            stock={publicacion.stock} 
                            itemKey={publicacion.id}
                        />                
                    ))
                ): 
                 <div className="error-message-window"> 
                    <FontAwesomeIcon className= "beat-animation" icon={faCircleExclamation} size="2x" color=' #ff8ed4' />
                    <span> {Error} </span> 

                 </div>
                }
                
                </div>}
            </div>
        </>
    )
}