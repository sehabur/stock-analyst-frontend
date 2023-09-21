import { createTheme } from '@mui/material';

const palleteColors = {
  primary: {
    main: '#2962ff',
    light: '#5381ff',
    dark: '#1c44b2',
    contrastText: '#fff',
  },
  error: {
    main: '#f23645',
    light: '#f45e6a',
    dark: '#a92530',
    contrastText: '#fff',
  },
  success: {
    main: '#089981',
    light: '#39ad9a',
    dark: '#056b5a',
    contrastText: '#fff',
  },
};

const defaultSettings = {
  typography: {
    fontFamily: "'Open Sans', sans-serif",
    fontWeightRegular: 500,
    body1: {
      fontSize: '.875rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontSize: '1rem',
        },
      },
    },
  },
};

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    ...palleteColors,
  },
  ...defaultSettings,
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    ...palleteColors,
  },
  ...defaultSettings,
});
