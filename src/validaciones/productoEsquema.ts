import { z } from 'zod';

// Esquema de validación para productos
export const productoEsquema = z.object({
  name: z
    .string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  
  price: z
    .number({ message: 'El precio debe ser un número' })
    .min(0.01, 'El precio debe ser mayor a 0')
    .max(999999.99, 'El precio no puede exceder $999,999.99'),
  
  description: z
    .string()
    .min(10, 'La descripción debe tener al menos 10 caracteres')
    .max(500, 'La descripción no puede exceder 500 caracteres'),
  
  category: z
    .string()
    .min(2, 'La categoría debe tener al menos 2 caracteres')
    .max(50, 'La categoría no puede exceder 50 caracteres'),
  
  image: z
    .string()
    .url('La URL de imagen no es válida')
    .optional()
    .or(z.literal('')),
});

// Tipo inferido del esquema
export type ProductoFormulario = z.infer<typeof productoEsquema>;

// Valores por defecto del formulario
export const valoresPorDefecto: ProductoFormulario = {
  name: '',
  price: 0,
  description: '',
  category: '',
  image: '',
};
