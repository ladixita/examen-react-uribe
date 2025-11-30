import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const ProductCard = ({ product, onDelete }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleView = () => {
    navigate(`/productos/${product.id}`);
  };

  const handleEdit = () => {
    navigate(`/productos/editar/${product.id}`);
  };

  const handleDelete = () => {
    onDelete(product.id, product.nombre);
  };

  return (
    <article
      className="
        bg-white 
        p-4 
        rounded-lg 
        shadow-md 
        hover:shadow-lg 
        transition 
        flex 
        flex-col
        border 
        border-slate-100
      "
    >
      {/* IMAGEN */}
      <div className="relative mb-3 w-full h-40 overflow-hidden rounded-lg">
        {/* Skeleton mientras carga */}
        {!imgLoaded && (
          <div className="absolute inset-0 bg-slate-200 animate-pulse rounded-lg" />
        )}

        <img
          src={product.images?.[0] ?? "https://placehold.co/600x400"}
          alt={`Imagen del producto ${product.nombre}`}
          onLoad={() => setImgLoaded(true)}
          className={`
            w-full h-full object-cover rounded-lg 
            transition-opacity duration-300
            ${imgLoaded ? "opacity-100" : "opacity-0"}
          `}
        />
      </div>

      {/* TÍTULO */}
      <h3 className="text-lg font-semibold text-slate-800 line-clamp-2 min-h-[48px]">
        {product.nombre}
      </h3>

      {/* PRECIO */}
      <p className="text-green-600 font-bold mt-2">
        S/ {product.price}
      </p>

      {/* BOTONES */}
      <div className="mt-4 flex flex-col sm:flex-row gap-2 w-full">

        {/* Ver (siempre disponible) */}
        <button
          type="button"
          onClick={handleView}
          className="
            flex-1 
            bg-slate-700 hover:bg-slate-800 
            text-white 
            px-3 py-2 
            text-xs 
            rounded-md 
            flex 
            items-center 
            justify-center 
            gap-2
          "
        >
          <FaEye /> Ver
        </button>

        {/* Editar (solo admin) */}
        {user?.role === "admin" && (
          <button
            type="button"
            onClick={handleEdit}
            className="
              flex-1 
              bg-green-600 hover:bg-green-700 
              text-white 
              px-3 py-2 
              text-xs 
              rounded-md 
              flex 
              items-center 
              justify-center 
              gap-2
            "
          >
            <FaEdit /> Editar
          </button>
        )}

        {/* Eliminar (solo admin) */}
        {user?.role === "admin" && (
          <button
            type="button"
            onClick={handleDelete}
            className="
              flex-1 
              bg-red-600 hover:bg-red-700 
              text-white 
              px-3 py-2 
              text-xs 
              rounded-md 
              flex 
              items-center 
              justify-center 
              gap-2
            "
        >
            <FaTrash /> Borrar
          </button>
        )}
      </div>
    </article>
  );
};

export default ProductCard;