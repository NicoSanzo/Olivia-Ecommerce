import '../css/app.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ReactDOM from 'react-dom/client';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { HeaderA } from './src/pages/PaginasPublicas/HomePage/components/header/headerSeccionA/headerA';
import { HeaderB } from './src/pages/PaginasPublicas/HomePage/components/header/headerSeccionB/headerB';
import { Home } from './src/pages/PaginasPublicas/HomePage/home';
import { Productos } from './src/pages/PaginasPublicas/Productos/Productos';
import { ProductoDetail } from './src/pages/PaginasPublicas/VistaProducto/ProductoDetail';
import { InfoCompra } from './src/pages/PaginasPublicas/InfoCompra/infoCompra';
import { Contacto } from './src/pages/PaginasPublicas/Contacto/Contacto';
import { PageCarrito } from './src/pages/PaginasPublicas/PageCarrito/PageCarrito';
import { PrivateRouteAdmin } from './src/Routes/PrivatesRouteAdmin';
import { AgregarProducto } from './src/pages/PaginasPrivadas/AgregarProducto/AgregarProducto';
import { Publicaciones } from './src/pages/PaginasPrivadas/Publicaciones/Publicaciones';
import { Ventas } from './src/pages/PaginasPrivadas/Ventas/Ventas';
import { DetalleVenta } from './src/pages/PaginasPrivadas/DetalleVenta/DetalleVenta';
import { PrivateRouteClient } from './src/Routes/PrivatesRouteClient';
import { MiPerfil } from './src/pages/PaginasPrivadas/Cliente/MiPerfil/MiPerfil';
import { Compras } from './src/pages/PaginasPrivadas/Compras/Compras';
import { DetalleCompra } from './src/pages/PaginasPrivadas/DetalleCompra/DetalleCompra';
import { CompraExitosa } from './src/pages/PaginasPrivadas/CompraExitosa/CompraExitosa';
import { LoginModal } from './src/pages/PaginasPublicas/Login/LoginModal/loginModal';
import { AppContextProviders } from './src/Context/Providers';
import { Footer } from './src/pages/PaginasPublicas/HomePage/components/footer/Footer';
import { initMercadoPago } from "@mercadopago/sdk-react";

// Inicializa Mercado Pago UNA sola vez
initMercadoPago("TEST-b58085c3-f394-42ec-8aa4-8f3f1bbb3045", { locale: "es-AR" });


const queryClient= new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
<QueryClientProvider client={queryClient}>
  <Router>
    <AppContextProviders>
            <HeaderA />
            <HeaderB />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="productos/productoDetail" element={<ProductoDetail />} />
              <Route path="/infocompra" element={<InfoCompra />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/carrito" element={<PageCarrito />} />
              <Route element={<PrivateRouteAdmin />}>
                <Route path="/AgregarProducto" element={<AgregarProducto />} />
                <Route path="/Publicaciones" element={<Publicaciones />} />
                <Route path="/Ventas" element={<Ventas />}/>
                <Route path="Ventas/Detalle" element={<DetalleVenta />} />
              </Route>
              <Route element={<PrivateRouteClient />}>
                <Route path="/Miperfil" element={<MiPerfil />} />    
                <Route path="/compras" element={<Compras />}/>
                <Route path="compras/detalle" element={<DetalleCompra />} />               
                <Route path="CompraExitosa" element={<CompraExitosa />} />        
              </Route>
              <Route path="*" element={<Navigate to="/home" />}/>
            </Routes>
            <LoginModal/>     
          <Footer />
        </AppContextProviders>
  </Router>
</QueryClientProvider>
);

