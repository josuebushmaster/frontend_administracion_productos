// Tipos para los productos

export interface Producto {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image?: string;
}

export interface ProductoCrear {
  name: string;
  price: number;
  description: string;
  category: string;
  image?: string;
}

export interface ProductoActualizar extends Partial<ProductoCrear> {
  id: string;
}

// Estados de la aplicación
export interface EstadoCarga {
  cargando: boolean;
  error: string | null;
}

// Respuesta paginada
export interface RespuestaPaginada<T> {
  datos: T[];
  total: number;
  pagina: number;
  limite: number;
  totalPaginas: number;
}

// Filtros de búsqueda
export interface FiltrosProducto {
  busqueda: string;
  categoria: string;
  pagina: number;
  limite: number;
}
