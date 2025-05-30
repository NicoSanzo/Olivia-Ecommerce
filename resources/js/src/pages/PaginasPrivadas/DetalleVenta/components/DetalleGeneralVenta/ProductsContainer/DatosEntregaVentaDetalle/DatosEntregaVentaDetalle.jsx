import "./DatosEntregaVentaDetalleStyle.css";


export function DatosEntregaDetalleVenta({ventaDetail}) {



    return (
        
        <div className="datos-envio-detalle-container">
        <hr />
            <h2>Datos del envío</h2>
            <p><strong>- Direccion:</strong> {ventaDetail.data.cliente.dom_env.direccion}</p>
            <p> <strong>- Localidad:</strong> {ventaDetail.data.cliente.dom_env.localidad}</p>
            <p> <strong>- Provincia:</strong> {ventaDetail.data.cliente.dom_env.provincia}</p>
            <p> <strong>- Codigo Postal:</strong> {ventaDetail.data.cliente.dom_env.codigo_postal}</p>
            <p> <strong>- Recibe: </strong>{ventaDetail.data.cliente.nombre} {ventaDetail.data.cliente.apellido}</p>
        </div> 
    )
}
