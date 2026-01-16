import { AppBar, Toolbar, Typography, Box, Button, Container } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

interface EncabezadoProps {
  onNuevoProducto: () => void;
}

export function Encabezado({ onNuevoProducto }: EncabezadoProps) {
  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      className="animate-fade-in"
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters className="py-3">
          {/* Logo y título */}
          <Box className="flex items-center gap-3 flex-1">
            <Box className="relative">
              <Box 
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                sx={{ 
                  background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                  boxShadow: '0 8px 16px rgba(59, 130, 246, 0.3)',
                }}
              >
                <StorefrontIcon className="text-white text-2xl" />
              </Box>
              <AutoAwesomeIcon 
                className="absolute -top-1 -right-1 text-yellow-400 text-sm animate-pulse-slow"
              />
            </Box>
            <Box>
              <Typography
                variant="h5"
                component="h1"
                className="font-extrabold tracking-tight"
                sx={{
                  background: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                ProductosPro
              </Typography>
              <Typography 
                variant="caption" 
                className="text-slate-500 font-medium hidden sm:block"
              >
                Gestión inteligente de inventario
              </Typography>
            </Box>
          </Box>
          
          {/* Botón de nuevo producto */}
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onNuevoProducto}
            className="shadow-lg hover:shadow-xl transition-all duration-300"
            sx={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              borderRadius: '14px',
              px: 3,
              py: 1.5,
              fontWeight: 600,
              '&:hover': {
                background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                transform: 'translateY(-2px)',
              },
            }}
          >
            <span className="hidden sm:inline">Nuevo Producto</span>
            <span className="sm:hidden">Nuevo</span>
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Encabezado;
