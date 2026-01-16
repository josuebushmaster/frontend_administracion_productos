import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
  Box,
  Typography,
} from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

interface DialogoConfirmacionProps {
  abierto: boolean;
  titulo: string;
  mensaje: string;
  onConfirmar: () => void;
  onCancelar: () => void;
  cargando?: boolean;
  textoConfirmar?: string;
  textoCancelar?: string;
  colorConfirmar?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
}

export function DialogoConfirmacion({
  abierto,
  titulo,
  mensaje,
  onConfirmar,
  onCancelar,
  cargando = false,
  textoConfirmar = 'Confirmar',
  textoCancelar = 'Cancelar',
  colorConfirmar = 'error',
}: DialogoConfirmacionProps) {
  return (
    <Dialog
      open={abierto}
      onClose={cargando ? undefined : onCancelar}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        className: 'animate-fade-in',
      }}
    >
      <DialogTitle className="pb-0">
        <Box className="flex flex-col items-center text-center pt-4">
          <Box 
            className="w-16 h-16 rounded-full flex items-center justify-center mb-4 animate-pulse-slow"
            sx={{
              background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(239, 68, 68, 0.2) 100%)',
              border: '2px solid rgba(239, 68, 68, 0.3)',
            }}
          >
            <WarningAmberIcon 
              sx={{ 
                fontSize: 32,
                color: '#ef4444',
              }} 
            />
          </Box>
          <Typography variant="h5" className="font-bold text-slate-800">
            {titulo}
          </Typography>
        </Box>
      </DialogTitle>
      
      <DialogContent className="text-center pt-3">
        <DialogContentText className="text-slate-600 text-base">
          {mensaje}
        </DialogContentText>
      </DialogContent>
      
      <DialogActions className="flex-col sm:flex-row gap-3 px-6 pb-6 pt-2">
        <Button 
          onClick={onCancelar} 
          disabled={cargando}
          fullWidth
          variant="outlined"
          sx={{
            borderRadius: '12px',
            py: 1.5,
            borderColor: '#e2e8f0',
            color: '#64748b',
            order: { xs: 2, sm: 1 },
            '&:hover': {
              borderColor: '#cbd5e1',
              backgroundColor: '#f8fafc',
            },
          }}
        >
          {textoCancelar}
        </Button>
        <Button 
          onClick={onConfirmar}
          variant="contained"
          color={colorConfirmar}
          disabled={cargando}
          fullWidth
          startIcon={cargando ? <CircularProgress size={20} color="inherit" /> : <DeleteOutlineIcon />}
          sx={{
            borderRadius: '12px',
            py: 1.5,
            order: { xs: 1, sm: 2 },
            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            boxShadow: '0 4px 14px rgba(239, 68, 68, 0.4)',
            '&:hover': {
              background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
            },
          }}
        >
          {cargando ? 'Eliminando...' : textoConfirmar}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogoConfirmacion;
