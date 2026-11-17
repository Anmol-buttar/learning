import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import DepartmentManagement from './pages/DepartmentManagement';

/**
 * App-level theme tuned for a clean admin dashboard look.
 */
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1e4e79',
      light: '#2f6ea8',
      dark: '#143552',
    },
    secondary: {
      main: '#0f766e',
    },
    background: {
      default: '#f4f7fb',
      paper: '#ffffff',
    },
    text: {
      primary: '#0f172a',
      secondary: '#64748b',
    },
  },
  typography: {
    fontFamily: '"IBM Plex Sans", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    button: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          transition: 'background-color 0.15s ease',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DepartmentManagement />
    </ThemeProvider>
  );
}

export default App;
