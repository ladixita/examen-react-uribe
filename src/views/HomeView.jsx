import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaPlus, FaEye, FaEdit, FaTrash } from "react-icons/fa";

import { getProducts, deleteProduct } from "../services/productosService";
import { useAuth } from "../context/AuthContext";

import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import TableData from "../components/TableData";

const HomeView = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar productos
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

  // Cargar al entrar
  useEffect(() => {
    loadProducts();
  }, []);

  // Eliminar producto
  const handleDelete = async (id, nombre) => {
    const confirm = await Swal.fire({
      title: `¿Eliminar ${nombre}?`,
      text: "Esta acción es irreversible",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!confirm.isConfirmed) return;

    try {
      await deleteProduct(id);

      Swal.fire({
        icon: "success",
        title: "Producto eliminado",
        timer: 1500,
        showConfirmButton: false,
      });

      loadProducts();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "No se pudo eliminar",
        text: err.message ?? "Ocurrió un error inesperado",
      });
    }
  };

  return (
    <div className="mt-6">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-slate-800">Lista de Productos</h1>

        {user?.role === "admin" && (
          <button
            onClick={() => navigate("/productos/crear")}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 
                       text-white px-4 py-2 rounded-md text-sm"
          >
            <FaPlus /> Crear Producto
          </button>
        )}
      </div>

      {/* LOADING */}
      {loading && <Loader text="Cargando productos..." />}

      {/* ADMIN → TABLA */}
      {!loading && user?.role === "admin" && (
        <TableData
          columns={["ID", "Producto", "Precio", "Acciones"]}
          data={products}
          onView={(row) => navigate(`/productos/${row.id}`)}
          onEdit={(row) => navigate(`/productos/editar/${row.id}`)}
          onDelete={(row) => handleDelete(row.id, row.nombre)}
        />
      )}

      {/* USER → CARDS */}
      {!loading && user?.role !== "admin" && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              // un user NO puede borrar → no enviar onDelete
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeView;