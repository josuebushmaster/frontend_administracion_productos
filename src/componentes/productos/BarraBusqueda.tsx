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
import FilterListIcon from '@mui/icons-material/FilterList';
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
      className="glass rounded-2xl p-5"
    >
      <Box 
        className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center"
      >
        {/* Campo de búsqueda */}
        <TextField
          placeholder="Buscar productos por nombre o descripción..."
          value={terminoBusqueda}
          onChange={(e) => setTerminoBusqueda(e.target.value)}
          className="flex-1"
          sx={{ 
            minWidth: 280,
            '& .MuiOutlinedInput-root': {
              borderRadius: '14px',
              backgroundColor: 'white',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              '&:hover': {
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              },
              '&.Mui-focused': {
                boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.15)',
              },
            },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon 
                    sx={{ 
                      color: '#3b82f6',
                    }} 
                  />
                </InputAdornment>
              ),
              endAdornment: terminoBusqueda && (
                <InputAdornment position="end">
                  <IconButton 
                    size="small" 
                    onClick={limpiarBusqueda}
                    aria-label="Limpiar búsqueda"
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        color: '#ef4444',
                      },
                    }}
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        {/* Selector de categoría */}
        <FormControl 
          sx={{ 
            minWidth: 200,
            '& .MuiOutlinedInput-root': {
              borderRadius: '14px',
              backgroundColor: 'white',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            },
          }}
        >
          <InputLabel 
            id="categoria-label"
            sx={{
              '&.Mui-focused': {
                color: '#3b82f6',
              },
            }}
          >
            <Box className="flex items-center gap-1">
              <FilterListIcon fontSize="small" />
              <span>Categoría</span>
            </Box>
          </InputLabel>
          <Select
            labelId="categoria-label"
            value={categoriaSeleccionada}
            label={
              <Box className="flex items-center gap-1">
                <FilterListIcon fontSize="small" />
                <span>Categoría</span>
              </Box>
            }
            onChange={(e) => onFiltrarCategoria(e.target.value)}
          >
            <MenuItem value="">
              <em className="text-slate-500">Todas las categorías</em>
            </MenuItem>
            {categorias.map((categoria) => (
              <MenuItem key={categoria} value={categoria}>
                {categoria}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Chips de filtros activos */}
      {(terminoBusqueda || categoriaSeleccionada) && (
        <Box className="flex gap-2 flex-wrap mt-4 pt-4 border-t border-slate-200/50">
          <span className="text-sm text-slate-500 font-medium mr-2 self-center">
            Filtros activos:
          </span>
          {terminoBusqueda && (
            <Chip
              label={
                <span className="flex items-center gap-1">
                  <SearchIcon fontSize="small" />
                  "{terminoBusqueda}"
                </span>
              }
              onDelete={limpiarBusqueda}
              size="small"
              sx={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                color: '#3b82f6',
                fontWeight: 500,
                border: '1px solid rgba(59, 130, 246, 0.2)',
                '& .MuiChip-deleteIcon': {
                  color: '#3b82f6',
                  '&:hover': {
                    color: '#1d4ed8',
                  },
                },
              }}
            />
          )}
          {categoriaSeleccionada && (
            <Chip
              label={
                <span className="flex items-center gap-1">
                  <FilterListIcon fontSize="small" />
                  {categoriaSeleccionada}
                </span>
              }
              onDelete={() => onFiltrarCategoria('')}
              size="small"
              sx={{
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(217, 70, 239, 0.1) 100%)',
                color: '#8b5cf6',
                fontWeight: 500,
                border: '1px solid rgba(139, 92, 246, 0.2)',
                '& .MuiChip-deleteIcon': {
                  color: '#8b5cf6',
                  '&:hover': {
                    color: '#7c3aed',
                  },
                },
              }}
            />
          )}
        </Box>
      )}
    </Box>
  );
}

export default BarraBusqueda;
