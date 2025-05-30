import "./DatosParaFacturaDetalleVenta.css";


export function DatosParaFacturaDetalleVenta({ventaDetail}) {

    return (
        
        <div className="datos-factura-detalle-container">
            <h2>Datos de facturación</h2>
            <p> <strong>{ventaDetail.data.cliente.nombre} {ventaDetail.data.cliente.apellido} || DNI: {ventaDetail.data.cliente.dni}</strong></p>
            <p> <strong>Domicilio:</strong> {ventaDetail.data.cliente.dom_fis.direccion} - 
                {ventaDetail.data.cliente.dom_fis.localidad} - 
                C.P. {ventaDetail.data.cliente.dom_fis.codigo_postal}, {ventaDetail.data.cliente.dom_fis.provincia}
            </p>
            <p> <strong>Celular:</strong> {ventaDetail.data.cliente.celular}</p>   
        </div> 
    )
}
