import "./VentasStyle.css";
import { SalesCard } from "./components/SalesCard/SalesCard";
import { UseVentas } from "./useVentas";
import { LoadingComponente } from "../../../components/GenericLoadingComponent/LoadingComponent";


export function Ventas() {
  const { ventaData, loading } = UseVentas();

  return (
    <>
      <div className="father-container-ventas">
        {loading ? (
          <LoadingComponente width={50} height={50} />
        ) : (
          <div className="pageventas-principal-container">
            <h2 className="ventas-titulo">Ventas</h2>

            {ventaData && ventaData.data ? (
              ventaData.data.map((DataVenta) => {
                return <SalesCard venta={DataVenta} key={DataVenta.numero} />;
              })
            ) : (
              <p>No se realizaron Ventas</p>
            )}   
          </div>
        )}
      </div>
    </>
  );
}
