import { Snackbar, Alert } from '@mui/material';
import type { AlertColor } from '@mui/material';

interface NotificacionProps {
  abierto: boolean;
  mensaje: string;
  tipo: AlertColor;
  onCerrar: () => void;
  duracion?: number;
}

export function Notificacion({ 
  abierto, 
  mensaje, 
  tipo, 
  onCerrar, 
  duracion = 4000 
}: NotificacionProps) {
  return (
    <Snackbar
      open={abierto}
      autoHideDuration={duracion}
      onClose={onCerrar}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert 
        onClose={onCerrar} 
        severity={tipo}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {mensaje}
      </Alert>
    </Snackbar>
  );
}

export default Notificacion;
