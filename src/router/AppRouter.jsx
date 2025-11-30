// Router de la aplicación
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Vistas
import LoginView from "../views/LoginView";
import HomeView from "../views/HomeView";
import CreateProductView from "../views/CreateProductView";
import UpdateProductView from "../views/UpdateProductView";
import ProductDetailView from "../views/ProductDetailView";

// Componentes globales
import Navbar from "../components/Navbar";

/* PRIVATE ROUTE */
const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      {/* Contenedor general */}
      <main className="max-w-6xl mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
};

/* ADMIN ROUTE */
const AdminRoute = () => {
  const { user, isAuthenticated } = useAuth();

  // No está logueado
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Está logueado pero NO es admin
  if (user.role !== "admin") {
    return <Navigate to="/productos" replace />;
  }

  return <Outlet />;
};

/* ROUTER PRINCIPAL */
const AppRouter = () => {
  return (
    <Routes>
      {/* RUTA PÚBLICA */}
      <Route path="/login" element={<LoginView />} />

      {/* RUTAS PRIVADAS */}
      <Route element={<PrivateRoute />}>
        
        {/* Home para todos los usuarios */}
        <Route path="/" element={<HomeView />} />
        <Route path="/productos" element={<HomeView />} />

        {/* Ver detalle (user y admin) */}
        <Route path="/productos/:id" element={<ProductDetailView />} />

        {/* ADMIN */}
        <Route element={<AdminRoute />}>
          <Route path="/productos/crear" element={<CreateProductView />} />
          <Route path="/productos/editar/:id" element={<UpdateProductView />} />
        </Route>
      </Route>

      {/* RUTA POR DEFECTO */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;