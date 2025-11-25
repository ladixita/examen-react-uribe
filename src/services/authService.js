import axios from "axios";

const BASE_URL = "https://69237d613ad095fb8470b4b7.mockapi.io/"
const USERS_URL = `${BASE_URL}/users`

const login = async(email, password) => {
    try {
        //Buscamos un usuario que coincida EXACTAMENTE con email y password
        const response = await axios.get(`${USERS_URL}?email=${email}&password=${password}`)
        const users = response.data

        //Si no existe usuario
        if(users.length === 0) {
            throw new Error("Credenciales incorrectas")
        }

        //extraemos el primer usuario encontrado
        const user = users[0]

        //retornamos solo lo necesario
        return {
            id: user.id,
            nombre: user.nombre,
            email: user.email,
            role: user.role
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}

export {
    login
}