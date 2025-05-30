import {useNavigate } from "react-router-dom";

export function UseBuyCard(CompraData) {

const navigate = useNavigate();



const fechaISO= CompraData.fecha;
const fecha = new Date(fechaISO + "T00:00:00"); // Crear un objeto Date a partir de la cadena ISO
const numero_operacion=CompraData.numero;

const opciones = { // Definir las opciones para formatear la fecha
  day: 'numeric', 
  month: 'long',
  year:'numeric'
};

const AbrirDetalleCompra = () => {

    navigate(`/compras/detalle?numero_compra=${numero_operacion}`) 
};

const EstadoPagoStyle={StyleAprobado: {backgroundColor:'#DBEAE2 ',color:'green',boxShadow:'0 0 2px black'},
                       StylePendiente: {backgroundColor:'rgba(255, 255, 85, 0.163)',color: 'rgb(176, 176, 71)',boxShadow:'0 0 2px black'},
                       StyleCancelado: {backgroundColor:'rgb(255, 184, 184)',color: 'rgb(255, 2, 2)',boxShadow:'0 0 2px black'}}

const EstadoEntregaStyle={StyleEntregado: {color:'#78c398', fontWeight:'800'},
                       StylePendiente: {color:'rgba(0, 0, 0, 0.43)',fontWeight:'800'},
                     }         
                        

    return (
        {
            opciones,
            fecha,
            EstadoPagoStyle,
            EstadoEntregaStyle,
            AbrirDetalleCompra,

        }           
        
    )
}
