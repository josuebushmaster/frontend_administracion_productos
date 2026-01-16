import { lazy, Suspense } from 'react';
import { ThemeProvider, CssBaseline, Box, Typography } from '@mui/material';
import tema from './tema/tema';
import { ProductosProveedor } from './contexto/ProductosContexto';
import StorefrontIcon from '@mui/icons-material/Storefront';

// Lazy loading de la página principal
const PaginaProductos = lazy(() => import('./paginas/PaginaProductos'));

// Componente de carga elegante
function CargandoPagina() {
  return (
    <Box
      className="min-h-screen flex flex-col items-center justify-center"
      sx={{
        background: 'linear-gradient(135deg, #f0f4ff 0%, #faf5ff 50%, #fff1f2 100%)',
      }}
    >
      <Box className="flex flex-col items-center animate-fade-in">
        {/* Logo animado */}
        <Box 
          className="relative mb-8"
        >
          <Box 
            className="w-20 h-20 rounded-3xl flex items-center justify-center animate-float"
            sx={{ 
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              boxShadow: '0 20px 40px rgba(59, 130, 246, 0.4)',
            }}
          >
            <StorefrontIcon sx={{ fontSize: 40, color: 'white' }} />
          </Box>
          
          {/* Círculos de loading */}
          <Box 
            className="absolute -inset-4 rounded-full border-4 border-t-blue-500 border-r-purple-500 border-b-pink-500 border-l-transparent animate-spin"
            sx={{ animationDuration: '1.5s' }}
          />
        </Box>
        
        {/* Texto */}
        <Typography 
          variant="h4" 
          className="font-bold mb-2"
          sx={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          ProductosPro
        </Typography>
        <Typography variant="body1" className="text-slate-500">
          Cargando tu experiencia...
        </Typography>
        
        {/* Barra de progreso */}
        <Box className="w-48 h-1.5 bg-slate-200 rounded-full mt-6 overflow-hidden">
          <Box 
            className="h-full rounded-full animate-shimmer"
            sx={{
              background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #d946ef, #8b5cf6, #3b82f6)',
              backgroundSize: '200% 100%',
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider theme={tema}>
      <CssBaseline />
      <ProductosProveedor>
        <Suspense fallback={<CargandoPagina />}>
          <PaginaProductos />
        </Suspense>
      </ProductosProveedor>
    </ThemeProvider>
  );
}

export default App;
