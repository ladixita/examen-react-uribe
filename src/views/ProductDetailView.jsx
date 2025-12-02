import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getProductById } from "../services/productosService";

import Loader from "../components/Loader";
import { useAuth } from "../context/AuthContext";

import { FaArrowLeft, FaEdit } from "react-icons/fa";

const ProductDetailView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  /** Cargar producto */
  const loadProduct = useCallback(async () => {
    try {
      setLoading(true);
      const p = await getProductById(id);
      setProduct(p);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error al cargar producto",
        text: err.message ?? "Ocurrió un error inesperado",
      });
      navigate("/productos");
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  if (loading) return <Loader text="Cargando producto…" />;
  if (!product) return null;

  return (
    <div className="max-w-3xl mx-auto mt-6 bg-white p-6 rounded-lg shadow-md">

      {/* VOLVER */}
      <button
        onClick={() => navigate("/productos")}
        className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-800 mb-4"
      >
        <FaArrowLeft /> Volver a la lista
      </button>

      {/* TÍTULO */}
      <h1 className="text-2xl font-bold text-slate-800 mb-4">
        {product.nombre}
      </h1>

      {/* GRID PRINCIPAL */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* IMAGEN CON LOADER */}
        <div className="relative w-full h-60 rounded-lg overflow-hidden shadow">
          {!imgLoaded && (
            <div className="absolute inset-0 bg-slate-200 animate-pulse" />
          )}

          <img
            src={product.imagen ?? "https://placehold.co/600x400"}
            alt={product.nombre}
            onLoad={() => setImgLoaded(true)}
            onError={(e) => {
              e.target.src = "https://placehold.co/600x400";
              setImgLoaded(true);
            }}
            className={`
              w-full h-full object-cover rounded-lg
              transition-opacity duration-300
              ${imgLoaded ? "opacity-100" : "opacity-0"}
            `}
          />
        </div>

        {/* INFORMACIÓN */}
        <div className="space-y-4">

          <div>
            <h3 className="text-sm font-semibold text-slate-700">Precio:</h3>
            <p className="text-lg font-bold text-green-600">
              S/ {product.precio}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-700">Descripción:</h3>
            <p className="text-slate-600 leading-relaxed">
              {product.descripcion}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-700">ID:</h3>
            <p className="text-slate-600">{product.id}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-700">Creado:</h3>
            <p className="text-slate-600">
              {new Date(product.createdAt).toLocaleString()}
            </p>
          </div>

          {/* SOLO ADMIN → BOTÓN EDITAR */}
          {user?.role === "admin" && (
            <button
              onClick={() => navigate(`/productos/editar/${product.id}`)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm mt-4"
            >
              <FaEdit /> Editar producto
            </button>
          )}

        </div>

      </div>
    </div>
  );
};

export default ProductDetailView;