import { useState, useEffect } from 'react';

/**
 * Hook personalizado para debounce de valores
 * Útil para retrasar búsquedas mientras el usuario escribe
 * 
 * @param valor - El valor a hacer debounce
 * @param retraso - El tiempo de retraso en milisegundos
 * @returns El valor con debounce aplicado
 */
export function useDebounce<T>(valor: T, retraso: number = 300): T {
  const [valorDebounce, setValorDebounce] = useState<T>(valor);

  useEffect(() => {
    const temporizador = setTimeout(() => {
      setValorDebounce(valor);
    }, retraso);

    return () => {
      clearTimeout(temporizador);
    };
  }, [valor, retraso]);

  return valorDebounce;
}

export default useDebounce;
