import "./ProductAndUserStyle.css";
import WppImage from "../../../../../../assets/whatsApp_logo_colorful.svg"
import { useProductAndUser } from "./useProductAndUser";

export function ProductAndUser({ventaDetail}) {

    if(!ventaDetail && !ventaDetail.data)
        {return null}

    const {fecha_venta} = useProductAndUser(ventaDetail)

   

    return (
        <div className="container-productanduser-general-detalle">

             {ventaDetail.data.det_oper.length > 1 &&
                 <h2> Paquete con {ventaDetail.data.det_oper.length} productos </h2>
             }
             {ventaDetail.data.det_oper.length === 1 &&
                 <h2> {ventaDetail.data.det_oper.titulo}  </h2>
             }    
            <p className="detalle-venta-id-fecha">
               Venta: #{ventaDetail.data.numero} | {fecha_venta}
            </p>
         
            <div className="username-name-container">
                <div className="user-Icon">
                    {ventaDetail.data.cliente.nombre.charAt(0)}
                    {ventaDetail.data.cliente.apellido.charAt(0)}
                </div>
                <div className="name-lastname-user-detalleventa">
                    <div className="name-lastname-detalleventa">
                        <p>{ventaDetail.data.cliente.nombre}</p>
                        <p>{ventaDetail.data.cliente.apellido}</p>
                    </div>
                    <div className="user-dni-cuit-detalleventa">
                        <p>{ventaDetail.data.cliente.username}</p> |
                        <p> DNI: {ventaDetail.data.cliente.dni}</p>
                    </div>
                </div>  
                <a className="boton-mensaje-a-comprador" href={`https://wa.me/${ventaDetail.data.cliente.celular}`}  target="blank" >
                    <p>Enviar Mensaje </p>
                <img src={WppImage} alt="" /></a> 
            </div> 

        </div>
    )
}
