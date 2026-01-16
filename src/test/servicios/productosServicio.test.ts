import { describe, it, expect, vi, beforeEach } from 'vitest';
import productosServicio from '../../servicios/productosServicio';
import apiCliente from '../../servicios/api';

// Mock de axios
vi.mock('../../servicios/api', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('productosServicio', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('obtenerTodos', () => {
    it('debe obtener todos los productos', async () => {
      const productosMock = [
        { id: '1', name: 'Producto 1', price: 10, description: 'Desc 1', category: 'Cat 1' },
        { id: '2', name: 'Producto 2', price: 20, description: 'Desc 2', category: 'Cat 2' },
      ];

      vi.mocked(apiCliente.get).mockResolvedValue({ data: productosMock });

      const resultado = await productosServicio.obtenerTodos();

      expect(apiCliente.get).toHaveBeenCalledWith('/api/products', { params: {} });
      expect(resultado).toEqual(productosMock);
    });

    it('debe buscar productos con término de búsqueda', async () => {
      const productosMock = [
        { id: '1', name: 'Laptop', price: 1000, description: 'Laptop desc', category: 'Electronics' },
      ];

      vi.mocked(apiCliente.get).mockResolvedValue({ data: productosMock });

      const resultado = await productosServicio.obtenerTodos('laptop');

      expect(apiCliente.get).toHaveBeenCalledWith('/api/products', { params: { search: 'laptop' } });
      expect(resultado).toEqual(productosMock);
    });
  });

  describe('obtenerPorId', () => {
    it('debe obtener un producto por ID', async () => {
      const productoMock = { id: '1', name: 'Producto 1', price: 10, description: 'Desc', category: 'Cat' };

      vi.mocked(apiCliente.get).mockResolvedValue({ data: productoMock });

      const resultado = await productosServicio.obtenerPorId('1');

      expect(apiCliente.get).toHaveBeenCalledWith('/api/products/1');
      expect(resultado).toEqual(productoMock);
    });
  });

  describe('crear', () => {
    it('debe crear un nuevo producto', async () => {
      const nuevoProducto = { name: 'Nuevo', price: 50, description: 'Descripción', category: 'Nueva' };
      const productoCreado = { id: '3', ...nuevoProducto };

      vi.mocked(apiCliente.post).mockResolvedValue({ data: productoCreado });

      const resultado = await productosServicio.crear(nuevoProducto);

      expect(apiCliente.post).toHaveBeenCalledWith('/api/products', nuevoProducto);
      expect(resultado).toEqual(productoCreado);
    });
  });

  describe('actualizar', () => {
    it('debe actualizar un producto existente', async () => {
      const datosActualizacion = { name: 'Producto Actualizado', price: 75 };
      const productoActualizado = { id: '1', ...datosActualizacion, description: 'Desc', category: 'Cat' };

      vi.mocked(apiCliente.put).mockResolvedValue({ data: productoActualizado });

      const resultado = await productosServicio.actualizar('1', datosActualizacion);

      expect(apiCliente.put).toHaveBeenCalledWith('/api/products/1', datosActualizacion);
      expect(resultado).toEqual(productoActualizado);
    });
  });

  describe('eliminar', () => {
    it('debe eliminar un producto', async () => {
      vi.mocked(apiCliente.delete).mockResolvedValue({ data: undefined });

      await productosServicio.eliminar('1');

      expect(apiCliente.delete).toHaveBeenCalledWith('/api/products/1');
    });
  });
});
