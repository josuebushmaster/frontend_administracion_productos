import { Snackbar, Alert, Slide } from '@mui/material';
import type { AlertColor, SlideProps } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

interface NotificacionProps {
  abierto: boolean;
  mensaje: string;
  tipo: AlertColor;
  onCerrar: () => void;
  duracion?: number;
}

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

const iconosPorTipo = {
  success: <CheckCircleOutlineIcon />,
  error: <ErrorOutlineIcon />,
  warning: <WarningAmberIcon />,
  info: <InfoOutlinedIcon />,
};

const gradientesPorTipo = {
  success: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  error: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
  warning: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  info: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
};

const sombrasPorTipo = {
  success: '0 8px 24px rgba(16, 185, 129, 0.4)',
  error: '0 8px 24px rgba(239, 68, 68, 0.4)',
  warning: '0 8px 24px rgba(245, 158, 11, 0.4)',
  info: '0 8px 24px rgba(59, 130, 246, 0.4)',
};

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
      TransitionComponent={SlideTransition}
    >
      <Alert 
        onClose={onCerrar} 
        severity={tipo}
        variant="filled"
        icon={iconosPorTipo[tipo]}
        className="animate-slide-in-right"
        sx={{ 
          width: '100%',
          minWidth: 300,
          borderRadius: '16px',
          fontWeight: 500,
          fontSize: '0.95rem',
          background: gradientesPorTipo[tipo],
          boxShadow: sombrasPorTipo[tipo],
          backdropFilter: 'blur(10px)',
          '& .MuiAlert-icon': {
            fontSize: 24,
          },
          '& .MuiAlert-action': {
            paddingTop: 0,
          },
        }}
      >
        {mensaje}
      </Alert>
    </Snackbar>
  );
}

export default Notificacion;
