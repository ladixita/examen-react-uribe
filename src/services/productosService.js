import axios from "axios";

const BASE_URL = "https://69237d613ad095fb8470b4b7.mockapi.io/"
const PRODUCTS_URL = `${BASE_URL}/products`

//Obtener todos los productos
const getProducts = async() => {
    try {
        const response = await axios.get(PRODUCTS_URL)
        console.log(response)
        return response.data
    } catch (error) {
        console.log('Error obteniendo productos: ', error)
        throw error
    }
}

//Obtener un producto por ID
const getProductById = async(id) => {
    try {
        const response = await axios.get(`${PRODUCTS_URL}/${id}`)
        console.log(response)
        return response.data
    } catch (error) {
        console.log('Error obteniendo producto por ID: ', error)
        throw error
    }
}

//Crear producto
const createProduct = async(producto) => {
    try {
        const response = axios.post(PRODUCTS_URL, producto)
        return response.data
    } catch (error) {
        console.log('Error creando producto:', error)
        throw error
    }
}

//Actualizar un producto
const updateProduct = async(id, producto) => {
    try {
        const response = await axios.put(`${PRODUCTS_URL}/${id}`, producto)
        return response.data
    } catch (error) {
        console.log('Error actualizando producto:', error)
        throw error
    }
}

//Eliminar producto
const deleteProduct = async(id) => {
    try {
        const response = axios.delete(`${PRODUCTS_URL}/${id}`)
        return response.data
    } catch (error) {
        console.log('Error eliminando producto: ', error)
        throw error
    }
}

export {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}