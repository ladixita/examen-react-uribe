import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { createProduct } from "../services/productsService";
import { FaSave, FaArrowLeft } from "react-icons/fa";

const CreateProductView = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    images: "",
  });

  const [loading, setLoading] = useState(false);

  // Manejo de cambios del formulario
  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Enviar datos al servicio
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validación
    if (!form.title || !form.price || !form.description) {
      Swal.fire({
        icon: "warning",
        title: "Completa todos los campos obligatorios",
      });
      return;
    }

    const productBody = {
      title: form.title,
      price: Number(form.price),
      description: form.description,
      images: [form.images || "https://placehold.co/600x400"], // por defecto una imagen
    };

    try {
      setLoading(true);

      await createProduct(productBody);

      Swal.fire({
        icon: "success",
        title: "Producto creado correctamente",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/productos");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error al crear el producto",
        text: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 mt-6">

      {/* BOTÓN VOLVER */}
      <button
        onClick={() => navigate("/productos")}
        className="flex items-center gap-2 text-sm text-slate-600 mb-4 hover:text-slate-800"
      >
        <FaArrowLeft /> Volver
      </button>

      <h1 className="text-xl font-bold mb-4 text-slate-800">
        Crear Nuevo Producto
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* TÍTULO */}
        <div>
          <label className="block mb-1 text-sm font-semibold text-slate-700">
            Nombre del producto *
          </label>
          <input
            type="text"
            name="title"
            className="w-full border rounded-md px-3 py-2 text-sm"
            placeholder="Ej: Zapatos deportivos"
            value={form.title}
            onChange={handleChange}
          />
        </div>

        {/* PRECIO */}
        <div>
          <label className="block mb-1 text-sm font-semibold text-slate-700">
            Precio *
          </label>
          <input
            type="number"
            name="price"
            className="w-full border rounded-md px-3 py-2 text-sm"
            placeholder="Ej: 120"
            value={form.price}
            onChange={handleChange}
          />
        </div>

        {/* DESCRIPCIÓN */}
        <div>
          <label className="block mb-1 text-sm font-semibold text-slate-700">
            Descripción *
          </label>
          <textarea
            name="description"
            rows="3"
            className="w-full border rounded-md px-3 py-2 text-sm"
            placeholder="Descripción del producto"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        {/* IMAGEN */}
        <div>
          <label className="block mb-1 text-sm font-semibold text-slate-700">
            URL de Imagen
          </label>
          <input
            type="text"
            name="images"
            className="w-full border rounded-md px-3 py-2 text-sm"
            placeholder="https://link-a-imagen.jpg"
            value={form.images}
            onChange={handleChange}
          />
        </div>

        {/* BOTÓN GUARDAR */}
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 disabled:bg-blue-300"
        >
          <FaSave />
          {loading ? "Guardando..." : "Guardar Producto"}
        </button>
      </form>
    </div>
  );
};

export default CreateProductView;