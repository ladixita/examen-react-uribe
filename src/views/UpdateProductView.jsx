import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { getProductById, updateProduct } from "../services/productsService";
import { FaArrowLeft, FaSave } from "react-icons/fa";

const UpdateProductView = () => {
  const { id } = useParams(); // ID del producto => /productos/editar/:id
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    images: "",
  });

  // ================================
  // Cargar datos existentes del producto
  // ================================
  const loadProduct = async () => {
    try {
      setLoading(true);
      const product = await getProductById(id);

      setForm({
        title: product.title,
        price: product.price,
        description: product.description,
        images: product.images?.[0] || "",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error al cargar producto",
        text: err.message,
      });
      navigate("/productos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProduct();
  }, []);

  // ================================
  // Manejar cambios del formulario
  // ================================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================================
  // Guardar cambios
  // ================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.price || !form.description) {
      Swal.fire({
        icon: "warning",
        title: "Todos los campos obligatorios deben completarse",
      });
      return;
    }

    try {
      setSaving(true);

      const updatedBody = {
        title: form.title,
        price: Number(form.price),
        description: form.description,
        images: [form.images || "https://placehold.co/600x400"],
      };

      await updateProduct(id, updatedBody);

      Swal.fire({
        icon: "success",
        title: "Producto actualizado",
        timer: 1800,
        showConfirmButton: false,
      });

      navigate("/productos");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "No se pudo actualizar",
        text: err.message,
      });
    } finally {
      setSaving(false);
    }
  };

  // ================================
  // Loader de carga
  // ================================
  if (loading) {
    return (
      <p className="text-center py-10 text-slate-600">Cargando información…</p>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 mt-6">

      {/* Botón volver */}
      <button
        onClick={() => navigate("/productos")}
        className="flex items-center gap-2 text-sm text-slate-600 mb-4 hover:text-slate-800"
      >
        <FaArrowLeft /> Volver
      </button>

      <h1 className="text-xl font-bold mb-4 text-slate-800">
        Editar Producto
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Título */}
        <div>
          <label className="block mb-1 text-sm font-semibold text-slate-700">
            Nombre del producto *
          </label>
          <input
            type="text"
            name="title"
            className="w-full border rounded-md px-3 py-2 text-sm"
            value={form.title}
            onChange={handleChange}
          />
        </div>

        {/* Precio */}
        <div>
          <label className="block mb-1 text-sm font-semibold text-slate-700">
            Precio *
          </label>
          <input
            type="number"
            name="price"
            className="w-full border rounded-md px-3 py-2 text-sm"
            value={form.price}
            onChange={handleChange}
          />
        </div>

        {/* Descripción */}
        <div>
          <label className="block mb-1 text-sm font-semibold text-slate-700">
            Descripción *
          </label>
          <textarea
            rows="3"
            name="description"
            className="w-full border rounded-md px-3 py-2 text-sm"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        {/* Imagen */}
        <div>
          <label className="block mb-1 text-sm font-semibold text-slate-700">
            URL de Imagen
          </label>
          <input
            type="text"
            name="images"
            className="w-full border rounded-md px-3 py-2 text-sm"
            value={form.images}
            onChange={handleChange}
          />
        </div>

        {/***** BOTÓN GUARDAR *****/}
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 disabled:bg-blue-300"
        >
          <FaSave />
          {saving ? "Guardando cambios..." : "Guardar Cambios"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProductView;