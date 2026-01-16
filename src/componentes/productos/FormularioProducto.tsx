import { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productoEsquema, valoresPorDefecto } from '../../validaciones/productoEsquema';
import type { ProductoFormulario } from '../../validaciones/productoEsquema';
import type { Producto } from '../../tipos/producto';

interface FormularioProductoProps {
  abierto: boolean;
  onCerrar: () => void;
  onGuardar: (datos: ProductoFormulario) => Promise<void>;
  productoEditar?: Producto | null;
  cargando?: boolean;
}

export function FormularioProducto({
  abierto,
  onCerrar,
  onGuardar,
  productoEditar,
  cargando = false,
}: FormularioProductoProps) {
  const esEdicion = !!productoEditar;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductoFormulario>({
    resolver: zodResolver(productoEsquema),
    defaultValues: valoresPorDefecto,
  });

  // Resetear formulario cuando cambia el producto a editar
  useEffect(() => {
    if (productoEditar) {
      reset({
        name: productoEditar.name,
        price: productoEditar.price,
        description: productoEditar.description,
        category: productoEditar.category,
        image: productoEditar.image || '',
      });
    } else {
      reset(valoresPorDefecto);
    }
  }, [productoEditar, reset]);

  // Manejar cierre del modal
  const manejarCerrar = () => {
    if (!isSubmitting && !cargando) {
      reset(valoresPorDefecto);
      onCerrar();
    }
  };

  // Manejar envío del formulario
  const manejarEnvio = async (datos: ProductoFormulario) => {
    try {
      await onGuardar(datos);
      reset(valoresPorDefecto);
      onCerrar();
    } catch (error) {
      // El error se maneja en el componente padre
      console.error('Error al guardar producto:', error);
    }
  };

  const estaCargando = isSubmitting || cargando;

  return (
    <Dialog 
      open={abierto} 
      onClose={manejarCerrar}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit(manejarEnvio),
      }}
    >
      <DialogTitle>
        {esEdicion ? 'Editar Producto' : 'Nuevo Producto'}
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nombre del producto"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
                disabled={estaCargando}
                autoFocus
              />
            )}
          />

          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Precio"
                type="number"
                fullWidth
                error={!!errors.price}
                helperText={errors.price?.message}
                disabled={estaCargando}
                slotProps={{
                  input: {
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  },
                }}
                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
              />
            )}
          />

          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Categoría"
                fullWidth
                error={!!errors.category}
                helperText={errors.category?.message}
                disabled={estaCargando}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Descripción"
                fullWidth
                multiline
                rows={4}
                error={!!errors.description}
                helperText={errors.description?.message}
                disabled={estaCargando}
              />
            )}
          />

          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="URL de imagen (opcional)"
                fullWidth
                error={!!errors.image}
                helperText={errors.image?.message || 'Ejemplo: https://ejemplo.com/imagen.jpg'}
                disabled={estaCargando}
              />
            )}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button 
          onClick={manejarCerrar} 
          disabled={estaCargando}
          color="inherit"
        >
          Cancelar
        </Button>
        <Button 
          type="submit" 
          variant="contained"
          disabled={estaCargando}
          startIcon={estaCargando ? <CircularProgress size={20} /> : null}
        >
          {estaCargando ? 'Guardando...' : (esEdicion ? 'Actualizar' : 'Crear')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default FormularioProducto;
