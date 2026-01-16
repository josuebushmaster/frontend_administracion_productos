import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import TarjetaProducto from '../../componentes/productos/TarjetaProducto';
import { productoMock } from '../mocks';

const tema = createTheme();

// Wrapper con tema
const renderConTema = (componente: React.ReactElement) => {
  return render(
    <ThemeProvider theme={tema}>
      {componente}
    </ThemeProvider>
  );
};

describe('TarjetaProducto', () => {
  const mockOnEditar = vi.fn();
  const mockOnEliminar = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe renderizar la información del producto correctamente', () => {
    renderConTema(
      <TarjetaProducto
        producto={productoMock}
        onEditar={mockOnEditar}
        onEliminar={mockOnEliminar}
      />
    );

    expect(screen.getByText(productoMock.name)).toBeInTheDocument();
    expect(screen.getByText(productoMock.description)).toBeInTheDocument();
    expect(screen.getByText(productoMock.category)).toBeInTheDocument();
    expect(screen.getByText(`$${productoMock.price.toFixed(2)}`)).toBeInTheDocument();
  });

  it('debe mostrar la imagen del producto', () => {
    renderConTema(
      <TarjetaProducto
        producto={productoMock}
        onEditar={mockOnEditar}
        onEliminar={mockOnEliminar}
      />
    );

    const imagen = screen.getByRole('img', { name: productoMock.name });
    expect(imagen).toBeInTheDocument();
    expect(imagen).toHaveAttribute('src', productoMock.image);
  });

  it('debe llamar a onEditar al hacer clic en el botón editar', () => {
    renderConTema(
      <TarjetaProducto
        producto={productoMock}
        onEditar={mockOnEditar}
        onEliminar={mockOnEliminar}
      />
    );

    const botonEditar = screen.getByRole('button', { name: /editar producto/i });
    fireEvent.click(botonEditar);

    expect(mockOnEditar).toHaveBeenCalledWith(productoMock);
    expect(mockOnEditar).toHaveBeenCalledTimes(1);
  });

  it('debe llamar a onEliminar al hacer clic en el botón eliminar', () => {
    renderConTema(
      <TarjetaProducto
        producto={productoMock}
        onEditar={mockOnEditar}
        onEliminar={mockOnEliminar}
      />
    );

    const botonEliminar = screen.getByRole('button', { name: /eliminar producto/i });
    fireEvent.click(botonEliminar);

    expect(mockOnEliminar).toHaveBeenCalledWith(productoMock);
    expect(mockOnEliminar).toHaveBeenCalledTimes(1);
  });

  it('debe mostrar el chip de categoría', () => {
    renderConTema(
      <TarjetaProducto
        producto={productoMock}
        onEditar={mockOnEditar}
        onEliminar={mockOnEliminar}
      />
    );

    const chip = screen.getByText(productoMock.category);
    expect(chip).toBeInTheDocument();
  });
});
