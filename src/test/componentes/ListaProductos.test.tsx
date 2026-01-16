import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ListaProductos from '../../componentes/productos/ListaProductos';
import { productosMock } from '../mocks';

const tema = createTheme();

// Wrapper con tema
const renderConTema = (componente: React.ReactElement) => {
  return render(
    <ThemeProvider theme={tema}>
      {componente}
    </ThemeProvider>
  );
};

describe('ListaProductos', () => {
  const mockOnEditar = vi.fn();
  const mockOnEliminar = vi.fn();
  const mockOnCambiarPagina = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe renderizar la lista de productos', () => {
    renderConTema(
      <ListaProductos
        productos={productosMock}
        cargando={false}
        onEditar={mockOnEditar}
        onEliminar={mockOnEliminar}
        paginaActual={1}
        totalPaginas={1}
        onCambiarPagina={mockOnCambiarPagina}
      />
    );

    productosMock.forEach((producto) => {
      expect(screen.getByText(producto.name)).toBeInTheDocument();
    });
  });

  it('debe mostrar mensaje cuando no hay productos', () => {
    renderConTema(
      <ListaProductos
        productos={[]}
        cargando={false}
        onEditar={mockOnEditar}
        onEliminar={mockOnEliminar}
        paginaActual={1}
        totalPaginas={0}
        onCambiarPagina={mockOnCambiarPagina}
      />
    );

    expect(screen.getByText(/no se encontraron productos/i)).toBeInTheDocument();
  });

  it('debe mostrar skeletons mientras carga', () => {
    renderConTema(
      <ListaProductos
        productos={[]}
        cargando={true}
        onEditar={mockOnEditar}
        onEliminar={mockOnEliminar}
        paginaActual={1}
        totalPaginas={1}
        onCambiarPagina={mockOnCambiarPagina}
      />
    );

    // Verificar que hay elementos de skeleton
    const skeletons = document.querySelectorAll('.MuiSkeleton-root');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('debe mostrar paginación cuando hay más de una página', () => {
    renderConTema(
      <ListaProductos
        productos={productosMock}
        cargando={false}
        onEditar={mockOnEditar}
        onEliminar={mockOnEliminar}
        paginaActual={1}
        totalPaginas={3}
        onCambiarPagina={mockOnCambiarPagina}
      />
    );

    // Verificar que existe la paginación
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('no debe mostrar paginación cuando hay solo una página', () => {
    renderConTema(
      <ListaProductos
        productos={productosMock}
        cargando={false}
        onEditar={mockOnEditar}
        onEliminar={mockOnEliminar}
        paginaActual={1}
        totalPaginas={1}
        onCambiarPagina={mockOnCambiarPagina}
      />
    );

    // Verificar que no existe la paginación
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });
});
