import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getProducts, deleteProduct } from "../services/productosService";
import { useAuth } from "../context/AuthContext";
import { FaPlus } from "react-icons/fa";

const HomeView = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar productos al iniciar la pantalla
  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error al cargar productos",
        text: err.message ?? "Ocurrió un error inesperado",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Eliminar producto (solo admin)
  const handleDelete = async (id, title) => {
    try {
      const confirm = await Swal.fire({
        title: `¿Deseas eliminar ${title}?`,
        text: "Esta acción es irreversible",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Sí, eliminar",
      });

      // Si cancela
      if (!confirm.isConfirmed) return;

      await deleteProduct(id);

      Swal.fire({
        icon: "success",
        title: "Producto eliminado",
        timer: 1800,
        showConfirmButton: false,
      });

      loadProducts();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "No se pudo eliminar",
        text: err.message,
      });
    }
  };

  return (
    <div className="mt-6">
      {/* Título + botón crear */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-slate-800">Lista de Productos</h1>

        {user?.role === "admin" && (
          <button
            onClick={() => navigate("/productos/crear")}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
          >
            <FaPlus /> Crear Producto
          </button>
        )}
      </div>

      {/* Loader */}
      {loading && (
        <p className="text-center text-slate-600 py-4">Cargando productos...</p>
      )}

      {/* ===== VISTA ADMIN: TABLA ===== */}
      {user?.role === "admin" && !loading && (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="w-full bg-white">
            <thead className="bg-slate-100 border-b">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Producto</th>
                <th className="p-3 text-left">Precio</th>
                <th className="p-3 text-left">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {products.map((prod) => (
                <tr
                  key={prod.id}
                  className="border-b hover:bg-slate-50 transition"
                >
                  <td className="p-3">{prod.id}</td>
                  <td className="p-3">{prod.title}</td>
                  <td className="p-3">S/ {prod.price}</td>
                  <td className="p-3 flex flex-wrap gap-2">
                    <button
                      onClick={() => navigate(`/productos/${prod.id}`)}
                      className="bg-slate-700 text-white px-3 py-1 rounded-md text-xs"
                    >
                      Ver
                    </button>

                    <button
                      onClick={() => navigate(`/productos/editar/${prod.id}`)}
                      className="bg-green-600 text-white px-3 py-1 rounded-md text-xs"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => handleDelete(prod.id, prod.title)}
                      className="bg-red-600 text-white px-3 py-1 rounded-md text-xs"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ===== VISTA USER: CARDS ===== */}
      {!user?.role === "admin" && !loading && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((prod) => (
            <ProductCard key={prod.id} product={prod} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeView;
