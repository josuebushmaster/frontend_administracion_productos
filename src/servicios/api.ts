import axios, { AxiosError } from 'axios';

// Configuración base de la API
const API_BASE_URL = 'http://localhost:3001';

// Instancia de axios configurada
export const apiCliente = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Interceptor para manejar errores
apiCliente.interceptors.response.use(
  (respuesta) => respuesta,
  (error: AxiosError) => {
    const mensajeError = obtenerMensajeError(error);
    return Promise.reject(new Error(mensajeError));
  }
);

// Función para obtener mensaje de error legible
function obtenerMensajeError(error: AxiosError): string {
  if (error.response) {
    // El servidor respondió con un código de error
    const datos = error.response.data as { message?: string; error?: string };
    return datos?.message || datos?.error || `Error del servidor: ${error.response.status}`;
  } else if (error.request) {
    // No se recibió respuesta del servidor
    return 'No se pudo conectar con el servidor. Verifica tu conexión.';
  } else {
    // Error al configurar la petición
    return error.message || 'Ocurrió un error inesperado';
  }
}

export default apiCliente;
