import "./TooltipStyle.css";


export function Tooltip({descripcion}) {
    return (
        <>
            <div className="tooltip">{descripcion}</div>
        </>
    )
}
