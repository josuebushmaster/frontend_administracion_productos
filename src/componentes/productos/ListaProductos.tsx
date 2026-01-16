import { Grid, Box, Typography, Pagination } from '@mui/material';
import type { Producto } from '../../tipos/producto';
import TarjetaProducto, { TarjetaProductoSkeleton } from './TarjetaProducto';
import InventoryIcon from '@mui/icons-material/Inventory';
import SearchOffIcon from '@mui/icons-material/SearchOff';

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
      <Grid container spacing={4}>
        {[...Array(8)].map((_, index) => (
          <Grid 
            size={{ xs: 12, sm: 6, md: 4, lg: 3 }} 
            key={index}
            className={`animate-fade-in-up stagger-${index + 1}`}
          >
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
        className="glass rounded-3xl p-12 text-center animate-fade-in-up"
      >
        <Box 
          className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center animate-float"
          sx={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
          }}
        >
          <SearchOffIcon 
            className="text-slate-400"
            sx={{ fontSize: 48 }} 
          />
        </Box>
        <Typography 
          variant="h5" 
          className="font-bold mb-3"
          sx={{
            background: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          No se encontraron productos
        </Typography>
        <Typography variant="body1" className="text-slate-500 max-w-md mx-auto">
          Intenta ajustar los filtros de búsqueda o crea un nuevo producto para comenzar
        </Typography>
        <Box className="mt-6 flex justify-center gap-2">
          <InventoryIcon className="text-slate-300" />
          <Typography variant="caption" className="text-slate-400">
            Tu catálogo está esperando nuevos productos
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <Grid container spacing={4}>
        {productos.map((producto, index) => (
          <Grid 
            size={{ xs: 12, sm: 6, md: 4, lg: 3 }} 
            key={producto.id}
            className={`animate-fade-in-up`}
            sx={{ animationDelay: `${index * 0.05}s` }}
          >
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
        <Box 
          className="glass rounded-2xl p-4 mt-8 flex justify-center animate-fade-in-up"
        >
          <Pagination
            count={totalPaginas}
            page={paginaActual}
            onChange={(_, pagina) => onCambiarPagina(pagina)}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
            sx={{
              '& .MuiPaginationItem-root': {
                fontWeight: 600,
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
}

export default ListaProductos;
