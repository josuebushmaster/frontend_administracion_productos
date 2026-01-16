import { createTheme, alpha } from '@mui/material/styles';

// Paleta de colores moderna y vibrante
const colores = {
  primary: {
    main: '#3b82f6',
    light: '#60a5fa',
    dark: '#1d4ed8',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#8b5cf6',
    light: '#a78bfa',
    dark: '#7c3aed',
    contrastText: '#ffffff',
  },
  accent: {
    main: '#d946ef',
    light: '#e879f9',
    dark: '#c026d3',
  },
  success: {
    main: '#10b981',
    light: '#34d399',
    dark: '#059669',
  },
  warning: {
    main: '#f59e0b',
    light: '#fbbf24',
    dark: '#d97706',
  },
  error: {
    main: '#ef4444',
    light: '#f87171',
    dark: '#dc2626',
  },
  grey: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
};

// Tema personalizado de la aplicación
const tema = createTheme({
  palette: {
    mode: 'light',
    primary: colores.primary,
    secondary: colores.secondary,
    success: colores.success,
    warning: colores.warning,
    error: colores.error,
    grey: colores.grey,
    background: {
      default: 'transparent',
      paper: '#ffffff',
    },
    text: {
      primary: colores.grey[800],
      secondary: colores.grey[500],
    },
    divider: colores.grey[200],
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h1: {
      fontWeight: 800,
      letterSpacing: '-0.025em',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.025em',
    },
    h3: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h5: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h6: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    subtitle1: {
      fontWeight: 500,
    },
    body1: {
      lineHeight: 1.7,
    },
    body2: {
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.01em',
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
    '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
    '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: 'linear-gradient(135deg, #f0f4ff 0%, #faf5ff 50%, #fff1f2 100%)',
          backgroundAttachment: 'fixed',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.8)',
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(20px)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 24px',
          fontSize: '0.9375rem',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        },
        contained: {
          boxShadow: '0 4px 14px 0 rgba(59, 130, 246, 0.4)',
          '&:hover': {
            boxShadow: '0 6px 20px rgba(59, 130, 246, 0.5)',
            transform: 'translateY(-2px)',
          },
        },
        containedSecondary: {
          background: 'linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)',
          boxShadow: '0 4px 14px 0 rgba(139, 92, 246, 0.4)',
          '&:hover': {
            background: 'linear-gradient(135deg, #7c3aed 0%, #c026d3 100%)',
            boxShadow: '0 6px 20px rgba(139, 92, 246, 0.5)',
          },
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
            backgroundColor: alpha(colores.primary.main, 0.04),
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
            },
            '&.Mui-focused': {
              backgroundColor: '#ffffff',
              boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.15)',
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          borderRadius: 8,
        },
        colorPrimary: {
          background: `linear-gradient(135deg, ${alpha(colores.primary.main, 0.1)} 0%, ${alpha(colores.secondary.main, 0.1)} 100%)`,
          color: colores.primary.dark,
          border: `1px solid ${alpha(colores.primary.main, 0.2)}`,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 24,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid rgba(255, 255, 255, 0.5)',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: '1.5rem',
          fontWeight: 700,
          padding: '24px 24px 16px',
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: '16px 24px',
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: '16px 24px 24px',
          gap: 12,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backdropFilter: 'blur(10px)',
        },
        standardError: {
          backgroundColor: alpha(colores.error.main, 0.1),
          border: `1px solid ${alpha(colores.error.main, 0.2)}`,
        },
        standardSuccess: {
          backgroundColor: alpha(colores.success.main, 0.1),
          border: `1px solid ${alpha(colores.success.main, 0.2)}`,
        },
        standardWarning: {
          backgroundColor: alpha(colores.warning.main, 0.1),
          border: `1px solid ${alpha(colores.warning.main, 0.2)}`,
        },
        standardInfo: {
          backgroundColor: alpha(colores.primary.main, 0.1),
          border: `1px solid ${alpha(colores.primary.main, 0.2)}`,
        },
        filledSuccess: {
          background: `linear-gradient(135deg, ${colores.success.main} 0%, ${colores.success.dark} 100%)`,
        },
        filledError: {
          background: `linear-gradient(135deg, ${colores.error.main} 0%, ${colores.error.dark} 100%)`,
        },
        filledWarning: {
          background: `linear-gradient(135deg, ${colores.warning.main} 0%, ${colores.warning.dark} 100%)`,
        },
        filledInfo: {
          background: `linear-gradient(135deg, ${colores.primary.main} 0%, ${colores.secondary.main} 100%)`,
        },
      },
    },
    MuiPagination: {
      styleOverrides: {
        root: {
          '& .MuiPaginationItem-root': {
            borderRadius: 10,
            fontWeight: 500,
            transition: 'all 0.2s ease',
            '&.Mui-selected': {
              background: `linear-gradient(135deg, ${colores.primary.main} 0%, ${colores.secondary.main} 100%)`,
              boxShadow: '0 4px 14px rgba(59, 130, 246, 0.4)',
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'scale(1.1)',
          },
        },
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          background: 'linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s infinite',
        },
      },
    },
  },
});

export default tema;
