import { Alert, AlertTitle, Button, Box } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

interface MensajeErrorProps {
  mensaje: string;
  onReintentar?: () => void;
  titulo?: string;
}

export function MensajeError({ mensaje, onReintentar, titulo = 'Error' }: MensajeErrorProps) {
  return (
    <Box className="my-6 animate-fade-in-up">
      <Alert 
        severity="error"
        icon={
          <ErrorOutlineIcon 
            className="animate-pulse-slow" 
            sx={{ fontSize: 28 }}
          />
        }
        sx={{
          borderRadius: '16px',
          p: 2,
          background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.08) 0%, rgba(220, 38, 38, 0.12) 100%)',
          border: '1px solid rgba(239, 68, 68, 0.2)',
          backdropFilter: 'blur(10px)',
          '& .MuiAlert-message': {
            width: '100%',
          },
        }}
        action={
          onReintentar && (
            <Button 
              color="error"
              size="small" 
              onClick={onReintentar}
              startIcon={<RefreshIcon />}
              variant="contained"
              sx={{
                borderRadius: '10px',
                textTransform: 'none',
                fontWeight: 600,
                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                boxShadow: '0 4px 14px rgba(239, 68, 68, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                },
              }}
            >
              Reintentar
            </Button>
          )
        }
      >
        <AlertTitle className="font-bold text-lg">{titulo}</AlertTitle>
        <span className="text-slate-700">{mensaje}</span>
      </Alert>
    </Box>
  );
}

export default MensajeError;
