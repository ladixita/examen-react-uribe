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

/*
   RUTA PRIVADA
   - Permite acceder SOLO a usuarios logueados
   - Si no hay sesión, redirige al login
*/
const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* NAVBAR visible solo cuando hay usuario */}
      <Navbar />

      {/* Contenedor principal de páginas privadas */}
      <main className="max-w-6xl mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
};

/* 
   RUTA SOLO ADMIN
   - Solo permite acceso si el usuario tiene role === "admin"
 */
const AdminRoute = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    // Si NO es admin no tiene permiso → se va al home
    return <Navigate to="/" replace />;
  }

  // Si es admin puede acceder a la vista hija
  return <Outlet />;
};

/* 
   ROUTER PRINCIPAL
   - Separa rutas públicas, privadas y admin
*/
const AppRouter = () => {
  return (
    <Routes>
      {/* RUTA PÚBLICA (SIN LOGIN)   */}
      <Route path="/login" element={<LoginView />} />

      {/* RUTAS PRIVADAS            */}
      {/* (requieren estar logueado) */}
      <Route element={<PrivateRoute />}>
        
        {/* HOME accesible por cualquier usuario logueado */}
        <Route path="/" element={<HomeView />} />
        <Route path="/productos" element={<HomeView />} />
        
        {/* Ver detalle del producto (lo puede ver user/admin) */}
        <Route path="/productos/:id" element={<ProductDetailView />} />

        {/* SOLO ADMIN                 */}
        <Route element={<AdminRoute />}>
          <Route path="/productos/crear" element={<CreateProductView />} />
          <Route path="/productos/editar/:id" element={<UpdateProductView />} />
        </Route>
      </Route>

      {/* RUTA POR DEFECTO          */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;