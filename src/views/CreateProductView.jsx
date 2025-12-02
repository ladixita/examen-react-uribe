import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { createProduct } from "../services/productosService";

// Componentes reutilizables
import Input from "../components/Input";
import Loader from "../components/Loader";

import {
  FaSave,
  FaArrowLeft,
  FaImage,
  FaTag,
  FaMoneyBill,
} from "react-icons/fa";

const CreateProductView = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    imagen: "",
  });

  const [loading, setLoading] = useState(false);

  // Manejar cambios del formulario reusable
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica
    if (!form.nombre || !form.precio || !form.descripcion) {
      Swal.fire({
        icon: "warning",
        title: "Completa los campos obligatorios",
      });
      return;
    }

    try {
      setLoading(true);

      const body = {
        nombre: form.nombre,
        descripcion: form.descripcion,
        precio: Number(form.precio),
        imagen: form.imagen || "https://placehold.co/600x400",
      };

      await createProduct(body);

      Swal.fire({
        icon: "success",
        title: "Producto creado correctamente",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/productos");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error al crear",
        text: err.message ?? "Ocurrió un error inesperado",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-6 bg-white p-6 rounded-lg shadow-md">
      {/* VOLVER */}
      <button
        onClick={() => navigate("/productos")}
        className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-800 mb-4"
      >
        <FaArrowLeft /> Volver
      </button>

      <h1 className="text-xl font-bold mb-4 text-slate-800">Crear Producto</h1>

      {/* Si está cargando, mostrar loader */}
      {loading && <Loader text="Guardando producto..." />}

      {!loading && (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* TÍTULO */}
          <Input
            label="Nombre del producto"
            name="nombre"
            placeholder="Ej: Audífonos Bluetooth"
            value={form.nombre}
            onChange={handleChange}
            required
            icon={FaTag}
          />

          {/* PRECIO */}
          <Input
            label="Precio"
            type="number"
            name="precio"
            placeholder="Ej: 120"
            value={form.precio}
            onChange={handleChange}
            required
            icon={FaMoneyBill}
          />

          {/* DESCRIPCIÓN */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-slate-700">
              Descripción *
            </label>
            <textarea
              name="descripcion"
              rows="3"
              value={form.descripcion}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md text-sm border-slate-300 focus:ring-2 
                         focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* IMAGEN */}
          <Input
            label="URL de imagen"
            name="imagen"
            placeholder="https://..."
            value={form.imagen}
            onChange={handleChange}
            icon={FaImage}
          />

          {/* Botón guardar */}
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 
                       text-white px-4 py-2 rounded-md text-sm w-full justify-center 
                       disabled:bg-blue-300"
          >
            <FaSave />
            Guardar Producto
          </button>
        </form>
      )}
    </div>
  );
};

export default CreateProductView;
