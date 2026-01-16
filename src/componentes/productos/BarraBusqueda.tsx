import { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
  Chip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useDebounce } from '../../hooks/useDebounce';

interface BarraBusquedaProps {
  onBuscar: (termino: string) => void;
  onFiltrarCategoria: (categoria: string) => void;
  categorias: string[];
  categoriaSeleccionada: string;
  busquedaInicial?: string;
}

export function BarraBusqueda({
  onBuscar,
  onFiltrarCategoria,
  categorias,
  categoriaSeleccionada,
  busquedaInicial = '',
}: BarraBusquedaProps) {
  const [terminoBusqueda, setTerminoBusqueda] = useState(busquedaInicial);
  const busquedaDebounce = useDebounce(terminoBusqueda, 400);

  // Ejecutar búsqueda cuando cambia el término con debounce
  useEffect(() => {
    onBuscar(busquedaDebounce);
  }, [busquedaDebounce, onBuscar]);

  // Limpiar búsqueda
  const limpiarBusqueda = () => {
    setTerminoBusqueda('');
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        gap: 2, 
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      {/* Campo de búsqueda */}
      <TextField
        placeholder="Buscar productos..."
        value={terminoBusqueda}
        onChange={(e) => setTerminoBusqueda(e.target.value)}
        sx={{ 
          minWidth: 280,
          flex: { xs: '1 1 100%', sm: '1 1 auto' },
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            endAdornment: terminoBusqueda && (
              <InputAdornment position="end">
                <IconButton 
                  size="small" 
                  onClick={limpiarBusqueda}
                  aria-label="Limpiar búsqueda"
                >
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      {/* Selector de categoría */}
      <FormControl sx={{ minWidth: 180 }}>
        <InputLabel id="categoria-label">Categoría</InputLabel>
        <Select
          labelId="categoria-label"
          value={categoriaSeleccionada}
          label="Categoría"
          onChange={(e) => onFiltrarCategoria(e.target.value)}
        >
          <MenuItem value="">
            <em>Todas las categorías</em>
          </MenuItem>
          {categorias.map((categoria) => (
            <MenuItem key={categoria} value={categoria}>
              {categoria}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Chips de filtros activos */}
      {(terminoBusqueda || categoriaSeleccionada) && (
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {terminoBusqueda && (
            <Chip
              label={`Búsqueda: "${terminoBusqueda}"`}
              onDelete={limpiarBusqueda}
              size="small"
              color="primary"
              variant="outlined"
            />
          )}
          {categoriaSeleccionada && (
            <Chip
              label={`Categoría: ${categoriaSeleccionada}`}
              onDelete={() => onFiltrarCategoria('')}
              size="small"
              color="primary"
              variant="outlined"
            />
          )}
        </Box>
      )}
    </Box>
  );
}

export default BarraBusqueda;
