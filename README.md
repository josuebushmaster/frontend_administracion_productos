# 🛒 Gestor de Productos

Aplicación web para listar y administrar productos consumiendo una API REST. Desarrollada con **React + TypeScript + Vite** y **Material UI**.

## 📋 Características

### Funcionalidades Principales
- ✅ **Listado de productos** con diseño de tarjetas responsive
- ✅ **Búsqueda en tiempo real** con debounce
- ✅ **Filtrado por categoría**
- ✅ **CRUD completo** (Crear, Leer, Actualizar, Eliminar)
- ✅ **Paginación** de resultados
- ✅ **Estados de Loading y Error** con manejo visual
- ✅ **Validación de formularios** con Zod

### Puntos Extra Implementados
| Categoría | Implementación | Puntos |
|-----------|----------------|--------|
| TypeScript | Tipado completo en toda la aplicación | +15 |
| Testing | Tests unitarios con Vitest y RTL | +15 |
| UX/UI | Diseño 100% responsive | +10 |
| UI Library | Material UI (MUI) | +5 |
| Custom Hooks | `useProductos`, `useDebounce`, `useModal` | +15 |
| Estado Global | Context API con useReducer | +15 |
| Código Formateado | ESLint configurado | +10 |
| CRUD Completo | Create, Update, Delete implementados | +15 |
| Validación | React Hook Form + Zod | +10 |
| Paginación | Paginación cliente con MUI | +10 |
| Lazy Loading | Code splitting con React.lazy | +10 |
| Documentación | README completo | +5 |

## 🚀 Inicio Rápido

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Instalación

```bash
# Clonar el repositorio (si aplica)
cd frontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia el servidor de desarrollo

# Build
npm run build        # Compila la aplicación para producción

# Tests
npm run test         # Ejecuta los tests
npm run test:ui      # Ejecuta tests con interfaz visual
npm run test:coverage # Genera reporte de cobertura

# Linting
npm run lint         # Ejecuta ESLint
```

## Estructura del Proyecto

```
src/
├── componentes/           # Componentes React
│   ├── comunes/           # Componentes reutilizables
│   │   ├── DialogoConfirmacion.tsx
│   │   ├── MensajeError.tsx
│   │   └── Notificacion.tsx
│   ├── layout/            # Componentes de layout
│   │   └── Encabezado.tsx
│   └── productos/         # Componentes de productos
│       ├── BarraBusqueda.tsx
│       ├── FormularioProducto.tsx
│       ├── ListaProductos.tsx
│       └── TarjetaProducto.tsx
├── contexto/              # Context API
│   └── ProductosContexto.tsx
├── hooks/                 # Custom hooks
│   ├── useDebounce.ts
│   ├── useModal.ts
│   └── useProductos.ts
├── paginas/               # Páginas/Vistas
│   └── PaginaProductos.tsx
├── servicios/             # Llamadas API
│   ├── api.ts
│   └── productosServicio.ts
├── tema/                  # Tema de MUI
│   └── tema.ts
├── test/                  # Tests
│   ├── componentes/
│   ├── hooks/
│   ├── servicios/
│   ├── mocks.ts
│   ├── setup.ts
│   └── utilidades.tsx
├── tipos/                 # Tipos TypeScript
│   └── producto.ts
├── validaciones/          # Esquemas de validación
│   └── productoEsquema.ts
├── App.tsx
├── main.tsx
└── index.css
```

## Tecnologías Utilizadas

### Core
- **React 19** - Biblioteca UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool

### UI/UX
- **Material UI (MUI)** - Componentes UI
- **Emotion** - CSS-in-JS

### Estado y Datos
- **Context API + useReducer** - Gestión de estado global
- **Axios** - Cliente HTTP

### Formularios y Validación
- **React Hook Form** - Gestión de formularios
- **Zod** - Validación de esquemas

### Testing
- **Vitest** - Framework de testing
- **React Testing Library** - Testing de componentes
- **@testing-library/jest-dom** - Matchers adicionales

## API Endpoints

La aplicación consume la API REST en `http://localhost:3001`:

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/products` | Listar todos los productos |
| GET | `/api/products?search=term` | Buscar productos |
| GET | `/api/products/:id` | Obtener producto por ID |
| POST | `/api/products` | Crear nuevo producto |
| PUT | `/api/products/:id` | Actualizar producto |
| DELETE | `/api/products/:id` | Eliminar producto |

## Tests

```bash
# Ejecutar todos los tests
npm run test

# Modo watch
npm run test -- --watch

# Ver cobertura
npm run test:coverage
```

### Tests Incluidos
- **Componentes**: TarjetaProducto, ListaProductos
- **Hooks**: useDebounce, useModal
- **Servicios**: productosServicio

## 🎨 Características de UX/UI

- **Diseño Responsive**: Adaptado para móviles, tablets y desktop
- **Feedback Visual**: Estados de carga, notificaciones y confirmaciones
- **Animaciones Suaves**: Transiciones y hover effects
- **Tema Personalizado**: Paleta de colores coherente
- **Accesibilidad**: Labels y roles ARIA

## 🔧 Configuración

### Variables de Entorno
La URL base de la API se configura en `src/servicios/api.ts`:

```typescript
const API_BASE_URL = 'http://localhost:3001';
```

### Tema
Personaliza el tema en `src/tema/tema.ts`.

## Notas de Desarrollo

1. **Código en Español**: Todo el código, comentarios y mensajes están en español
2. **Hooks Personalizados**: Reutilizables y bien documentados
3. **Manejo de Errores**: Interceptores de Axios y estados de error en UI
4. **Lazy Loading**: La página principal se carga de forma diferida

## 👤 Autor

Desarrollado como parte de una prueba técnica por Josue Pastil

---

¡Gracias por revisar este proyecto!
