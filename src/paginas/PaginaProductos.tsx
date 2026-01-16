import { useState, useCallback } from 'react';
import { Container, Box, Typography, Divider } from '@mui/material';
import type { AlertColor } from '@mui/material';
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
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      {/* Encabezado */}
      <Encabezado onNuevoProducto={manejarNuevoProducto} />

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Título y descripción */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom fontWeight={700}>
            Catálogo de Productos
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Administra tu inventario de productos. Puedes buscar, filtrar, crear, editar y eliminar productos.
          </Typography>
        </Box>

        {/* Barra de búsqueda y filtros */}
        <Box sx={{ mb: 3 }}>
          <BarraBusqueda
            onBuscar={buscarProductos}
            onFiltrarCategoria={filtrarPorCategoria}
            categorias={categorias}
            categoriaSeleccionada={filtros.categoria}
            busquedaInicial={filtros.busqueda}
          />
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* Mensaje de error */}
        {error && (
          <MensajeError
            mensaje={error}
            onReintentar={() => {
              limpiarError();
              recargarProductos();
            }}
          />
        )}

        {/* Lista de productos */}
        <ListaProductos
          productos={productosPaginados}
          cargando={cargando}
          onEditar={manejarEditarProducto}
          onEliminar={manejarConfirmarEliminacion}
          paginaActual={filtros.pagina}
          totalPaginas={totalPaginas}
          onCambiarPagina={cambiarPagina}
        />
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
