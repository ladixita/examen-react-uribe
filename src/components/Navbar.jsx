import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaBoxOpen,
  FaPlus,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    const confirm = await Swal.fire({
      title: "¿Cerrar sesión?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, salir",
      cancelButtonText: "Cancelar",
    });

    if (confirm.isConfirmed) {
      logout();
      setOpen(false); // cerrar menú mobile
      navigate("/login");
    }
  };

  const goHome = () => {
    if (!user) return navigate("/login");
    return navigate("/productos");
  };

  return (
    <nav className="bg-white shadow-sm px-4 py-3 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">

        {/* LOGO */}
        <button
          onClick={goHome}
          className="flex items-center gap-2 font-bold text-xl nav-logo"
        >
          <FaBoxOpen className="nav-logo" />
          <span className="nav-logo">Inventario App</span>
        </button>

        {/* BOTÓN HAMBURGUESA */}
        <button
          aria-label="Menú"
          className="md:hidden text-slate-700 text-xl"
          onClick={() => setOpen(!open)}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>

        {/* MENÚ DESKTOP */}
        <div className="hidden md:flex items-center gap-6">

          {/* --- NO LOGUEADO --- */}
          {!user && (
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
            >
              Iniciar sesión
            </button>
          )}

          {/* --- LOGUEADO --- */}
          {user && (
            <>
              <Link
                to="/productos"
                className="text-slate-700 hover:text-blue-600 text-sm font-medium"
              >
                Productos
              </Link>

              {user.role === "admin" && (
                <Link
                  to="/productos/crear"
                  className="flex items-center gap-1 text-slate-700 hover:text-blue-600 text-sm font-medium"
                >
                  <FaPlus /> Crear
                </Link>
              )}

              <div className="flex items-center gap-2 text-sm text-slate-600 border-l pl-4">
                <FaUser className="text-slate-500" />
                <span>{user.nombre || user.email}</span>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm"
              >
                <FaSignOutAlt /> Salir
              </button>
            </>
          )}
        </div>
      </div>

      {/* MENÚ MOBILE */}
      {open && (
        <div className="md:hidden bg-white shadow-md mt-3 p-4 rounded-lg space-y-4 animate-fade-in">

          {/* NO LOGUEADO */}
          {!user && (
            <button
              onClick={() => {
                navigate("/login");
                setOpen(false);
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
            >
              Iniciar sesión
            </button>
          )}

          {/* LOGUEADO */}
          {user && (
            <>
              <button
                onClick={() => {
                  navigate("/productos");
                  setOpen(false);
                }}
                className="w-full text-left text-slate-700 hover:text-blue-600 text-sm font-medium"
              >
                Productos
              </button>

              {user.role === "admin" && (
                <button
                  onClick={() => {
                    navigate("/productos/crear");
                    setOpen(false);
                  }}
                  className="w-full text-left text-slate-700 hover:text-blue-600 font-medium text-sm flex items-center gap-2"
                >
                  <FaPlus /> Crear producto
                </button>
              )}

              <div className="py-2 text-slate-600 text-sm flex items-center gap-2 border-t pt-3">
                <FaUser />
                {user.nombre || user.email}
              </div>

              <button
                onClick={handleLogout}
                className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2 justify-center"
              >
                <FaSignOutAlt /> Cerrar sesión
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;