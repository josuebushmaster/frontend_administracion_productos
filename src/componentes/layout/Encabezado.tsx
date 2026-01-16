import { AppBar, Toolbar, Typography, Box, Button, Container } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import StorefrontIcon from '@mui/icons-material/Storefront';

interface EncabezadoProps {
  onNuevoProducto: () => void;
}

export function Encabezado({ onNuevoProducto }: EncabezadoProps) {
  return (
    <AppBar position="static" elevation={0} sx={{ backgroundColor: 'primary.main' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <StorefrontIcon sx={{ fontSize: 32 }} />
            <Typography
              variant="h5"
              component="h1"
              sx={{
                fontWeight: 700,
                letterSpacing: '-0.5px',
              }}
            >
              Gestor de Productos
            </Typography>
          </Box>
          
          <Button
            variant="contained"
            color="secondary"
            startIcon={<AddIcon />}
            onClick={onNuevoProducto}
            sx={{
              fontWeight: 600,
              px: 3,
            }}
          >
            Nuevo Producto
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Encabezado;
