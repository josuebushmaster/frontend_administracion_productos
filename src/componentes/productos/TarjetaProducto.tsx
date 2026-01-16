import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Chip,
  Skeleton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import type { Producto } from '../../tipos/producto';

interface TarjetaProductoProps {
  producto: Producto;
  onEditar: (producto: Producto) => void;
  onEliminar: (producto: Producto) => void;
  cargando?: boolean;
}

export function TarjetaProducto({ 
  producto, 
  onEditar, 
  onEliminar,
  cargando = false 
}: TarjetaProductoProps) {
  
  // Imagen por defecto si no tiene
  const imagenProducto = producto.image || `https://picsum.photos/seed/${producto.id}/400/300`;

  if (cargando) {
    return <TarjetaProductoSkeleton />;
  }

  return (
    <Card 
      className="group h-full flex flex-col overflow-hidden"
      sx={{ 
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #d946ef)',
          opacity: 0,
          transition: 'opacity 0.3s ease',
        },
        '&:hover::before': {
          opacity: 1,
        },
      }}
    >
      {/* Imagen con overlay */}
      <Box className="relative overflow-hidden">
        <CardMedia
          component="img"
          height="220"
          image={imagenProducto}
          alt={producto.name}
          className="transition-transform duration-500 group-hover:scale-110"
          sx={{ 
            objectFit: 'cover',
            height: 220,
          }}
          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
            e.currentTarget.src = `https://picsum.photos/seed/${producto.id}/400/300`;
          }}
        />
        
        {/* Overlay gradient */}
        <Box 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          sx={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.4) 100%)',
          }}
        />
        
        {/* Categoria badge */}
        <Chip 
          label={producto.category}
          size="small"
          className="absolute top-3 left-3 backdrop-blur-md"
          sx={{
            background: 'rgba(255, 255, 255, 0.9)',
            fontWeight: 600,
            fontSize: '0.75rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        />
        
        {/* Action buttons - appear on hover */}
        <Box 
          className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
        >
          <IconButton 
            size="small"
            onClick={() => onEditar(producto)}
            aria-label="Editar producto"
            className="backdrop-blur-md"
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              color: '#3b82f6',
              '&:hover': {
                backgroundColor: '#3b82f6',
                color: 'white',
                transform: 'scale(1.1)',
              },
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton 
            size="small"
            onClick={() => onEliminar(producto)}
            aria-label="Eliminar producto"
            className="backdrop-blur-md"
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              color: '#ef4444',
              '&:hover': {
                backgroundColor: '#ef4444',
                color: 'white',
                transform: 'scale(1.1)',
              },
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
      
      <CardContent className="flex-grow flex flex-col p-5">
        {/* Nombre del producto */}
        <Typography 
          variant="h6" 
          component="h2"
          className="font-bold mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors"
          sx={{ 
            fontSize: '1.1rem',
            lineHeight: 1.4,
            minHeight: '3.1em',
          }}
        >
          {producto.name}
        </Typography>
        
        {/* Descripción */}
        <Typography 
          variant="body2" 
          className="text-slate-500 mb-4 line-clamp-2 flex-grow"
          sx={{ 
            lineHeight: 1.6,
          }}
        >
          {producto.description}
        </Typography>
        
        {/* Footer con precio */}
        <Box className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
          <Box className="flex items-center gap-2">
            <ShoppingBagIcon className="text-slate-400" fontSize="small" />
            <Typography variant="caption" className="text-slate-400 font-medium">
              En stock
            </Typography>
          </Box>
          
          <Typography 
            variant="h5" 
            component="span"
            className="font-extrabold"
            sx={{ 
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            ${producto.price.toFixed(2)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

// Skeleton para estado de carga
export function TarjetaProductoSkeleton() {
  return (
    <Card className="h-full overflow-hidden">
      <Skeleton 
        variant="rectangular" 
        height={220}
        className="animate-shimmer"
      />
      <CardContent className="p-5">
        <Skeleton 
          variant="text" 
          sx={{ fontSize: '1.25rem', mb: 1 }} 
          className="animate-shimmer"
        />
        <Skeleton 
          variant="text" 
          sx={{ fontSize: '0.875rem' }} 
          className="animate-shimmer"
        />
        <Skeleton 
          variant="text" 
          sx={{ fontSize: '0.875rem' }} 
          width="70%" 
          className="animate-shimmer"
        />
        <Box className="flex justify-between items-center mt-4 pt-4 border-t border-slate-100">
          <Skeleton variant="text" width={60} className="animate-shimmer" />
          <Skeleton variant="text" width={80} sx={{ fontSize: '1.5rem' }} className="animate-shimmer" />
        </Box>
      </CardContent>
    </Card>
  );
}

export default TarjetaProducto;
