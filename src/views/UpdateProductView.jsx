import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import { getProductById, updateProduct } from "../services/productosService";
import Loader from "../components/Loader";
import Input from "../components/Input";

import { FaArrowLeft, FaSave } from "react-icons/fa";

const UpdateProductView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [previewLoaded, setPreviewLoaded] = useState(false);

  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    images: "",
  });

  /** Cargar producto */
  const loadProduct = useCallback(async () => {
    try {
      setLoading(true);

      const p = await getProductById(id);

      setForm({
        title: p.title,
        price: p.price,
        description: p.description,
        images: p.images?.[0] ?? "",
      });

    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error al cargar",
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

  /** Cambiar inputs */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /** Guardar cambios */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.price || !form.description) {
      Swal.fire({
        icon: "warning",
        title: "Completa los campos obligatorios",
      });
      return;
    }

    try {
      setSaving(true);

      const body = {
        title: form.title,
        price: Number(form.price),
        description: form.description,
        images: [form.images || "https://placehold.co/600x400"],
      };

      await updateProduct(id, body);

      Swal.fire({
        icon: "success",
        title: "Producto actualizado",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/productos");

    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "No se pudo actualizar",
        text: err.message ?? "Ocurrió un error inesperado",
      });

    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader text="Cargando información…" />;

  return (
    <div className="max-w-3xl mx-auto mt-6 bg-white p-6 rounded-lg shadow-md">

      {/* Volver */}
      <button
        onClick={() => navigate("/productos")}
        className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-800 mb-4"
      >
        <FaArrowLeft /> Volver
      </button>

      <h1 className="text-xl font-bold text-slate-800 mb-2">
        Editar Producto
      </h1>

      <p className="text-sm text-slate-500 mb-6">
        Modifica los campos necesarios y guarda los cambios.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Imagen previa */}
        <div>
          <label className="text-sm font-semibold text-slate-700">
            Vista previa
          </label>

          <div className="relative w-full h-48 rounded-lg mt-2 overflow-hidden shadow">
            {!previewLoaded && (
              <div className="absolute inset-0 bg-slate-200 animate-pulse rounded-lg" />
            )}

            <img
              src={form.images || "https://placehold.co/600x400"}
              onLoad={() => setPreviewLoaded(true)}
              onError={(e) => {
                e.target.src = "https://placehold.co/600x400";
                setPreviewLoaded(true);
              }}
              alt="Vista previa"
              className={`
                w-full h-full object-cover 
                transition-opacity duration-300
                ${previewLoaded ? "opacity-100" : "opacity-0"}
              `}
            />
          </div>
        </div>

        {/* Nombre */}
        <Input
          label="Nombre"
          name="title"
          required
          placeholder="Nombre del producto"
          value={form.title}
          onChange={handleChange}
        />

        {/* Precio */}
        <Input
          label="Precio"
          name="price"
          type="number"
          required
          placeholder="Ej: 120"
          value={form.price}
          onChange={handleChange}
        />

        {/* Descripción — AHORA SÍ con Input (textarea) */}
        <Input
          label="Descripción"
          name="description"
          type="textarea"
          required
          placeholder="Descripción del producto"
          value={form.description}
          onChange={handleChange}
        />

        {/* URL Imagen */}
        <Input
          label="URL Imagen"
          name="images"
          placeholder="https://imagen.jpg"
          value={form.images}
          onChange={handleChange}
        />

        {/* Guardar */}
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm w-full justify-center disabled:bg-blue-300"
        >
          <FaSave />
          {saving ? "Guardando..." : "Guardar Cambios"}
        </button>

      </form>
    </div>
  );
};

export default UpdateProductView;