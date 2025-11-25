import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginView = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  // Estado local para el formulario
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // Estado para mostrar mensajes de error
  const [error, setError] = useState("");

  // Estado para indicar que se está procesando el login
  const [loading, setLoading] = useState(false);

  // Si ya está autenticado y entra a /login, lo mandamos al home
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // Maneja cambios de los inputs
  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Maneja el submit del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    // Validación
    if (!form.email || !form.password) {
      setError("Por favor ingresa tu correo y contraseña.");
      return;
    }

    try {
      setLoading(true);

      // Llama al login
      const loggedUser = await login(form.email, form.password);

      // Redirección según rol
      if (loggedUser.role === "admin") {
        navigate("/productos");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.message || "Credenciales incorrectas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        {/* Título */}
        <h1 className="text-2xl font-bold text-slate-800 mb-2 text-center">
          Iniciar sesión
        </h1>

        <p className="text-sm text-slate-500 mb-6 text-center">
          Ingresa con tu usuario para administrar el inventario.
        </p>

        {/* Mensaje de error */}
        {error && (
          <div className="mb-4 rounded-md bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="admin@test.com"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="123456"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          {/* Botón */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-blue-600 text-white px-4 py-2 text-sm font-semibold mt-2 hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        {/* Info de prueba opcional */}
        <div className="mt-4 text-xs text-slate-500">
          <p className="font-semibold mb-1">Usuarios de prueba:</p>
          <p>- admin@test.com / 123456 (admin)</p>
          <p>- user@test.com / 123456 (user)</p>
        </div>
      </div>
    </div>
  );
};

export default LoginView;