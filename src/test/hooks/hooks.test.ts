import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '../../hooks/useDebounce';
import { useModal } from '../../hooks/useModal';

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('debe retornar el valor inicial inmediatamente', () => {
    const { result } = renderHook(() => useDebounce('inicial', 500));
    expect(result.current).toBe('inicial');
  });

  it('debe retornar el valor actualizado después del retraso', () => {
    const { result, rerender } = renderHook(
      ({ valor, retraso }) => useDebounce(valor, retraso),
      { initialProps: { valor: 'inicial', retraso: 500 } }
    );

    // Actualizar el valor
    rerender({ valor: 'actualizado', retraso: 500 });
    
    // El valor debería seguir siendo el inicial
    expect(result.current).toBe('inicial');

    // Avanzar el tiempo
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Ahora debería tener el nuevo valor
    expect(result.current).toBe('actualizado');
  });

  it('debe cancelar el debounce anterior si el valor cambia', () => {
    const { result, rerender } = renderHook(
      ({ valor }) => useDebounce(valor, 500),
      { initialProps: { valor: 'primero' } }
    );

    // Actualizar rápidamente
    rerender({ valor: 'segundo' });
    act(() => {
      vi.advanceTimersByTime(200);
    });
    
    rerender({ valor: 'tercero' });
    act(() => {
      vi.advanceTimersByTime(200);
    });

    // Todavía debería ser el primer valor
    expect(result.current).toBe('primero');

    // Avanzar el tiempo restante
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Debería ser el último valor
    expect(result.current).toBe('tercero');
  });
});

describe('useModal', () => {
  it('debe iniciar cerrado por defecto', () => {
    const { result } = renderHook(() => useModal());
    expect(result.current.estaAbierto).toBe(false);
  });

  it('debe iniciar con el estado proporcionado', () => {
    const { result } = renderHook(() => useModal(true));
    expect(result.current.estaAbierto).toBe(true);
  });

  it('debe abrir el modal', () => {
    const { result } = renderHook(() => useModal());
    
    act(() => {
      result.current.abrir();
    });

    expect(result.current.estaAbierto).toBe(true);
  });

  it('debe cerrar el modal', () => {
    const { result } = renderHook(() => useModal(true));
    
    act(() => {
      result.current.cerrar();
    });

    expect(result.current.estaAbierto).toBe(false);
  });

  it('debe alternar el estado del modal', () => {
    const { result } = renderHook(() => useModal());
    
    // Alternar a abierto
    act(() => {
      result.current.alternar();
    });
    expect(result.current.estaAbierto).toBe(true);

    // Alternar a cerrado
    act(() => {
      result.current.alternar();
    });
    expect(result.current.estaAbierto).toBe(false);
  });
});
