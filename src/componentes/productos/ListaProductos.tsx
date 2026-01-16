import { Grid, Box, Typography, Pagination } from '@mui/material';
import type { Producto } from '../../tipos/producto';
import TarjetaProducto, { TarjetaProductoSkeleton } from './TarjetaProducto';
import InventoryIcon from '@mui/icons-material/Inventory';

interface ListaProductosProps {
  productos: Producto[];
  cargando: boolean;
  onEditar: (producto: Producto) => void;
  onEliminar: (producto: Producto) => void;
  paginaActual: number;
  totalPaginas: number;
  onCambiarPagina: (pagina: number) => void;
}

export function ListaProductos({
  productos,
  cargando,
  onEditar,
  onEliminar,
  paginaActual,
  totalPaginas,
  onCambiarPagina,
}: ListaProductosProps) {
  
  // Mostrar skeletons mientras carga
  if (cargando) {
    return (
      <Grid container spacing={3}>
        {[...Array(8)].map((_, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
            <TarjetaProductoSkeleton />
          </Grid>
        ))}
      </Grid>
    );
  }

  // Mostrar mensaje si no hay productos
  if (productos.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: 8,
          color: 'text.secondary',
        }}
      >
        <InventoryIcon sx={{ fontSize: 80, mb: 2, opacity: 0.5 }} />
        <Typography variant="h5" gutterBottom>
          No se encontraron productos
        </Typography>
        <Typography variant="body1">
          Intenta ajustar los filtros o crea un nuevo producto
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Grid container spacing={3}>
        {productos.map((producto) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={producto.id}>
            <TarjetaProducto
              producto={producto}
              onEditar={onEditar}
              onEliminar={onEliminar}
            />
          </Grid>
        ))}
      </Grid>
      
      {/* Paginación */}
      {totalPaginas > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={totalPaginas}
            page={paginaActual}
            onChange={(_, pagina) => onCambiarPagina(pagina)}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
          />
        </Box>
      )}
    </Box>
  );
}

export default ListaProductos;
