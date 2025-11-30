import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";

import Input from "../components/Input";
import { FaEnvelope, FaLock } from "react-icons/fa";

const LoginView = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, loading } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });

  // Si ya está autenticado → enviar a productos
  useEffect(() => {
    if (isAuthenticated) navigate("/productos");
  }, [isAuthenticated]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      Swal.fire({
        icon: "warning",
        title: "Completa todos los campos",
      });
      return;
    }

    try {
      await login(form.email, form.password);

      Swal.fire({
        icon: "success",
        title: "Bienvenido",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/productos");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Credenciales incorrectas",
        text: error.message || "Ocurrió un error inesperado",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-md">
        {/* Título */}
        <h1 className="text-2xl font-bold text-center mb-6 text-slate-800">
          Iniciar Sesión
        </h1>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* INPUT EMAIL */}
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="admin@test.com"
            value={form.email}
            onChange={handleChange}
            icon={FaEnvelope}
            required
          />

          {/* INPUT PASSWORD */}
          <Input
            label="Contraseña"
            name="password"
            type="password"
            placeholder="123456"
            value={form.password}
            onChange={handleChange}
            icon={FaLock}
            required
          />

          {/* BOTÓN */}
          <button
            type="submit"
            disabled={loading || !form.email.trim() || !form.password.trim()}
            className={`
    w-full py-2 rounded-md text-sm font-semibold text-white
    ${
      loading || !form.email.trim() || !form.password.trim()
        ? "bg-blue-300 cursor-not-allowed"
        : "bg-blue-600 hover:bg-blue-700"
    }
  `}
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        {/* Usuarios demo */}
        <div className="mt-4 text-xs text-slate-500">
          <p>
            <b>admin@test.com / 123456</b>
          </p>
          <p>
            <b>user@test.com / 123456</b>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
