import { createContext, useContext, useReducer, useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { Producto, ProductoCrear, FiltrosProducto } from '../tipos/producto';
import productosServicio from '../servicios/productosServicio';

// Estado del contexto
interface EstadoProductos {
  productos: Producto[];
  productoSeleccionado: Producto | null;
  cargando: boolean;
  error: string | null;
  filtros: FiltrosProducto;
  categorias: string[];
}

// Acciones del reducer
type AccionProductos =
  | { type: 'CARGAR_PRODUCTOS_INICIO' }
  | { type: 'CARGAR_PRODUCTOS_EXITO'; payload: Producto[] }
  | { type: 'CARGAR_PRODUCTOS_ERROR'; payload: string }
  | { type: 'SELECCIONAR_PRODUCTO'; payload: Producto | null }
  | { type: 'AGREGAR_PRODUCTO'; payload: Producto }
  | { type: 'ACTUALIZAR_PRODUCTO'; payload: Producto }
  | { type: 'ELIMINAR_PRODUCTO'; payload: string }
  | { type: 'ESTABLECER_FILTROS'; payload: Partial<FiltrosProducto> }
  | { type: 'ESTABLECER_CATEGORIAS'; payload: string[] }
  | { type: 'LIMPIAR_ERROR' };

// Estado inicial
const estadoInicial: EstadoProductos = {
  productos: [],
  productoSeleccionado: null,
  cargando: false,
  error: null,
  filtros: {
    busqueda: '',
    categoria: '',
    pagina: 1,
    limite: 8,
  },
  categorias: [],
};

// Reducer
function productosReducer(estado: EstadoProductos, accion: AccionProductos): EstadoProductos {
  switch (accion.type) {
    case 'CARGAR_PRODUCTOS_INICIO':
      return { ...estado, cargando: true, error: null };
    
    case 'CARGAR_PRODUCTOS_EXITO': {
      const categoriasUnicas = [...new Set(accion.payload.map(p => p.category))];
      return { 
        ...estado, 
        cargando: false, 
        productos: accion.payload,
        categorias: categoriasUnicas,
      };
    }
    
    case 'CARGAR_PRODUCTOS_ERROR':
      return { ...estado, cargando: false, error: accion.payload };
    
    case 'SELECCIONAR_PRODUCTO':
      return { ...estado, productoSeleccionado: accion.payload };
    
    case 'AGREGAR_PRODUCTO':
      return { 
        ...estado, 
        productos: [...estado.productos, accion.payload],
        categorias: estado.categorias.includes(accion.payload.category) 
          ? estado.categorias 
          : [...estado.categorias, accion.payload.category],
      };
    
    case 'ACTUALIZAR_PRODUCTO':
      return {
        ...estado,
        productos: estado.productos.map(p => 
          p.id === accion.payload.id ? accion.payload : p
        ),
      };
    
    case 'ELIMINAR_PRODUCTO':
      return {
        ...estado,
        productos: estado.productos.filter(p => p.id !== accion.payload),
      };
    
    case 'ESTABLECER_FILTROS':
      return {
        ...estado,
        filtros: { ...estado.filtros, ...accion.payload },
      };
    
    case 'ESTABLECER_CATEGORIAS':
      return { ...estado, categorias: accion.payload };
    
    case 'LIMPIAR_ERROR':
      return { ...estado, error: null };
    
    default:
      return estado;
  }
}

// Tipo del contexto
interface ContextoProductosValor {
  estado: EstadoProductos;
  cargarProductos: (busqueda?: string) => Promise<void>;
  crearProducto: (producto: ProductoCrear) => Promise<Producto>;
  actualizarProducto: (id: string, producto: Partial<ProductoCrear>) => Promise<Producto>;
  eliminarProducto: (id: string) => Promise<void>;
  seleccionarProducto: (producto: Producto | null) => void;
  establecerFiltros: (filtros: Partial<FiltrosProducto>) => void;
  limpiarError: () => void;
  productosFiltrados: Producto[];
  productosPaginados: Producto[];
  totalPaginas: number;
}

// Crear contexto
const ProductosContexto = createContext<ContextoProductosValor | undefined>(undefined);

// Proveedor del contexto
interface ProductosProveedorProps {
  children: ReactNode;
}

export function ProductosProveedor({ children }: ProductosProveedorProps) {
  const [estado, dispatch] = useReducer(productosReducer, estadoInicial);

  // Cargar productos desde la API
  const cargarProductos = useCallback(async (busqueda?: string) => {
    dispatch({ type: 'CARGAR_PRODUCTOS_INICIO' });
    try {
      const productos = await productosServicio.obtenerTodos(busqueda);
      dispatch({ type: 'CARGAR_PRODUCTOS_EXITO', payload: productos });
    } catch (error) {
      const mensaje = error instanceof Error ? error.message : 'Error al cargar productos';
      dispatch({ type: 'CARGAR_PRODUCTOS_ERROR', payload: mensaje });
    }
  }, []);

  // Crear nuevo producto
  const crearProducto = useCallback(async (producto: ProductoCrear): Promise<Producto> => {
    const nuevoProducto = await productosServicio.crear(producto);
    dispatch({ type: 'AGREGAR_PRODUCTO', payload: nuevoProducto });
    return nuevoProducto;
  }, []);

  // Actualizar producto existente
  const actualizarProducto = useCallback(async (id: string, producto: Partial<ProductoCrear>): Promise<Producto> => {
    const productoActualizado = await productosServicio.actualizar(id, producto);
    dispatch({ type: 'ACTUALIZAR_PRODUCTO', payload: productoActualizado });
    return productoActualizado;
  }, []);

  // Eliminar producto
  const eliminarProducto = useCallback(async (id: string): Promise<void> => {
    await productosServicio.eliminar(id);
    dispatch({ type: 'ELIMINAR_PRODUCTO', payload: id });
  }, []);

  // Seleccionar producto
  const seleccionarProducto = useCallback((producto: Producto | null) => {
    dispatch({ type: 'SELECCIONAR_PRODUCTO', payload: producto });
  }, []);

  // Establecer filtros
  const establecerFiltros = useCallback((filtros: Partial<FiltrosProducto>) => {
    dispatch({ type: 'ESTABLECER_FILTROS', payload: filtros });
  }, []);

  // Limpiar error
  const limpiarError = useCallback(() => {
    dispatch({ type: 'LIMPIAR_ERROR' });
  }, []);

  // Productos filtrados localmente
  const productosFiltrados = useMemo(() => {
    let resultado = [...estado.productos];

    // Filtrar por categoría
    if (estado.filtros.categoria) {
      resultado = resultado.filter(p => p.category === estado.filtros.categoria);
    }

    // Filtrar por búsqueda local (complementario a la búsqueda del API)
    if (estado.filtros.busqueda) {
      const busquedaLower = estado.filtros.busqueda.toLowerCase();
      resultado = resultado.filter(p =>
        p.name.toLowerCase().includes(busquedaLower) ||
        p.description.toLowerCase().includes(busquedaLower) ||
        p.category.toLowerCase().includes(busquedaLower)
      );
    }

    return resultado;
  }, [estado.productos, estado.filtros.categoria, estado.filtros.busqueda]);

  // Total de páginas
  const totalPaginas = Math.ceil(productosFiltrados.length / estado.filtros.limite);

  // Productos paginados
  const productosPaginados = useMemo(() => {
    const inicio = (estado.filtros.pagina - 1) * estado.filtros.limite;
    const fin = inicio + estado.filtros.limite;
    return productosFiltrados.slice(inicio, fin);
  }, [productosFiltrados, estado.filtros.pagina, estado.filtros.limite]);

  const valor: ContextoProductosValor = {
    estado,
    cargarProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto,
    seleccionarProducto,
    establecerFiltros,
    limpiarError,
    productosFiltrados,
    productosPaginados,
    totalPaginas,
  };

  return (
    <ProductosContexto.Provider value={valor}>
      {children}
    </ProductosContexto.Provider>
  );
}

// Hook para usar el contexto
export function useProductos(): ContextoProductosValor {
  const contexto = useContext(ProductosContexto);
  if (!contexto) {
    throw new Error('useProductos debe usarse dentro de ProductosProveedor');
  }
  return contexto;
}

export default ProductosContexto;
