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
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={imagenProducto}
        alt={producto.name}
        sx={{ 
          objectFit: 'cover',
          backgroundColor: 'grey.100',
        }}
        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
          e.currentTarget.src = `https://picsum.photos/seed/${producto.id}/400/300`;
        }}
      />
      
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Typography 
            variant="h6" 
            component="h2"
            sx={{ 
              fontWeight: 600,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              flex: 1,
            }}
          >
            {producto.name}
          </Typography>
          
          <Chip 
            label={producto.category} 
            size="small" 
            color="primary" 
            variant="outlined"
            sx={{ ml: 1, flexShrink: 0 }}
          />
        </Box>
        
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ 
            mb: 2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            flexGrow: 1,
          }}
        >
          {producto.description}
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
          <Typography 
            variant="h5" 
            component="span"
            sx={{ 
              fontWeight: 700,
              color: 'primary.main',
            }}
          >
            ${producto.price.toFixed(2)}
          </Typography>
          
          <Box>
            <IconButton 
              color="primary" 
              onClick={() => onEditar(producto)}
              aria-label="Editar producto"
              size="small"
            >
              <EditIcon />
            </IconButton>
            <IconButton 
              color="error" 
              onClick={() => onEliminar(producto)}
              aria-label="Eliminar producto"
              size="small"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

// Skeleton para estado de carga
export function TarjetaProductoSkeleton() {
  return (
    <Card sx={{ height: '100%' }}>
      <Skeleton variant="rectangular" height={200} />
      <CardContent>
        <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} />
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} width="60%" />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Skeleton variant="text" width={80} sx={{ fontSize: '1.5rem' }} />
          <Skeleton variant="circular" width={40} height={40} />
        </Box>
      </CardContent>
    </Card>
  );
}

export default TarjetaProducto;
