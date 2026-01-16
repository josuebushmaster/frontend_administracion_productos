import { Alert, AlertTitle, Button, Box } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

interface MensajeErrorProps {
  mensaje: string;
  onReintentar?: () => void;
  titulo?: string;
}

export function MensajeError({ mensaje, onReintentar, titulo = 'Error' }: MensajeErrorProps) {
  return (
    <Box sx={{ my: 4 }}>
      <Alert 
        severity="error"
        action={
          onReintentar && (
            <Button 
              color="inherit" 
              size="small" 
              onClick={onReintentar}
              startIcon={<RefreshIcon />}
            >
              Reintentar
            </Button>
          )
        }
      >
        <AlertTitle>{titulo}</AlertTitle>
        {mensaje}
      </Alert>
    </Box>
  );
}

export default MensajeError;
