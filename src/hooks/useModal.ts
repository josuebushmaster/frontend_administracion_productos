import { useState, useCallback } from 'react';

/**
 * Hook personalizado para gestionar el estado de modales
 * 
 * @param estadoInicial - Estado inicial del modal (abierto/cerrado)
 * @returns Estado y funciones para controlar el modal
 */
export function useModal(estadoInicial: boolean = false) {
  const [estaAbierto, setEstaAbierto] = useState(estadoInicial);

  const abrir = useCallback(() => {
    setEstaAbierto(true);
  }, []);

  const cerrar = useCallback(() => {
    setEstaAbierto(false);
  }, []);

  const alternar = useCallback(() => {
    setEstaAbierto(prev => !prev);
  }, []);

  return {
    estaAbierto,
    abrir,
    cerrar,
    alternar,
  };
}

export default useModal;
