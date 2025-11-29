import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getProductById } from "../services/productosService";
import { FaArrowLeft } from "react-icons/fa";

const ProductDetailView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  // Cargar información del producto
  const loadProduct = async () => {
    try {
      setLoading(true);
      const data = await getProductById(id);
      setProduct(data);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error al cargar el producto",
        text: err.message ?? "Ocurrió un error inesperado",
      });
      navigate("/productos");
    } finally {
      setLoading(false);
    }
  };

  // Cargar el producto al iniciar la vista, una vez
  useEffect(() => {
    loadProduct();
  }, []);

  // Loader mientras carga
  if (loading) {
    return (
      <p className="text-center text-slate-600 py-10">
        Cargando producto…
      </p>
    );
  }

  // Si no existe producto (ID inválido)
  if (!product) {
    return (
      <p className="text-center text-slate-600 py-10">
        No se encontró el producto.
      </p>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md p-6 rounded-lg mt-6">

      {/* Botón volver */}
      <button
        onClick={() => navigate("/productos")}
        className="flex items-center gap-2 text-sm text-slate-600 mb-4 hover:text-slate-800"
      >
        <FaArrowLeft /> Volver a la lista
      </button>

      {/* Encabezado */}
      <h1 className="text-2xl font-bold text-slate-800 mb-4">
        {product.title}
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        {/* Imagen */}
        <div>
          <img
            src={product.images?.[0] ?? "https://placehold.co/600x400"}
            alt={product.title}
            className="w-full rounded-lg shadow"
          />
        </div>

        {/* Detalles */}
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-700">Precio:</h3>
            <p className="text-lg font-bold text-green-600">
              S/ {product.price}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-700">Descripción:</h3>
            <p className="text-slate-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-700">
              ID del producto:
            </h3>
            <p className="text-slate-600">{product.id}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-700">
              Fecha de creación:
            </h3>
            <p className="text-slate-600">
              {new Date(product.createdAt ?? product.creationAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailView;