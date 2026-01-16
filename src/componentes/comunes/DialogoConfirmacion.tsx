import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';

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
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <WarningIcon color="warning" />
        {titulo}
      </DialogTitle>
      
      <DialogContent>
        <DialogContentText>
          {mensaje}
        </DialogContentText>
      </DialogContent>
      
      <DialogActions>
        <Button 
          onClick={onCancelar} 
          disabled={cargando}
          color="inherit"
        >
          {textoCancelar}
        </Button>
        <Button 
          onClick={onConfirmar}
          variant="contained"
          color={colorConfirmar}
          disabled={cargando}
          startIcon={cargando ? <CircularProgress size={20} /> : null}
        >
          {cargando ? 'Procesando...' : textoConfirmar}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogoConfirmacion;
