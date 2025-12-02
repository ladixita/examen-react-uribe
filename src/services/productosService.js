import axios from "axios";

// URL
const BASE_URL = "https://69237d613ad095fb8470b4b7.mockapi.io";
const PRODUCTS_URL = `${BASE_URL}/products`;

/*
   OBTENER TODOS LOS PRODUCTOS
   GET /products
*/
const getProducts = async () => {
  try {
    const response = await axios.get(PRODUCTS_URL);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo productos:", error);
    throw error;
  }
};

/*
   OBTENER PRODUCTO POR ID
   GET /products/:id
*/
const getProductById = async (id) => {
  try {
    const response = await axios.get(`${PRODUCTS_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo producto por ID:", error);
    throw error;
  }
};

/*
   CREAR PRODUCTO
   POST /products
*/
const createProduct = async(producto) => {
    try {
        const response = await axios.post(PRODUCTS_URL, {
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            precio: producto.precio,
            imagen: producto.imagen || "https://placehold.co/600x400",
            stock: producto.stock ?? 0,
            sku: producto.sku ?? "",
            activo: producto.activo ?? true,
            categoriaId: producto.categoriaId ?? 1
        });

        return response.data;
    } catch (error) {
        console.log('Error creando producto:', error);
        throw error;
    }
};

/*
   ACTUALIZAR PRODUCTO
   PUT /products/:id
*/
const updateProduct = async (id, producto) => {
  try {
    const response = await axios.put(`${PRODUCTS_URL}/${id}`, producto);
    return response.data;
  } catch (error) {
    console.error("Error actualizando producto:", error);
    throw error;
  }
};

/*
   ELIMINAR PRODUCTO
   DELETE /products/:id
*/
const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${PRODUCTS_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error eliminando producto:", error);
    throw error;
  }
};

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};