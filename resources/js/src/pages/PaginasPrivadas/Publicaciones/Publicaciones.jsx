import { PublicacionesCard } from "./components/ProductPubliCard/PublicacionesCard";
import "./PublicacionesStyle.css";
import { LoadingComponente } from "../../../components/GenericLoadingComponent/LoadingComponent";
import { useQuery } from "@tanstack/react-query";
import { fetchGenerico } from "../../../utils/fetchGenerico";

import LogoOlivia from "../../../assets/LogoOlivia.png"; // Asegúrate de que la ruta sea correcta



export const Publicaciones=()=> {


     const{data, isLoading,error,refetch,isFetching}= useQuery({
       queryKey: ['listaPublicaciones'],
       queryFn: () => fetchGenerico("/api/listaPublicaciones","POST",null),
       enabled:true,
     })


 if(isLoading || isFetching){return <LoadingComponente height={50} width={50}/>}

     return (
  <>
    <h2 className="titulo-publicaciones">PUBLICACIONES</h2>
    <div className="publicaciones-general-container">
      {error ? (
        <div>Error al cargar las publicaciones.</div>
      ) : data && data.status === "success" && data.publicaciones.length > 0 ? (
        data.publicaciones.map((publis) => (
          <PublicacionesCard
            itemKey={publis.id}
            key={publis.id}
            imagen={publis.imagen.image_url ? publis.imagen.image_url: LogoOlivia}
            titulo={publis.titulo}
            price={publis.precio}
            stock={publis.stock}
            paused={publis.paused}
            ActualizarPublicaciones={refetch}
          />
        ))
      ) : (
        <div>No hay publicaciones disponibles.</div>
      )}
    </div>
  </>
);
    };