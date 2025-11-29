import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, onDelete }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col">

      {/* Imagen */}
      <img
        src={product.images?.[0] ?? "https://placehold.co/600x400"}
        alt={product.title}
        className="w-full h-40 object-cover rounded-md mb-3"
      />

      {/* Título */}
      <h2 className="text-lg font-semibold text-slate-800 line-clamp-2">
        {product.title}
      </h2>

      {/* Precio */}
      <p className="text-green-600 font-bold text-sm mt-1">
        S/ {product.price}
      </p>

      {/* ACCIONES */}
      <div className="flex gap-2 mt-4">
        {/* Ver */}
        <button
          onClick={() => navigate(`/productos/${product.id}`)}
          className="flex-1 bg-slate-700 text-white px-3 py-2 text-xs rounded-md hover:bg-slate-800 flex items-center justify-center gap-2"
        >
          <FaEye /> Ver
        </button>

        {/* Editar — Solo admin */}
        {user?.role === "admin" && (
          <button
            onClick={() => navigate(`/productos/editar/${product.id}`)}
            className="flex-1 bg-green-600 text-white px-3 py-2 text-xs rounded-md hover:bg-green-700 flex items-center justify-center gap-2"
          >
            <FaEdit /> Editar
          </button>
        )}

        {/* Eliminar — Solo admin */}
        {user?.role === "admin" && (
          <button
            onClick={() => onDelete(product.id, product.title)}
            className="flex-1 bg-red-600 text-white px-3 py-2 text-xs rounded-md hover:bg-red-700 flex items-center justify-center gap-2"
          >
            <FaTrash /> Borrar
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;