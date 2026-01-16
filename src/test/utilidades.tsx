import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import tema from '../tema/tema';
import { ProductosProveedor } from '../contexto/ProductosContexto';

// Wrapper para tests con proveedores
interface PropsWrapper {
  children: React.ReactNode;
}

function ProveedoresTest({ children }: PropsWrapper) {
  return (
    <ThemeProvider theme={tema}>
      <CssBaseline />
      <ProductosProveedor>
        {children}
      </ProductosProveedor>
    </ThemeProvider>
  );
}

// Render personalizado con proveedores
function renderConProveedores(
  ui: React.ReactElement,
  opciones?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, { wrapper: ProveedoresTest, ...opciones });
}

// Re-exportar todo de testing-library
export * from '@testing-library/react';
export { renderConProveedores as render };
