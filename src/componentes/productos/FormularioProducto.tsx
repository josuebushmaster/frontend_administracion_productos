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
  Typography,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productoEsquema, valoresPorDefecto } from '../../validaciones/productoEsquema';
import type { ProductoFormulario } from '../../validaciones/productoEsquema';
import type { Producto } from '../../tipos/producto';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditNoteIcon from '@mui/icons-material/EditNote';
import SaveIcon from '@mui/icons-material/Save';

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
        className: 'animate-fade-in',
      }}
    >
      <DialogTitle className="pb-2">
        <Box className="flex items-center gap-3">
          <Box 
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            sx={{
              background: esEdicion 
                ? 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)'
                : 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              boxShadow: esEdicion 
                ? '0 4px 14px rgba(245, 158, 11, 0.3)'
                : '0 4px 14px rgba(59, 130, 246, 0.3)',
            }}
          >
            {esEdicion ? (
              <EditNoteIcon className="text-white" />
            ) : (
              <AddCircleOutlineIcon className="text-white" />
            )}
          </Box>
          <Box>
            <Typography variant="h5" className="font-bold">
              {esEdicion ? 'Editar Producto' : 'Nuevo Producto'}
            </Typography>
            <Typography variant="body2" className="text-slate-500">
              {esEdicion 
                ? 'Modifica los datos del producto'
                : 'Completa los datos para agregar un nuevo producto'
              }
            </Typography>
          </Box>
        </Box>
      </DialogTitle>
      
      <DialogContent className="pt-4">
        <Box className="flex flex-col gap-5 pt-2">
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
                placeholder="Ej: Laptop Gaming Pro"
              />
            )}
          />

          <Box className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  placeholder="0.00"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <span className="text-slate-400 font-medium">$</span>
                        </InputAdornment>
                      ),
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
                  placeholder="Ej: Electrónica"
                />
              )}
            />
          </Box>

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
                placeholder="Describe las características principales del producto..."
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
                helperText={errors.image?.message || 'Proporciona un enlace a la imagen del producto'}
                disabled={estaCargando}
                placeholder="https://ejemplo.com/imagen.jpg"
              />
            )}
          />
        </Box>
      </DialogContent>

      <DialogActions className="px-6 pb-6 pt-4 gap-3">
        <Button 
          onClick={manejarCerrar} 
          disabled={estaCargando}
          variant="outlined"
          sx={{
            borderRadius: '12px',
            px: 3,
            borderColor: '#e2e8f0',
            color: '#64748b',
            '&:hover': {
              borderColor: '#cbd5e1',
              backgroundColor: '#f8fafc',
            },
          }}
        >
          Cancelar
        </Button>
        <Button 
          type="submit" 
          variant="contained"
          disabled={estaCargando}
          startIcon={estaCargando ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
          sx={{
            borderRadius: '12px',
            px: 4,
            background: esEdicion
              ? 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)'
              : 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
            boxShadow: esEdicion
              ? '0 4px 14px rgba(245, 158, 11, 0.4)'
              : '0 4px 14px rgba(59, 130, 246, 0.4)',
            '&:hover': {
              background: esEdicion
                ? 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)'
                : 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
            },
          }}
        >
          {estaCargando ? 'Guardando...' : (esEdicion ? 'Actualizar' : 'Crear Producto')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default FormularioProducto;
