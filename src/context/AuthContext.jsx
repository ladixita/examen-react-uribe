import { createContext, useContext, useState } from "react";
import { login as apiLogin } from "../services/authService";

// Creamos contexto
const AuthContext = createContext();

/**
 * AuthProvider:
 * Contiene toda la lógica de autenticación del proyecto.
 * 
 * Provee al árbol de componentes:
 *   - user
 *   - login()
 *   - logout()
 *   - isAuthenticated
 *   - loading
 */
export const AuthProvider = ({ children }) => {
  /**
   * STATE: user
   * 
   * Se inicializa leyendo el localStorage para conservar la sesión
   * incluso si el usuario recarga la página.
   */
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  /**
   * STATE: loading
   * Controla el estado de "cargando" durante el login.
   */
  const [loading, setLoading] = useState(false);

  /**
   * FUNCIÓN LOGIN
   *
   * - Llama al servicio de login
   * - Guarda el usuario en memoria
   * - Persiste el usuario en localStorage
   * - Devuelve el usuario
   */
  const login = async (email, password) => {
    setLoading(true);

    try {
      const loggedUser = await apiLogin(email, password);

      setUser(loggedUser);
      localStorage.setItem("user", JSON.stringify(loggedUser));

      return loggedUser;

    } catch (error) {
      // Re-lanza el error para que LoginView lo capture y muestre SweetAlert
      throw error;

    } finally {
      setLoading(false);
    }
  };

  /**
   * FUNCIÓN LOGOUT
   *
   * - Limpia la información del usuario en memoria
   * - Borra datos del localStorage
   */
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  /**
   * isAuthenticated:
   * Devuelve true si hay usuario logueado.
   */
  const isAuthenticated = !!user;

  /**
   * Provider expone toda la información y funciones
   * al resto de la aplicación mediante el contexto.
   */
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook personalizado para usar la autenticación
 * en cualquier componente: Navbar, LoginView, HomeView, etc.
 */
export const useAuth = () => useContext(AuthContext);