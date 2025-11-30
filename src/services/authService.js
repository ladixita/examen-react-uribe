import axios from "axios";

const BASE_URL = "https://69237d613ad095fb8470b4b7.mockapi.io";
const USERS_URL = `${BASE_URL}/users`;

/**
 * login(email, password)
 *
 * - Consulta MockAPI en la colección "users"
 * - Filtra por email y password
 * - Si encuentra coincidencia, devuelve un objeto usuario simplificado
 * - Si no, lanza un error "Credenciales incorrectas"
 */
const login = async (email, password) => {
  try {
    const response = await axios.get(USERS_URL, {
      params: {
        email,
        password,
      },
    });

    const users = response.data;

    if (!Array.isArray(users) || users.length === 0) {
      throw new Error("Credenciales incorrectas");
    }

    const user = users[0];

    return {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      role: user.role,
    };

  } catch (error) {
    console.error("Error en authService.login:", error);
    throw error;
  }
};

export { login };