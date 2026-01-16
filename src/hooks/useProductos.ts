import { useEffect, useCallback } from 'react';
import { useProductos as useProductosContexto } from '../contexto/ProductosContexto';

/**
 * Hook personalizado para gestionar productos
 * Proporciona funcionalidades de carga, búsqueda y filtrado
 */
export function useGestionProductos() {
  const {
    estado,
    cargarProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto,
    seleccionarProducto,
    establecerFiltros,
    limpiarError,
    productosFiltrados,
    productosPaginados,
    totalPaginas,
  } = useProductosContexto();

  // Cargar productos al montar el componente
  useEffect(() => {
    cargarProductos();
  }, [cargarProductos]);

  // Buscar productos
  const buscarProductos = useCallback((termino: string) => {
    establecerFiltros({ busqueda: termino, pagina: 1 });
  }, [establecerFiltros]);

  // Filtrar por categoría
  const filtrarPorCategoria = useCallback((categoria: string) => {
    establecerFiltros({ categoria, pagina: 1 });
  }, [establecerFiltros]);

  // Cambiar página
  const cambiarPagina = useCallback((pagina: number) => {
    establecerFiltros({ pagina });
  }, [establecerFiltros]);

  // Limpiar filtros
  const limpiarFiltros = useCallback(() => {
    establecerFiltros({ busqueda: '', categoria: '', pagina: 1 });
  }, [establecerFiltros]);

  // Recargar productos
  const recargarProductos = useCallback(() => {
    cargarProductos();
  }, [cargarProductos]);

  return {
    // Estado
    productos: estado.productos,
    productosFiltrados,
    productosPaginados,
    productoSeleccionado: estado.productoSeleccionado,
    cargando: estado.cargando,
    error: estado.error,
    filtros: estado.filtros,
    categorias: estado.categorias,
    totalPaginas,

    // Acciones CRUD
    crearProducto,
    actualizarProducto,
    eliminarProducto,

    // Acciones de navegación
    seleccionarProducto,
    buscarProductos,
    filtrarPorCategoria,
    cambiarPagina,
    limpiarFiltros,
    recargarProductos,
    limpiarError,
  };
}

export default useGestionProductos;
