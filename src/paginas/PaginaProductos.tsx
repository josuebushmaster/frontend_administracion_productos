import { useState, useCallback } from 'react';
import { Container, Box, Typography } from '@mui/material';
import type { AlertColor } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import InventoryIcon from '@mui/icons-material/Inventory';
import CategoryIcon from '@mui/icons-material/Category';
import {
  Encabezado,
  BarraBusqueda,
  ListaProductos,
  FormularioProducto,
  DialogoConfirmacion,
  MensajeError,
  Notificacion,
} from '../componentes';
import { useGestionProductos, useModal } from '../hooks';
import type { Producto } from '../tipos/producto';
import type { ProductoFormulario } from '../validaciones/productoEsquema';

export function PaginaProductos() {
  // Estados locales
  const [productoEditar, setProductoEditar] = useState<Producto | null>(null);
  const [productoEliminar, setProductoEliminar] = useState<Producto | null>(null);
  const [guardando, setGuardando] = useState(false);
  const [eliminando, setEliminando] = useState(false);
  
  // Estado de notificación
  const [notificacion, setNotificacion] = useState<{
    abierto: boolean;
    mensaje: string;
    tipo: AlertColor;
  }>({ abierto: false, mensaje: '', tipo: 'success' });

  // Hook de gestión de productos
  const {
    productosPaginados,
    cargando,
    error,
    filtros,
    categorias,
    totalPaginas,
    crearProducto,
    actualizarProducto,
    eliminarProducto,
    buscarProductos,
    filtrarPorCategoria,
    cambiarPagina,
    recargarProductos,
    limpiarError,
  } = useGestionProductos();

  // Modales
  const modalFormulario = useModal();
  const modalConfirmacion = useModal();

  // Mostrar notificación
  const mostrarNotificacion = useCallback((mensaje: string, tipo: AlertColor) => {
    setNotificacion({ abierto: true, mensaje, tipo });
  }, []);

  // Cerrar notificación
  const cerrarNotificacion = useCallback(() => {
    setNotificacion(prev => ({ ...prev, abierto: false }));
  }, []);

  // Abrir modal para nuevo producto
  const manejarNuevoProducto = useCallback(() => {
    setProductoEditar(null);
    modalFormulario.abrir();
  }, [modalFormulario]);

  // Abrir modal para editar producto
  const manejarEditarProducto = useCallback((producto: Producto) => {
    setProductoEditar(producto);
    modalFormulario.abrir();
  }, [modalFormulario]);

  // Guardar producto (crear o actualizar)
  const manejarGuardarProducto = useCallback(async (datos: ProductoFormulario) => {
    setGuardando(true);
    try {
      if (productoEditar) {
        await actualizarProducto(productoEditar.id, datos);
        mostrarNotificacion('Producto actualizado correctamente', 'success');
      } else {
        await crearProducto(datos);
        mostrarNotificacion('Producto creado correctamente', 'success');
      }
      modalFormulario.cerrar();
      setProductoEditar(null);
    } catch (error) {
      const mensaje = error instanceof Error ? error.message : 'Error al guardar el producto';
      mostrarNotificacion(mensaje, 'error');
      throw error;
    } finally {
      setGuardando(false);
    }
  }, [productoEditar, actualizarProducto, crearProducto, modalFormulario, mostrarNotificacion]);

  // Abrir confirmación para eliminar
  const manejarConfirmarEliminacion = useCallback((producto: Producto) => {
    setProductoEliminar(producto);
    modalConfirmacion.abrir();
  }, [modalConfirmacion]);

  // Eliminar producto
  const manejarEliminarProducto = useCallback(async () => {
    if (!productoEliminar) return;
    
    setEliminando(true);
    try {
      await eliminarProducto(productoEliminar.id);
      mostrarNotificacion('Producto eliminado correctamente', 'success');
      modalConfirmacion.cerrar();
      setProductoEliminar(null);
    } catch (error) {
      const mensaje = error instanceof Error ? error.message : 'Error al eliminar el producto';
      mostrarNotificacion(mensaje, 'error');
    } finally {
      setEliminando(false);
    }
  }, [productoEliminar, eliminarProducto, modalConfirmacion, mostrarNotificacion]);

  // Cancelar eliminación
  const manejarCancelarEliminacion = useCallback(() => {
    modalConfirmacion.cerrar();
    setProductoEliminar(null);
  }, [modalConfirmacion]);

  return (
    <Box className="min-h-screen">
      {/* Encabezado */}
      <Encabezado onNuevoProducto={manejarNuevoProducto} />

      <Container maxWidth="xl" className="py-8 px-4 sm:px-6">
        {/* Hero Section */}
        <Box className="mb-10 animate-fade-in-up">
          <Box className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <Box>
              <Typography 
                variant="h3" 
                component="h2" 
                className="font-extrabold mb-3"
                sx={{
                  background: 'linear-gradient(135deg, #1e293b 0%, #3b82f6 50%, #8b5cf6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: { xs: '2rem', md: '2.5rem' },
                }}
              >
                Catálogo de Productos
              </Typography>
              <Typography 
                variant="body1" 
                className="text-slate-500 max-w-2xl text-lg"
              >
                Administra tu inventario de forma inteligente. Busca, filtra, crea y gestiona 
                todos tus productos desde un solo lugar.
              </Typography>
            </Box>
            
            {/* Stats Cards */}
            <Box className="flex gap-4 flex-wrap">
              <Box 
                className="glass rounded-2xl p-4 flex items-center gap-3 min-w-[140px] animate-fade-in-up stagger-1"
              >
                <Box 
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  sx={{ background: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)' }}
                >
                  <InventoryIcon className="text-white" />
                </Box>
                <Box>
                  <Typography variant="h5" className="font-bold text-slate-800">
                    {productosPaginados.length}
                  </Typography>
                  <Typography variant="caption" className="text-slate-500">
                    Productos
                  </Typography>
                </Box>
              </Box>
              
              <Box 
                className="glass rounded-2xl p-4 flex items-center gap-3 min-w-[140px] animate-fade-in-up stagger-2"
              >
                <Box 
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  sx={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)' }}
                >
                  <CategoryIcon className="text-white" />
                </Box>
                <Box>
                  <Typography variant="h5" className="font-bold text-slate-800">
                    {categorias.length}
                  </Typography>
                  <Typography variant="caption" className="text-slate-500">
                    Categorías
                  </Typography>
                </Box>
              </Box>
              
              <Box 
                className="glass rounded-2xl p-4 flex items-center gap-3 min-w-[140px] animate-fade-in-up stagger-3"
              >
                <Box 
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  sx={{ background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)' }}
                >
                  <TrendingUpIcon className="text-white" />
                </Box>
                <Box>
                  <Typography variant="h5" className="font-bold text-slate-800">
                    {totalPaginas}
                  </Typography>
                  <Typography variant="caption" className="text-slate-500">
                    Páginas
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Barra de búsqueda y filtros */}
        <Box className="mb-8 animate-fade-in-up stagger-2">
          <BarraBusqueda
            onBuscar={buscarProductos}
            onFiltrarCategoria={filtrarPorCategoria}
            categorias={categorias}
            categoriaSeleccionada={filtros.categoria}
            busquedaInicial={filtros.busqueda}
          />
        </Box>

        {/* Mensaje de error */}
        {error && (
          <Box className="animate-fade-in">
            <MensajeError
              mensaje={error}
              onReintentar={() => {
                limpiarError();
                recargarProductos();
              }}
            />
          </Box>
        )}

        {/* Lista de productos */}
        <Box className="animate-fade-in-up stagger-3">
          <ListaProductos
            productos={productosPaginados}
            cargando={cargando}
            onEditar={manejarEditarProducto}
            onEliminar={manejarConfirmarEliminacion}
            paginaActual={filtros.pagina}
            totalPaginas={totalPaginas}
            onCambiarPagina={cambiarPagina}
          />
        </Box>
      </Container>

      {/* Modal de formulario */}
      <FormularioProducto
        abierto={modalFormulario.estaAbierto}
        onCerrar={() => {
          modalFormulario.cerrar();
          setProductoEditar(null);
        }}
        onGuardar={manejarGuardarProducto}
        productoEditar={productoEditar}
        cargando={guardando}
      />

      {/* Modal de confirmación de eliminación */}
      <DialogoConfirmacion
        abierto={modalConfirmacion.estaAbierto}
        titulo="Eliminar Producto"
        mensaje={`¿Estás seguro de que deseas eliminar "${productoEliminar?.name}"? Esta acción no se puede deshacer.`}
        onConfirmar={manejarEliminarProducto}
        onCancelar={manejarCancelarEliminacion}
        cargando={eliminando}
        textoConfirmar="Eliminar"
        colorConfirmar="error"
      />

      {/* Notificación */}
      <Notificacion
        abierto={notificacion.abierto}
        mensaje={notificacion.mensaje}
        tipo={notificacion.tipo}
        onCerrar={cerrarNotificacion}
      />
    </Box>
  );
}

export default PaginaProductos;
