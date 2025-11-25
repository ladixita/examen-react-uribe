import { createContext, useContext, useState, useEffect } from "react";
import { login as loginService } from "../services/authService";

// 1) Creamos el contexto de autenticación
const AuthContext = createContext(null);

// 2) Hook personalizado para consumir el contexto más fácil
export const useAuth = () => useContext(AuthContext);

// 3) Componente proveedor que envolverá a toda la app
export const AuthProvider = ({ children }) => {
  // Estado global del usuario autenticado
  const [user, setUser] = useState(null);
  // Estado opcional para saber si estamos cargando la sesión desde localStorage
  const [loading, setLoading] = useState(true);

  // 2.3) Al montar el provider, intentamos leer al usuario desde localStorage
  useEffect(() => {
    const loadUser = async () => {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          setUser(parsed);
        } catch (error) {
          console.error("Error parseando user desde localStorage:", error);
          localStorage.removeItem("user");
        }
      }

      setLoading(false);
    };

    loadUser(); // Llamamos la función async
  }, []);

  // Función de login que usa el servicio authService
  const login = async (email, password) => {
    // Llamamos al servicio de MockAPI
    const loggedUser = await loginService(email, password);

    // Guardamos en estado global
    setUser(loggedUser);

    // Persistimos en localStorage para que no se pierda al refrescar
    localStorage.setItem("user", JSON.stringify(loggedUser));

    // Devolvemos el usuario a quien llame login() (útil para redirigir)
    return loggedUser;
  };

  // Función de logout: limpia estado y storage
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Derivamos un booleano
  const isAuthenticated = !!user;

  // Valor que compartiremos con toda la app
  const value = {
    user, // objeto con id, nombre, email, role
    isAuthenticated, // true/false
    loading, // true mientras leemos localStorage
    login, // función para iniciar sesión
    logout, // función para cerrar sesión
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div className="flex justify-center items-center h-screen text-xl">
          Cargando...
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
