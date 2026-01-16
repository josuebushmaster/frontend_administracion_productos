import { lazy, Suspense } from 'react';
import { ThemeProvider, CssBaseline, CircularProgress, Box } from '@mui/material';
import tema from './tema/tema';
import { ProductosProveedor } from './contexto/ProductosContexto';

// Lazy loading de la página principal
const PaginaProductos = lazy(() => import('./paginas/PaginaProductos'));

// Componente de carga
function CargandoPagina() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: 'background.default',
      }}
    >
      <CircularProgress size={60} />
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
