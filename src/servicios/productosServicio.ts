import apiCliente from './api';
import type { Producto, ProductoCrear } from '../tipos/producto';

// Endpoints de la API
const ENDPOINTS = {
  PRODUCTOS: '/api/products',
};

// Servicio de productos
export const productosServicio = {
  // Obtener todos los productos
  async obtenerTodos(busqueda?: string): Promise<Producto[]> {
    const params = busqueda ? { search: busqueda } : {};
    const respuesta = await apiCliente.get<Producto[]>(ENDPOINTS.PRODUCTOS, { params });
    return respuesta.data;
  },

  // Obtener un producto por ID
  async obtenerPorId(id: string): Promise<Producto> {
    const respuesta = await apiCliente.get<Producto>(`${ENDPOINTS.PRODUCTOS}/${id}`);
    return respuesta.data;
  },

  // Crear un nuevo producto
  async crear(producto: ProductoCrear): Promise<Producto> {
    const respuesta = await apiCliente.post<Producto>(ENDPOINTS.PRODUCTOS, producto);
    return respuesta.data;
  },

  // Actualizar un producto existente
  async actualizar(id: string, producto: Partial<ProductoCrear>): Promise<Producto> {
    const respuesta = await apiCliente.put<Producto>(`${ENDPOINTS.PRODUCTOS}/${id}`, producto);
    return respuesta.data;
  },

  // Eliminar un producto
  async eliminar(id: string): Promise<void> {
    await apiCliente.delete(`${ENDPOINTS.PRODUCTOS}/${id}`);
  },
};

export default productosServicio;
